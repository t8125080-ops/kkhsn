import { CanvasLayer } from '../types';

/**
 * Utility to load an image from URL into an HTMLImageElement asynchronously
 */
export const loadImage = (url: string): Promise<HTMLImageElement> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => resolve(img);
    img.onerror = (err) => {
      // Return a placeholder canvas element drawn image if crossOrigin fails
      const fallbackCanvas = document.createElement('canvas');
      fallbackCanvas.width = 400;
      fallbackCanvas.height = 400;
      const ctx = fallbackCanvas.getContext('2d');
      if (ctx) {
        ctx.fillStyle = '#1e293b';
        ctx.fillRect(0, 0, 400, 400);
        ctx.fillStyle = '#94a3b8';
        ctx.font = '24px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('Thumbnail Asset', 200, 200);
      }
      const fallbackImg = new Image();
      fallbackImg.src = fallbackCanvas.toDataURL();
      fallbackImg.onload = () => resolve(fallbackImg);
    };
    img.src = url;
  });
};

/**
 * Draw complete thumbnail canvas using layer hierarchy
 */
export const renderLayersToCanvas = async (
  canvas: HTMLCanvasElement,
  layers: CanvasLayer[],
  targetWidth: number = 1280,
  targetHeight: number = 720,
  activeLayerId?: string | null
) => {
  canvas.width = targetWidth;
  canvas.height = targetHeight;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const scaleX = targetWidth / 1280;
  const scaleY = targetHeight / 720;

  // Clear canvas
  ctx.clearRect(0, 0, targetWidth, targetHeight);

  // Default dark background fallback
  ctx.fillStyle = '#0f172a';
  ctx.fillRect(0, 0, targetWidth, targetHeight);

  // Render layers in array order (bottom to top)
  for (const layer of layers) {
    if (!layer.visible) continue;

    ctx.save();
    ctx.globalAlpha = layer.opacity ?? 1;

    const lx = layer.x * scaleX;
    const ly = layer.y * scaleY;
    const lw = layer.width * scaleX;
    const lh = layer.height * scaleY;

    // Apply rotation around layer center
    if (layer.rotation) {
      ctx.translate(lx + lw / 2, ly + lh / 2);
      ctx.rotate((layer.rotation * Math.PI) / 180);
      ctx.translate(-(lx + lw / 2), -(ly + lh / 2));
    }

    if (layer.type === 'background') {
      if (layer.src) {
        try {
          const bgImg = await loadImage(layer.src);
          ctx.drawImage(bgImg, 0, 0, targetWidth, targetHeight);
        } catch {
          ctx.fillStyle = '#0f172a';
          ctx.fillRect(0, 0, targetWidth, targetHeight);
        }
      } else {
        ctx.fillStyle = layer.fillColor || '#0f172a';
        ctx.fillRect(0, 0, targetWidth, targetHeight);
      }
    } else if (layer.type === 'image') {
      if (layer.src) {
        try {
          const img = await loadImage(layer.src);

          // Render glow if enabled
          if (layer.hasGlow) {
            ctx.save();
            ctx.shadowColor = layer.glowColor || '#ff0055';
            ctx.shadowBlur = (layer.glowBlur || 20) * scaleX;
            ctx.drawImage(img, lx, ly, lw, lh);
            ctx.restore();
          }

          // Render outline if enabled (simulate outline by multi-offset stroke)
          if (layer.hasOutline) {
            ctx.save();
            const outlineWidth = (layer.outlineWidth || 6) * scaleX;
            const outlineColor = layer.outlineColor || '#ffcc00';
            
            // Temporary buffer to render silhouette
            const tmpCanvas = document.createElement('canvas');
            tmpCanvas.width = lw + outlineWidth * 4;
            tmpCanvas.height = lh + outlineWidth * 4;
            const tmpCtx = tmpCanvas.getContext('2d');
            if (tmpCtx) {
              tmpCtx.drawImage(img, outlineWidth * 2, outlineWidth * 2, lw, lh);
              tmpCtx.globalCompositeOperation = 'source-in';
              tmpCtx.fillStyle = outlineColor;
              tmpCtx.fillRect(0, 0, tmpCanvas.width, tmpCanvas.height);

              // Draw offset silhouette outline
              for (let angle = 0; angle < Math.PI * 2; angle += Math.PI / 8) {
                const ox = Math.cos(angle) * outlineWidth;
                const oy = Math.sin(angle) * outlineWidth;
                ctx.drawImage(tmpCanvas, lx - outlineWidth * 2 + ox, ly - outlineWidth * 2 + oy);
              }
            }
            ctx.restore();
          }

          // Draw main image
          ctx.drawImage(img, lx, ly, lw, lh);
        } catch {
          // Draw image placeholder box
          ctx.fillStyle = '#334155';
          ctx.fillRect(lx, ly, lw, lh);
        }
      }
    } else if (layer.type === 'text') {
      if (layer.text) {
        ctx.save();

        const fontSize = (layer.fontSize || 60) * scaleX;
        const fontFamily = layer.fontFamily || 'Impact, sans-serif';
        const fontWeight = layer.fontWeight || '900';
        ctx.font = `${fontWeight} ${fontSize}px ${fontFamily}`;
        ctx.textBaseline = 'top';

        const textStr = layer.textTransform === 'uppercase' ? layer.text.toUpperCase() : layer.text;

        // Background pill badge if defined
        if (layer.backgroundColor) {
          const metrics = ctx.measureText(textStr);
          const bgPadding = 16 * scaleX;
          ctx.fillStyle = layer.backgroundColor;
          ctx.fillRect(lx - bgPadding, ly - bgPadding / 2, metrics.width + bgPadding * 2, fontSize + bgPadding);
        }

        // Drop shadow
        if (layer.shadowColor) {
          ctx.shadowColor = layer.shadowColor;
          ctx.shadowBlur = (layer.shadowBlur || 10) * scaleX;
          ctx.shadowOffsetX = (layer.shadowOffsetX || 4) * scaleX;
          ctx.shadowOffsetY = (layer.shadowOffsetY || 4) * scaleX;
        }

        // Stroke / Outline
        if (layer.strokeColor && (layer.strokeWidth || 0) > 0) {
          ctx.strokeStyle = layer.strokeColor;
          ctx.lineWidth = (layer.strokeWidth || 4) * scaleX;
          ctx.lineJoin = 'round';
          ctx.miterLimit = 2;
          ctx.strokeText(textStr, lx, ly);
        }

        // Fill text
        ctx.fillStyle = layer.color || '#ffffff';
        ctx.fillText(textStr, lx, ly);

        ctx.restore();
      }
    } else if (layer.type === 'sticker') {
      if (layer.text) {
        ctx.save();
        const fontSize = (layer.fontSize || 80) * scaleX;
        ctx.font = `${fontSize}px sans-serif`;
        ctx.textBaseline = 'top';
        ctx.fillText(layer.text, lx, ly);
        ctx.restore();
      }
    } else if (layer.type === 'arrow' || layer.type === 'shape') {
      ctx.save();
      ctx.fillStyle = layer.fillColor || '#ff0000';
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 4 * scaleX;

      if (layer.shapeType === 'arrow-curved' || layer.shapeType === 'arrow-straight') {
        // Draw dramatic pointing arrow
        ctx.beginPath();
        ctx.moveTo(lx, ly + lh / 2);
        ctx.quadraticCurveTo(lx + lw / 2, ly, lx + lw - 30 * scaleX, ly + lh / 4);
        ctx.lineTo(lx + lw - 40 * scaleX, ly);
        ctx.lineTo(lx + lw, ly + lh / 3);
        ctx.lineTo(lx + lw - 20 * scaleX, ly + lh);
        ctx.lineTo(lx + lw - 30 * scaleX, ly + lh * 0.7);
        ctx.quadraticCurveTo(lx + lw / 2, ly + lh * 0.4, lx, ly + lh * 0.7);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
      } else if (layer.shapeType === 'circle') {
        ctx.beginPath();
        ctx.arc(lx + lw / 2, ly + lh / 2, lw / 2, 0, Math.PI * 2);
        ctx.stroke();
      }
      ctx.restore();
    }

    // Active layer bounding box highlight in editor
    if (activeLayerId && activeLayerId === layer.id) {
      ctx.save();
      ctx.strokeStyle = '#3b82f6';
      ctx.lineWidth = 3 * scaleX;
      ctx.setLineDash([6 * scaleX, 6 * scaleX]);
      ctx.strokeRect(lx - 4, ly - 4, lw + 8, lh + 8);
      ctx.restore();
    }

    ctx.restore();
  }
};
