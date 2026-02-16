# Styling & Customization Guide

## Overview

Big Pharma uses **Tailwind CSS** for styling with a custom medical-themed color palette. This guide explains how to customize the design.

## Table of Contents

1. [Tailwind CSS Basics](#tailwind-basics)
2. [Color Theme](#color-theme)
3. [Component Styling](#component-styling)
4. [Global Styles](#global-styles)
5. [Responsive Design](#responsive-design)
6. [Dark Mode (Future)](#dark-mode)
7. [Customization Examples](#customization-examples)

---

## Tailwind Basics

### What is Tailwind CSS?

Tailwind is a utility-first CSS framework. Instead of writing custom CSS classes, you compose styling using predefined utility classes.

### Basic Syntax

```html
<!-- Padding, margin, colors, etc. -->
<div class="p-4 m-2 bg-blue-500 text-white rounded-lg">
  Content
</div>

<!-- Responsive breakpoints -->
<div class="text-sm md:text-lg lg:text-2xl">
  Responsive text
</div>

<!-- Hover states -->
<button class="bg-blue-600 hover:bg-blue-700 transition-colors">
  Hover me
</button>
```

### Breakpoints

```
xs     < 640px    (mobile)
sm     640px      (tablet)
md     768px      (small desktop)
lg     1024px     (desktop)
xl     1280px     (large desktop)
2xl    1536px     (extra large)
```

---

## Color Theme

### Primary Colors - Blue

Used for main actions, links, and primary elements.

```
primary-50   #f0f9ff  (lightest)
primary-100  #e0f2fe
primary-200  #bae6fd
primary-300  #7dd3fc
primary-400  #38bdf8
primary-500  #0ea5e9  (main)
primary-600  #0284c7
primary-700  #0369a1
primary-800  #075985
primary-900  #0c3d66  (darkest)
```

**Usage:**
```html
<!-- Background -->
<div class="bg-primary-600">Primary Background</div>

<!-- Text -->
<p class="text-primary-600">Primary Text</p>

<!-- Borders -->
<div class="border-primary-600">Primary Border</div>
```

### Secondary Colors - Green

Used for success, positive actions, and accents.

```
secondary-50   #f0fdf4  (lightest)
secondary-100  #dcfce7
secondary-200  #bbf7d0
secondary-300  #86efac
secondary-400  #4ade80
secondary-500  #22c55e  (main)
secondary-600  #16a34a
secondary-700  #15803d
secondary-800  #166534
secondary-900  #145231  (darkest)
```

**Usage:**
```html
<div class="bg-secondary-500">Success Message</div>
```

### Semantic Colors

```html
<!-- Success -->
<div class="bg-green-100 text-green-800">Success</div>

<!-- Error/Danger -->
<div class="bg-red-100 text-red-800">Error</div>

<!-- Warning -->
<div class="bg-yellow-100 text-yellow-800">Warning</div>

<!-- Info -->
<div class="bg-blue-100 text-blue-800">Info</div>
```

### Gray Palette

```
gray-50    #f9fafb  (almost white)
gray-100   #f3f4f6
gray-200   #e5e7eb
gray-300   #d1d5db
gray-400   #9ca3af
gray-500   #6b7280
gray-600   #4b5563  (default text)
gray-700   #374151
gray-800   #1f2937
gray-900   #111827  (almost black)
```

---

## Component Styling

### Button Component Variants

```html
<!-- Primary (default) -->
<app-button variant="primary">Primary Button</app-button>

<!-- Secondary -->
<app-button variant="secondary">Secondary Button</app-button>

<!-- Danger -->
<app-button variant="danger">Delete</app-button>

<!-- Ghost -->
<app-button variant="ghost">Cancel</app-button>
```

### Button Sizes

```html
<app-button size="sm">Small</app-button>
<app-button size="md">Medium (default)</app-button>
<app-button size="lg">Large</app-button>
```

### Input Component

```html
<app-input
  type="text"
  label="Full Name"
  placeholder="Enter your name"
  [error]="fieldError"
></app-input>
```

### Card/Container

```html
<!-- Basic card -->
<div class="bg-white rounded-lg shadow-md p-6">
  Content
</div>

<!-- Card with bordered style -->
<div class="border border-gray-200 rounded-lg p-6">
  Content
</div>

<!-- Card with hover effect -->
<div class="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6">
  Hover Card
</div>
```

### Typography

```html
<!-- Headings -->
<h1 class="text-4xl font-bold">Title</h1>
<h2 class="text-3xl font-bold">Subtitle</h2>
<h3 class="text-2xl font-semibold">Section</h3>

<!-- Body text -->
<p class="text-base text-gray-600">Regular paragraph</p>

<!-- Small text -->
<span class="text-sm text-gray-500">Small text</span>

<!-- Bold -->
<strong class="font-bold">Bold text</strong>
```

---

## Global Styles

### File Location

`src/styles.css` - Global Tailwind configuration and custom CSS

### Current Global Styles

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

/* Custom animations */
.animate-fade-in {
  animation: fadeIn 0.3s ease-in-out;
}

/* Line clamping for cards */
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
```

### Adding Custom Global Styles

```css
/* In styles.css */
@layer components {
  .card {
    @apply bg-white rounded-lg shadow-md p-6;
  }

  .card-hover {
    @apply card hover:shadow-lg transition-shadow;
  }
}
```

Then use in templates:

```html
<div class="card">Regular card</div>
<div class="card-hover">Hoverable card</div>
```

---

## Responsive Design

### Mobile-First Approach

Always start with mobile styles, then add breakpoint modifiers:

```html
<!-- Single column on mobile, 2 columns on md, 3 on lg -->
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</div>
```

### Common Responsive Pattern

```html
<!-- Sidebar + Content layout -->
<div class="grid grid-cols-1 lg:grid-cols-4 gap-8">
  <!-- Sidebar: full width on mobile, 1/4 on desktop -->
  <div class="lg:col-span-1">Sidebar</div>

  <!-- Main content: full width on mobile, 3/4 on desktop -->
  <div class="lg:col-span-3">Content</div>
</div>
```

### Responsive Text

```html
<div class="text-sm md:text-base lg:text-lg xl:text-xl">
  Responsive heading
</div>
```

### Responsive Spacing

```html
<div class="p-4 md:p-6 lg:p-8">
  <!-- Padding: 16px on mobile, 24px on md, 32px on lg -->
</div>
```

### Responsive Display

```html
<!-- Hide on mobile, show on desktop -->
<div class="hidden lg:block">Desktop only</div>

<!-- Show on mobile, hide on desktop -->
<div class="lg:hidden">Mobile only</div>
```

---

## Dark Mode (Future)

Tailwind supports dark mode out of the box. To enable in the future:

```javascript
// tailwind.config.js
module.exports = {
  darkMode: 'class', // or 'media'
  // ...
}
```

Then use dark mode classes:

```html
<div class="bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
  Dark mode compatible
</div>
```

---

## Customization Examples

### Customize Theme Colors

Edit `tailwind.config.js`:

```javascript
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f9ff',
          // ... customize colors
        },
        secondary: {
          // ... your secondary colors
        },
      },
    },
  },
}
```

### Add Custom Font

```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        serif: ['Georgia', 'serif'],
        mono: ['Courier New', 'monospace'],
      },
    },
  },
}
```

```html
<!-- Use custom fonts -->
<div class="font-sans">Sans font (default)</div>
<div class="font-serif">Serif font</div>
<div class="font-mono">Monospace font</div>
```

### Add Custom Spacing

```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      spacing: {
        '128': '32rem',
        '144': '36rem',
      },
    },
  },
}
```

### Add Custom Animations

```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      animation: {
        bounce: 'bounce 1s infinite',
        spin: 'spin 1s linear infinite',
      },
      keyframes: {
        bounce: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
    },
  },
}
```

---

## Common Styling Patterns

### Gradient Background

```html
<!-- Blue to green gradient -->
<div class="bg-gradient-to-r from-primary-600 to-secondary-600 text-white">
  Gradient Background
