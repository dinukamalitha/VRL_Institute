# Centralized Theme Configuration

This directory contains the centralized theme configuration for the VRL Institute application. All colors, fonts, spacing, and styling constants are defined here and can be controlled from one place.

## File Structure

```
src/config/
├── theme.ts          # Main theme configuration
└── README.md         # This documentation
```

## Usage

### 1. Import the Theme Hook

```typescript
import { useTheme } from '@/hooks/useTheme';

export default function MyComponent() {
  const { colors, typography, spacing, borderRadius, shadows, transitions } = useTheme();
  
  return (
    <Box sx={{ 
      backgroundColor: colors.primary.main,
      color: colors.white,
      padding: spacing.lg,
      borderRadius: borderRadius.md,
      boxShadow: shadows.lg,
      transition: transitions.normal
    }}>
      <Typography sx={{ 
        fontFamily: typography.fontFamily.primary,
        fontWeight: typography.fontWeight.bold,
        fontSize: typography.fontSize.xl
      }}>
        Hello World
      </Typography>
    </Box>
  );
}
```

### 2. Available Theme Properties

#### Colors
```typescript
const { colors } = useTheme();

// Primary colors
colors.primary.main      // #E91E63
colors.primary.light     // #FF6B9D
colors.primary.dark      // #C2185B

// Secondary colors
colors.secondary.main    // #9C27B0
colors.secondary.light   // #BA68C8
colors.secondary.dark    // #7B1FA2

// Gradients
colors.gradients.primary // linear-gradient(45deg, #E91E63 30%, #9C27B0 90%)
colors.gradients.hero    // linear-gradient(-45deg, #667eea 0%, #764ba2 25%, #f093fb 50%, #f5576c 75%, #4facfe 100%)

// Neutral colors
colors.neutral.white     // #FFFFFF
colors.neutral.black     // #000000
colors.neutral.grey[50]  // #FAFAFA
colors.neutral.grey[100] // #F5F5F5
// ... up to grey[900]

// Text colors
colors.text.primary      // #333333
colors.text.secondary    // #666666
colors.text.disabled     // #9E9E9E
colors.text.white        // #FFFFFF

// Background colors
colors.background.default // #FFFFFF
colors.background.paper   // #F8F9FA
colors.background.dark    // #F5F5F5
colors.background.light   // #FAFAFA

// Status colors
colors.status.success     // #4CAF50
colors.status.warning     // #FF9800
colors.status.error       // #F44336
colors.status.info        // #2196F3
```

#### Typography
```typescript
const { typography } = useTheme();

// Font families
typography.fontFamily.primary   // "Roboto", "Helvetica", "Arial", sans-serif
typography.fontFamily.secondary // "Poppins", "Roboto", "Helvetica", sans-serif
typography.fontFamily.mono      // "Roboto Mono", "Courier New", monospace

// Font sizes
typography.fontSize.xs          // 0.75rem (12px)
typography.fontSize.sm          // 0.875rem (14px)
typography.fontSize.base        // 1rem (16px)
typography.fontSize.lg          // 1.125rem (18px)
typography.fontSize.xl          // 1.25rem (20px)
typography.fontSize['2xl']      // 1.5rem (24px)
typography.fontSize['3xl']      // 1.875rem (30px)
typography.fontSize['4xl']      // 2.25rem (36px)
typography.fontSize['5xl']      // 3rem (48px)
typography.fontSize['6xl']      // 3.75rem (60px)

// Font weights
typography.fontWeight.light     // 300
typography.fontWeight.normal    // 400
typography.fontWeight.medium    // 500
typography.fontWeight.semibold  // 600
typography.fontWeight.bold      // 700
typography.fontWeight.extrabold // 800
typography.fontWeight.black     // 900

// Line heights
typography.lineHeight.tight     // 1.25
typography.lineHeight.normal    // 1.5
typography.lineHeight.relaxed   // 1.75
typography.lineHeight.loose     // 2
```

