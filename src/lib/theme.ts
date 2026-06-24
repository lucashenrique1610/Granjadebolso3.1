import { ThemePalette, THEME_PALETTES } from '../types';

export function hexToRgb(hex: string) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}

export function adjustColor(hex: string, amount: number) {
  const rgb = hexToRgb(hex);
  if (!rgb) return hex;
  const r = Math.max(0, Math.min(255, rgb.r + amount));
  const g = Math.max(0, Math.min(255, rgb.g + amount));
  const b = Math.max(0, Math.min(255, rgb.b + amount));
  return `rgb(${r}, ${g}, ${b})`;
}

export function getCustomPalette(hexColor: string): ThemePalette {
  const rgb = hexToRgb(hexColor) || { r: 0, g: 0, b: 0 };
  
  return {
    id: 'custom',
    name: 'Personalizada (Marca)',
    colors: [hexColor, adjustColor(hexColor, -20), `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.2)`],
    themeVars: {
      primary: hexColor,
      primaryHover: adjustColor(hexColor, -20),
      primaryActive: adjustColor(hexColor, -40),
      bgContainer: `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.08)`,
      bgMain: `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.02)`,
    }
  };
}

export function resolveThemePalette(paletteId: string, customColor?: string): ThemePalette {
  if (paletteId === 'custom' && customColor) {
    return getCustomPalette(customColor);
  }
  return THEME_PALETTES[paletteId as import('../types').ThemePaletteId] || THEME_PALETTES.blue;
}