</div>

<!-- Top to bottom -->
<div class="bg-gradient-to-b from-blue-500 to-blue-800">
  Vertical Gradient
</div>

<!-- Diagonal -->
<div class="bg-gradient-to-br from-primary-500 to-secondary-500">
  Diagonal Gradient
</div>
```

### Shadows

```html
<!-- No shadow -->
<div class="shadow-none">No shadow</div>

<!-- Small shadow -->
<div class="shadow-sm">Small shadow</div>

<!-- Medium shadow (default) -->
<div class="shadow-md">Medium shadow</div>

<!-- Large shadow -->
<div class="shadow-lg">Large shadow</div>

<!-- Extra large shadow -->
<div class="shadow-xl">Extra large shadow</div>
```

### Borders

```html
<!-- Simple border -->
<div class="border border-gray-300">Bordered</div>

<!-- Colored border -->
<div class="border-2 border-primary-600">Primary border</div>

<!-- Rounded border -->
<div class="border-4 border-primary-600 rounded-lg">
  Rounded border
</div>

<!-- Top border only -->
<div class="border-t-4 border-primary-600">Top border</div>
```

### Transitions

```html
<!-- Smooth color transition -->
<button class="bg-primary-600 hover:bg-primary-700 transition-colors">
  Hover me
</button>

