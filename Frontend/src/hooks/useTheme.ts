import { theme, componentStyles, themeUtils } from '@/config/theme'

export const useTheme = () => {
  return {
    theme,
    styles: componentStyles,
    utils: themeUtils,
    
    // Quick access to commonly used values
    colors: theme.colors,
    typography: theme.typography,
    spacing: theme.spacing,
    borderRadius: theme.borderRadius,
    shadows: theme.shadows,
    transitions: theme.transitions,
    breakpoints: theme.breakpoints,
    zIndex: theme.zIndex,
    
    // Component styles
    card: componentStyles.card,
    button: componentStyles.button,
    text: componentStyles.text,
    layout: componentStyles.layout,
    animations: componentStyles.animations,
  }
}

export default useTheme 