#### Spacing
```typescript
const { spacing } = useTheme();

spacing.xs    // 0.25rem (4px)
spacing.sm    // 0.5rem (8px)
spacing.md    // 1rem (16px)
spacing.lg    // 1.5rem (24px)
spacing.xl    // 2rem (32px)
spacing['2xl'] // 3rem (48px)
spacing['3xl'] // 4rem (64px)
spacing['4xl'] // 6rem (96px)
```

#### Border Radius
```typescript
const { borderRadius } = useTheme();

borderRadius.none   // 0
borderRadius.sm     // 0.125rem (2px)
borderRadius.base   // 0.25rem (4px)
borderRadius.md     // 0.375rem (6px)
borderRadius.lg     // 0.5rem (8px)
borderRadius.xl     // 0.75rem (12px)
borderRadius['2xl'] // 1rem (16px)
borderRadius.full   // 9999px
```

#### Shadows
```typescript
const { shadows } = useTheme();

shadows.sm     // 0 1px 2px 0 rgba(0, 0, 0, 0.05)
shadows.base   // 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)
shadows.md     // 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)
shadows.lg     // 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)
shadows.xl     // 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)
shadows['2xl'] // 0 25px 50px -12px rgba(0, 0, 0, 0.25)
shadows.inner  // inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)
shadows.none   // none
```

#### Transitions
```typescript
const { transitions } = useTheme();

transitions.fast   // all 0.15s ease
transitions.normal // all 0.3s ease
transitions.slow   // all 0.5s ease
transitions.bounce // all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55)
```

### 3. Component Styles

Pre-defined component styles are available for common patterns:

```typescript
const { card, button, text, layout, animations } = useTheme();

// Card styles
card.default  // Default card styling
card.hover    // Hover state for cards
card.admin    // Admin-specific card styling

// Button styles
button.primary  // Primary button styling
button.secondary // Secondary button styling
button.outline   // Outline button styling

// Text styles
text.heading    // Heading text styling
text.body       // Body text styling
text.caption    // Caption text styling

// Layout styles
layout.container // Container layout
layout.section   // Section layout
layout.hero      // Hero section layout

// Animations
animations.gradientShift // Gradient shift animation
animations.fadeIn        // Fade in animation
animations.float         // Float animation
```

### 4. Utility Functions

```typescript
const { utils } = useTheme();

// Add opacity to color
utils.colorWithOpacity('#E91E63', 0.5) // Returns color with 50% opacity

// Responsive values
utils.responsive({
  xs: '100%',
  sm: '50%',
  md: '33.33%',
  lg: '25%'
})

// Spacing utility
utils.spacing('lg')    // Returns '1.5rem'
utils.spacing(4)       // Returns '1rem' (4 * 0.25rem)
```

## Benefits

1. **Centralized Control**: All styling is controlled from one place
2. **Consistency**: Ensures consistent design across the application
3. **Maintainability**: Easy to update colors, fonts, and spacing globally
4. **Type Safety**: Full TypeScript support with autocomplete
5. **Performance**: Optimized for performance with minimal re-renders
6. **Scalability**: Easy to extend with new theme properties

## Best Practices

1. **Always use the theme hook** instead of hardcoding values
2. **Use semantic color names** (e.g., `colors.primary.main` instead of `#E91E63`)
3. **Leverage component styles** for common patterns
4. **Use utility functions** for complex styling needs
5. **Keep the theme file organized** and well-documented

## Migration Guide

To migrate existing components to use the centralized theme:

1. Import the `useTheme` hook
2. Replace hardcoded colors with theme colors
3. Replace hardcoded spacing with theme spacing
4. Replace hardcoded typography with theme typography
5. Use component styles for common patterns

Example migration:
```typescript
// Before
<Box sx={{ 
  backgroundColor: '#E91E63',
  padding: '24px',
  borderRadius: '8px'
}}>

// After
const { colors, spacing, borderRadius } = useTheme();
<Box sx={{ 
  backgroundColor: colors.primary.main,
  padding: spacing.lg,
  borderRadius: borderRadius.lg
}}>
``` 