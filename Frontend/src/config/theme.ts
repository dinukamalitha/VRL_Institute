// Centralized theme configuration for VRL Institute
// This file contains all colors, fonts, and styling constants used throughout the application

export const theme = {
  // Color Palette
  colors: {
    // Primary Colors
    primary: {
      main: '#E91E63',
      light: '#FF6B9D',
      dark: '#C2185B',
      contrastText: '#FFFFFF',
      50: '#FCE4EC',
      100: '#F8BBD9',
      200: '#F48FB1',
      300: '#F06292',
      400: '#EC407A',
      500: '#E91E63',
      600: '#D81B60',
      700: '#C2185B',
      800: '#AD1457',
      900: '#880E4F',
    },
    
    // Secondary Colors
    secondary: {
      main: '#9C27B0',
      light: '#BA68C8',
      dark: '#7B1FA2',
      50: '#F3E5F5',
      100: '#E1BEE7',
      200: '#CE93D8',
      300: '#BA68C8',
      400: '#AB47BC',
      500: '#9C27B0',
      600: '#8E24AA',
      700: '#7B1FA2',
      800: '#6A1B9A',
      900: '#4A148C',
    },
    
    // Gradient Colors
    gradients: {
      primary: 'linear-gradient(45deg, #E91E63 30%, #9C27B0 90%)',
      secondary: 'linear-gradient(-45deg, #667eea 0%, #764ba2 25%, #f093fb 50%, #f5576c 75%, #4facfe 100%)',
      hero: 'linear-gradient(-45deg, #667eea 0%, #764ba2 25%, #f093fb 50%, #f5576c 75%, #4facfe 100%)',
      admin: 'linear-gradient(45deg, #E91E63 30%, #9C27B0 90%)',
    },
    
    // Neutral Colors
    neutral: {
      white: '#FFFFFF',
      black: '#000000',
      grey: {
        50: '#FAFAFA',
        100: '#F5F5F5',
        200: '#EEEEEE',
        300: '#E0E0E0',
        400: '#BDBDBD',
        500: '#9E9E9E',
        600: '#757575',
        700: '#616161',
        800: '#424242',
        900: '#212121',
      },
    },
    
    // Text Colors
    text: {
      primary: '#333333',
      secondary: '#666666',
      disabled: '#9E9E9E',
      white: '#FFFFFF',
    },
    
    // Background Colors
    background: {
      default: '#FFFFFF',
      paper: '#F8F9FA',
      dark: '#F5F5F5',
      light: '#FAFAFA',
    },
    
    // Status Colors
    status: {
      success: '#4CAF50',
      warning: '#FF9800',
      error: '#F44336',
      info: '#2196F3',
    },
  },

  // Typography
  typography: {
    fontFamily: {
      primary: '"Roboto", "Helvetica", "Arial", sans-serif',
      secondary: '"Poppins", "Roboto", "Helvetica", sans-serif',
      mono: '"Roboto Mono", "Courier New", monospace',
    },
    
    fontSize: {
      xs: '0.75rem',    // 12px
      sm: '0.875rem',   // 14px
      base: '1rem',     // 16px
      lg: '1.125rem',   // 18px
      xl: '1.25rem',    // 20px
      '2xl': '1.5rem',  // 24px
      '3xl': '1.875rem', // 30px
      '4xl': '2.25rem',  // 36px
      '5xl': '3rem',     // 48px
      '6xl': '3.75rem',  // 60px
    },
    
    fontWeight: {
      light: 300,
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
      extrabold: 800,
      black: 900,
    },
    
    lineHeight: {
      tight: 1.25,
      normal: 1.5,
      relaxed: 1.75,
      loose: 2,
    },
  },

  // Spacing
  spacing: {
    xs: '0.25rem',   // 4px
    sm: '0.5rem',    // 8px
    md: '1rem',      // 16px
    lg: '1.5rem',    // 24px
    xl: '2rem',      // 32px
    '2xl': '3rem',   // 48px
    '3xl': '4rem',   // 64px
    '4xl': '6rem',   // 96px
  },

  // Border Radius
  borderRadius: {
    none: '0',
    sm: '0.125rem',  // 2px
    base: '0.25rem', // 4px
    md: '0.375rem',  // 6px
    lg: '0.5rem',    // 8px
    xl: '0.75rem',   // 12px
    '2xl': '1rem',   // 16px
    full: '9999px',
  },

  // Shadows
  shadows: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    base: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
    none: 'none',
  },

  // Transitions
  transitions: {
    fast: 'all 0.15s ease',
    normal: 'all 0.3s ease',
    slow: 'all 0.5s ease',
    bounce: 'all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
  },

  // Breakpoints
  breakpoints: {
    xs: '0px',
    sm: '600px',
    md: '900px',
    lg: '1200px',
    xl: '1536px',
  },

  // Z-Index
  zIndex: {
    dropdown: 1000,
    sticky: 1020,
    fixed: 1030,
    modalBackdrop: 1040,
    modal: 1050,
    popover: 1060,
    tooltip: 1070,
  },
}

