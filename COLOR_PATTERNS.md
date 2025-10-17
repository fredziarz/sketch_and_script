# Color Patterns

**Sketch & Script Portfolio - Complete Color Palette**

---

## Table of Contents

1. [Homepage (Base Theme)](#homepage-base-theme)
2. [Architecture Theme (Light)](#architecture-theme-light)
3. [Coding Theme (Dark)](#coding-theme-dark)
4. [Status & State Colors](#status--state-colors)
5. [Interactive States](#interactive-states)
6. [Gradients](#gradients)
7. [Color Usage Guidelines](#color-usage-guidelines)

---

## Homepage (Base Theme)

### Primary Colors

| Color | Hex | RGB | Usage |
|-------|-----|-----|-------|
| Background | `#FAFAFA` | `rgb(250, 250, 250)` | Main page background |
| Background Secondary | `#F5F5F5` | `rgb(245, 245, 245)` | Alternate sections |
| Background Dark | `#2C2C2C` | `rgb(44, 44, 44)` | Dark sections, buttons |
| White | `#FFFFFF` | `rgb(255, 255, 255)` | Cards, nav bar |

### Text Colors

| Color | Hex | RGB | Usage |
|-------|-----|-----|-------|
| Text Primary | `#2C2C2C` | `rgb(44, 44, 44)` | Main text, headings |
| Text Secondary | `#707070` | `rgb(112, 112, 112)` | Descriptions, meta info |

### Accent & UI

| Color | Hex | RGB | Usage |
|-------|-----|-----|-------|
| Accent | `#8B7E74` | `rgb(139, 126, 116)` | Links, focus states |
| Border | `#E0E0E0` | `rgb(224, 224, 224)` | Dividers, borders |

---

## Architecture Theme (Light)

### Primary Colors

| Color | Hex | RGB | Usage |
|-------|-----|-----|-------|
| Background | `#FFFFFF` | `rgb(255, 255, 255)` | Main background |
| Background Secondary | `#F8F8F8` | `rgb(248, 248, 248)` | Alternate sections |
| Background Alt | `#F0F0F0` | `rgb(240, 240, 240)` | Cards, hover states |

### Text Colors

| Color | Hex | RGB | Usage |
|-------|-----|-----|-------|
| Text Primary | `#2C2C2C` | `rgb(44, 44, 44)` | Main text |
| Text Secondary | `#606060` | `rgb(96, 96, 96)` | Descriptions |

### Accent Colors

| Color | Hex | RGB | Usage |
|-------|-----|-----|-------|
| Accent | `#B8936D` | `rgb(184, 147, 109)` | Bronze/gold - buttons, links |
| Accent Hover | `#A07D5C` | `rgb(160, 125, 92)` | Button hover state |
| Accent Light | `#D4C5B9` | `rgb(212, 197, 185)` | Subtle highlights |
| Border | `#E5E5E5` | `rgb(229, 229, 229)` | Borders, dividers |

### Mobile Navigation

| Color | RGBA | Usage |
|-------|------|-------|
| Nav Background | `rgba(255, 255, 255, 0.9)` | Transparent white with blur |
| Nav Border | `#E5E5E5` | Bottom border |

---

## Coding Theme (Dark)

### Primary Colors

| Color | Hex | RGB | Usage |
|-------|-----|-----|-------|
| Background | `#1A1A1A` | `rgb(26, 26, 26)` | Main background |
| Background Secondary | `#0F0F0F` | `rgb(15, 15, 15)` | Darker sections, footer |
| Background Alt | `#252525` | `rgb(37, 37, 37)` | Cards, hover states |

### Text Colors

| Color | Hex | RGB | Usage |
|-------|-----|-----|-------|
| Text Primary | `#E8E8E8` | `rgb(232, 232, 232)` | Main text, headings |
| Text Secondary | `#A0A0A0` | `rgb(160, 160, 160)` | Descriptions, meta |

### Accent Colors

| Color | Hex | RGB | Usage |
|-------|-----|-----|-------|
| Accent (Teal) | `#64FFDA` | `rgb(100, 255, 218)` | Primary accent - links, CTAs |
| Accent Hover | `#4FDDBF` | `rgb(79, 221, 191)` | Button hover state |
| Accent Secondary (Purple) | `#7B68EE` | `rgb(123, 104, 238)` | Game projects, badges |
| Border | `#333333` | `rgb(51, 51, 51)` | Borders, dividers |

### Mobile Navigation

| Color | RGBA | Usage |
|-------|------|-------|
| Nav Background | `rgba(26, 26, 26, 0.95)` | Dark transparent with blur |
| Nav Border | `#333333` | Bottom border |

---

## Status & State Colors

### Project Status Badges

| Status | Background | Text | Usage |
|--------|-----------|------|-------|
| Completed | `rgba(34, 197, 94, 0.1)` | `rgb(22, 163, 74)` | Finished projects |
| In Progress | `rgba(251, 146, 60, 0.1)` | `rgb(234, 88, 12)` | Ongoing projects |

### Tech/Category Badges

| Type | Background (Coding) | Text | Border |
|------|---------------------|------|--------|
| Tech Tag | `rgba(100, 255, 218, 0.1)` | `#64FFDA` | `rgba(100, 255, 218, 0.2)` |
| Game Engine | `rgba(123, 104, 238, 0.1)` | `#7B68EE` | `rgba(123, 104, 238, 0.2)` |
| Game Genre | `rgba(100, 255, 218, 0.1)` | `#64FFDA` | `rgba(100, 255, 218, 0.2)` |

### Result Cards

| Type | Background | Accent |
|------|-----------|--------|
| Coding Results | `rgba(123, 104, 238, 0.05)` | `rgb(123, 104, 238)` |
| Challenge Card | `rgba(239, 68, 68, 0.05)` | `rgba(239, 68, 68, 0.1)` border |
| Solution Card | `rgba(34, 197, 94, 0.05)` | `rgba(34, 197, 94, 0.1)` border |

---

## Interactive States

### Hover Effects

#### Architecture Theme
- **Card Hover**: `translateY(-6px)` + `box-shadow: 0 12px 32px rgba(0, 0, 0, 0.12)`
- **Button Hover**: Background changes to `#A07D5C`, `translateY(-2px)`
- **Link Hover**: Color changes to `#B8936D`

#### Coding Theme
- **Card Hover**: `translateY(-8px)` + `box-shadow: 0 12px 32px rgba(100, 255, 218, 0.15)`
- **Button Hover**: Background changes to `#4FDDBF`, `translateY(-2px)`
- **Link Hover**: Color changes to `#64FFDA`

### Focus States (WCAG 2.2 Compliant)

| Element | Outline | Offset |
|---------|---------|--------|
| All Interactive | `3px solid var(--color-accent)` | `3px` |
| Architecture Focus | `3px solid #B8936D` | `3px` |
| Coding Focus | `3px solid #64FFDA` | `3px` |

### Transparency Levels

| Usage | Architecture | Coding |
|-------|-------------|---------|
| Nav Menu (Mobile) | `rgba(255, 255, 255, 0.9)` | `rgba(26, 26, 26, 0.95)` |
| Backdrop Blur | `blur(20px)` | `blur(20px)` |
| Social Links | `rgba(255, 255, 255, 0.1)` | `rgba(255, 255, 255, 0.1)` |
| Form Inputs | `rgba(255, 255, 255, 0.05)` | `rgba(255, 255, 255, 0.05)` |

---

## Gradients

### Homepage Hero

**Architecture Side:**
```css
linear-gradient(135deg, rgba(255, 255, 255, 0.70) 0%, rgba(255, 255, 255, 0.70) 100%)
```

**Coding Side:**
```css
linear-gradient(135deg, rgba(0, 0, 0, 0.70) 0%, rgba(0, 0, 0, 0.70) 100%)
```

### Page Heroes

**Architecture:**
```css
linear-gradient(180deg, #FAFAFA 0%, #FFFFFF 100%)
```

**Coding:**
```css
linear-gradient(180deg, #0F0F0F 0%, #1A1A1A 100%)
```

### Placeholders

**Architecture:**
```css
linear-gradient(135deg, #F5F5F5 0%, #E8E8E8 100%)
linear-gradient(135deg, #F0F0F0 0%, #E0E0E0 100%)
```

**Coding:**
```css
background: var(--color-bg-secondary) /* #0F0F0F */
```

---

## Color Usage Guidelines

### Do's ✅

1. **Architecture Theme**
   - Use warm, earthy tones (`#B8936D` bronze/gold)
   - Maintain high contrast on white backgrounds
   - Use subtle gradients for depth
   - Keep overall palette light and airy

2. **Coding Theme**
   - Use cool, tech-inspired colors (`#64FFDA` teal, `#7B68EE` purple)
   - Maintain readability with high contrast on dark backgrounds
   - Use accent colors sparingly for emphasis
   - Prefer darker backgrounds with bright accents

3. **Accessibility**
   - Ensure 4.5:1 contrast ratio for text (WCAG AA)
   - Use 3px solid outlines for focus states
   - Provide visual feedback on hover/active states
   - Don't rely on color alone for information

### Don'ts ❌

1. **Avoid**
   - Mixing accent colors across themes (no teal in architecture, no bronze in coding)
   - Pure black (`#000000`) or pure white overlays
   - Using color alone to convey critical information
   - Low contrast combinations

2. **Be Careful With**
   - Too many accent colors in one view
   - Overlapping transparent layers (compound opacity)
   - Text on semi-transparent backgrounds without sufficient contrast
   - Animations on hover without respecting `prefers-reduced-motion`

### Best Practices

1. **Consistency**
   - Always use CSS variables when available
   - Maintain theme separation (architecture vs coding)
   - Use established color patterns for similar UI elements

2. **Performance**
   - Use RGBA for transparency instead of opacity property when possible
   - Leverage CSS variables for theme switching
   - Minimize use of complex gradients

3. **Accessibility**
   - Test color contrast ratios
   - Provide non-color indicators (icons, text, patterns)
   - Ensure focus states are clearly visible
   - Support `prefers-color-scheme` and `prefers-reduced-motion`

---

## Quick Reference

### CSS Variables

**Homepage/Base:**
```css
--color-bg: #FAFAFA;
--color-text-primary: #2C2C2C;
--color-text-secondary: #707070;
--color-accent: #8B7E74;
--color-border: #E0E0E0;
```

**Architecture:**
```css
--color-bg: #FFFFFF;
--color-text-primary: #2C2C2C;
--color-accent: #B8936D;
--color-border: #E5E5E5;
```

**Coding:**
```css
--color-bg: #1A1A1A;
--color-text-primary: #E8E8E8;
--color-accent: #64FFDA;
--color-accent-secondary: #7B68EE;
--color-border: #333333;
```

---

## Color Contrast Ratios

### Architecture Theme (Light)

| Combination | Ratio | WCAG Level |
|------------|-------|------------|
| `#2C2C2C` on `#FFFFFF` | 14.59:1 | AAA |
| `#606060` on `#FFFFFF` | 6.48:1 | AA+ |
| `#B8936D` on `#FFFFFF` | 3.09:1 | Large text only |

### Coding Theme (Dark)

| Combination | Ratio | WCAG Level |
|------------|-------|------------|
| `#E8E8E8` on `#1A1A1A` | 13.68:1 | AAA |
| `#A0A0A0` on `#1A1A1A` | 7.37:1 | AAA |
| `#64FFDA` on `#1A1A1A` | 11.84:1 | AAA |

---

**Last updated:** October 2025  
**Maintained by:** Michał Wicherek

