import type { PaperTexture } from '../types';

export const getTextureStyle = (texture: PaperTexture = 'grid', isPreview = false) => {
  const scale = isPreview ? 14 : 18; // Slightly smaller scale for modal preview
  const lineScale = isPreview ? 18 : 24;

  switch (texture) {
    case 'grid':
      return {
        backgroundImage: `
          linear-gradient(rgba(255, 255, 255, 0.35) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255, 255, 255, 0.35) 1px, transparent 1px)
        `,
        backgroundSize: `${scale}px ${scale}px`,
      };
    case 'dots':
      return {
        backgroundImage: 'radial-gradient(rgba(255, 255, 255, 0.5) 1.5px, transparent 1.5px)',
        backgroundSize: `${scale}px ${scale}px`,
        backgroundPosition: '0 0',
      };
    case 'lines':
      return {
        backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.4) 1.5px, transparent 1.5px)',
        backgroundSize: `100% ${lineScale}px`,
        backgroundPosition: '0 4px',
      };
    case 'blank':
    default:
      return {
        backgroundImage: 'none',
      };
  }
};