// Component-specific styles - defined inline to avoid circular references
export const componentStyles = {
  // Card Styles
  card: {
    default: {
      borderRadius: '0.5rem',
      boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
      transition: 'all 0.3s ease',
      border: '1px solid #EEEEEE',
    },
    hover: {
      transform: 'translateY(-4px)',
      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      borderColor: '#E91E63',
    },
    admin: {
      borderRadius: '0.75rem',
      boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
      background: 'linear-gradient(135deg, #E91E6315 0%, #E91E6325 100%)',
      border: '1px solid #E91E6330',
    },
  },

  // Button Styles
  button: {
    primary: {
      background: 'linear-gradient(45deg, #E91E63 30%, #9C27B0 90%)',
      color: '#FFFFFF',
      borderRadius: '0.375rem',
      fontWeight: 700,
      transition: 'all 0.3s ease',
      '&:hover': {
        background: 'linear-gradient(45deg, #C2185B 30%, #7B1FA2 90%)',
        transform: 'translateY(-2px)',
        boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      },
    },
    secondary: {
      background: 'rgba(255,255,255,0.2)',
      backdropFilter: 'blur(10px)',
      border: '1px solid rgba(255,255,255,0.3)',
      color: '#FFFFFF',
      borderRadius: '0.375rem',
      '&:hover': {
        background: 'rgba(255,255,255,0.3)',
        transform: 'translateY(-2px)',
        boxShadow: '0 8px 25px rgba(0,0,0,0.3)',
      },
    },
    outline: {
      color: '#FFFFFF',
      borderColor: '#FFFFFF',
      borderWidth: 2,
      borderRadius: '0.375rem',
      '&:hover': {
        borderColor: '#FFFFFF',
        backgroundColor: 'rgba(255,255,255,0.1)',
        transform: 'translateY(-2px)',
        boxShadow: '0 8px 25px rgba(0,0,0,0.3)',
      },
    },
  },

  // Text Styles
  text: {
    heading: {
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
      fontWeight: 700,
      color: '#333333',
    },
    body: {
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
      fontWeight: 400,
      color: '#666666',
      lineHeight: 1.75,
    },
    caption: {
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
      fontWeight: 500,
      color: '#666666',
      fontSize: '0.875rem',
    },
  },

  // Layout Styles
  layout: {
    container: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '0 1rem',
    },
    section: {
      padding: '4rem 0',
    },
    hero: {
      minHeight: '100vh',
      background: 'linear-gradient(-45deg, #667eea 0%, #764ba2 25%, #f093fb 50%, #f5576c 75%, #4facfe 100%)',
      backgroundSize: '400% 400%',
      animation: 'gradientShift 15s ease infinite',
    },
  },

  // Animation Keyframes
  animations: {
    gradientShift: {
      '0%': { backgroundPosition: '0% 50%' },
      '50%': { backgroundPosition: '100% 50%' },
      '100%': { backgroundPosition: '0% 50%' },
    },
    fadeIn: {
      '0%': { opacity: 0, transform: 'translateY(-10px)' },
      '100%': { opacity: 1, transform: 'translateY(0)' },
    },
    float: {
      '0%, 100%': { transform: 'translateY(0px)' },
      '50%': { transform: 'translateY(-20px)' },
    },
  },
}

// Utility functions
export const themeUtils = {
  // Get color with opacity
  colorWithOpacity: (color: string, opacity: number) => {
    return `${color}${Math.round(opacity * 255).toString(16).padStart(2, '0')}`
  },

  // Get responsive value
  // responsive: (values: { xs?: any; sm?: any; md?: any; lg?: any; xl?: any }) => {
  //   return {
  //     xs: values.xs,
  //     sm: values.sm || values.xs,
  //     md: values.md || values.sm || values.xs,
  //     lg: values.lg || values.md || values.sm || values.xs,
  //     xl: values.xl || values.lg || values.md || values.sm || values.xs,
  //   }
  // },

  // Get spacing value
  spacing: (value: keyof typeof theme.spacing | number) => {
    if (typeof value === 'number') {
      return `${value * 0.25}rem`
    }
    return theme.spacing[value]
  },
}

export default theme 