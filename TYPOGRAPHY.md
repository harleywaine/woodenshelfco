# Typography System

This document outlines the global typography classes used throughout The Wooden Shelf Company website.

## Global Typography Classes

### Headings

#### Hero Title
- **Class**: `text-hero-mobile md:text-hero`
- **Font**: Playfair Display (serif)
- **Weight**: 500 (medium)
- **Size**: 4rem mobile, 6rem desktop
- **Line Height**: 1.1
- **Usage**: Main hero titles on homepage

#### Section Titles
- **Class**: `text-section-title-mobile md:text-section-title`
- **Font**: Playfair Display (serif)
- **Weight**: 300 (light)
- **Size**: 2.25rem mobile, 3rem desktop
- **Line Height**: 1.2
- **Usage**: Section headings throughout the site

### Body Text

#### Large Body Text
- **Class**: `text-body-large`
- **Font**: Inter (sans-serif)
- **Weight**: 300 (light)
- **Size**: 1.25rem
- **Line Height**: 1.6
- **Usage**: Hero taglines, important descriptions

#### Regular Body Text
- **Class**: `text-body`
- **Font**: Inter (sans-serif)
- **Weight**: 300 (light)
- **Size**: 1.125rem
- **Line Height**: 1.6
- **Usage**: Standard paragraph text

#### Small Body Text
- **Class**: `text-body-small`
- **Font**: Inter (sans-serif)
- **Weight**: 300 (light)
- **Size**: 1rem
- **Line Height**: 1.5
- **Usage**: Smaller descriptions, captions

### Interactive Elements

#### Buttons
- **Class**: `text-button`
- **Font**: Inter (sans-serif)
- **Weight**: 600 (semibold)
- **Size**: 1.125rem
- **Line Height**: 1.4
- **Usage**: All button text

#### Captions
- **Class**: `text-caption`
- **Font**: Inter (sans-serif)
- **Weight**: 500 (medium)
- **Size**: 0.875rem
- **Line Height**: 1.4
- **Usage**: Small labels, badges, metadata

## Usage Guidelines

### Font Families
- **Playfair Display**: Use for all headings and titles
- **Inter**: Use for all body text and UI elements

### Font Weights
- **300 (light)**: All body text and section titles
- **500 (medium)**: Hero titles only
- **600 (semibold)**: Button text only
- **700 (bold)**: Reserved for special emphasis (use sparingly)

### Responsive Design
- Always use mobile-first approach with `md:` breakpoints
- Hero and section titles have separate mobile/desktop classes
- Body text scales appropriately across devices

## Examples

```html
<!-- Hero Section -->
<h1 class="text-hero-mobile md:text-hero font-serif">
  The Wooden Shelf Company
</h1>
<p class="text-body-large">
  Each live edge shelf tells the story of a tree...
</p>

<!-- Section -->
<h2 class="text-section-title-mobile md:text-section-title font-serif">
  From the New Forest
</h2>
<p class="text-body">
  Our wood comes from the legendary New Forest...
</p>

<!-- Button -->
<button class="text-button">
  Design Your Shelf
</button>
```

## Benefits

1. **Consistency**: All text follows the same typography rules
2. **Maintainability**: Easy to update typography globally
3. **Responsive**: Built-in mobile/desktop scaling
4. **Performance**: Optimized font loading and rendering
5. **Accessibility**: Proper line heights and font weights for readability