<!-- All property transition -->
<div class="transition-all duration-300 hover:shadow-lg">
  All transitions
</div>

<!-- Custom duration -->
<div class="bg-primary-600 hover:bg-primary-700 transition-colors duration-500">
  Slow transition
</div>
```

### Flexbox Layout

```html
<!-- Flex container, center items -->
<div class="flex items-center justify-center h-64">
  Centered content
</div>

<!-- Space between items -->
<div class="flex justify-between items-center">
  <span>Left</span>
  <span>Right</span>
</div>

<!-- Column layout -->
<div class="flex flex-col gap-4">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</div>
```

### Grid Layout

```html
<!-- Responsive grid -->
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</div>

<!-- Auto-fit grid -->
<div class="grid auto-cols-max gap-4">
  <div>Auto width</div>
  <div>Auto width</div>
</div>
```

---

## Performance Tips

### 1. Purge Unused Styles

Tailwind automatically purges unused styles in production. Make sure to include all template paths in `tailwind.config.js`:

```javascript
module.exports = {
  content: [
    './src/**/*.{html,ts,tsx,jsx,js}',
  ],
}
```

### 2. Use @apply for Repeated Patterns

Instead of repeating classes:

```html
<!-- ❌ Avoid -->
<div class="bg-white rounded-lg shadow-md p-6">Item 1</div>
<div class="bg-white rounded-lg shadow-md p-6">Item 2</div>

<!-- ✅ Better -->
<div class="card">Item 1</div>
<div class="card">Item 2</div>
```

Where `card` is defined in CSS:

```css
@layer components {
  .card {
    @apply bg-white rounded-lg shadow-md p-6;
  }
}
```

### 3. Avoid Dynamic Class Names

Tailwind scans static strings. Avoid dynamic class names:

```typescript
// ❌ Won't work - Tailwind can't find these
const bgColor = `bg-${colorName}-500`;
<div [class]="bgColor">Content</div>

// ✅ Better - Use explicit classes
<div [ngClass]="getBgClass()">Content</div>
```

```typescript
getBgClass() {
  if (this.error) return 'bg-red-100 text-red-800';
  if (this.success) return 'bg-green-100 text-green-800';
  return 'bg-gray-100 text-gray-800';
}
```

---

## Troubleshooting

### Styles Not Applying

1. Check file is saved
2. Check Tailwind config includes the file
3. Rebuild: `npm run build`
4. Restart dev server

### Class Not Working

1. Tailwind doesn't have that class
2. Use Tailwind documentation for correct class name
3. Check for typos

### Performance Issues

1. Check for dynamic class names
2. Ensure PostCSS is configured
3. Check node_modules size
4. Run production build to test

---

## Resources

- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Tailwind UI Components](https://tailwindui.com)
- [Tailwind CSS IntelliSense](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss)

---

## Quick Reference

### Commonly Used Classes

```
Spacing:     p-4, m-2, mt-6, mb-4, gap-4
Colors:      text-gray-600, bg-primary-500, border-red-300
Layout:      flex, grid, grid-cols-3
Responsive:  md:flex, lg:hidden
Typography:  text-lg, font-bold, font-semibold
Shadows:     shadow-md, shadow-lg
Rounded:     rounded, rounded-lg, rounded-full
Transitions: transition, transition-colors, duration-300

Size modifiers:
sm = small     md = medium    lg = large
```

---

For more information, see the main [FRONTEND.md](./FRONTEND.md) documentation.
