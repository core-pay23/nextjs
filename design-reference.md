# CorePay Dashboard - Design Reference

## Overview
The **CorePay** is a secure and seamless payment processing system designed for digital assets. It features a sophisticated dark-themed interface with modern design elements and extensive use of glassmorphism effects, offering a sleek and intuitive user experience.

## Color Palette

### Primary Colors
- **Background**: Dark gradient from `#0f172a` (very dark blue) → `#1e293b` (slate) → `#0c1425` (darker blue)
- **Surface**: `slate-900/40` with backdrop blur for glassmorphism effect
- **Borders**: `white/10` (10% opacity white) for subtle dividers
- **Text**: White primary, `white/60` for secondary text

### Accent Colors
- **Primary Orange**: `#db5827` (orange-600)
- **Secondary Orange**: `#e78137` (orange-500) 
- **Purple**: `#8b5cf6` (purple-500)
- **Green**: `#10b981` (emerald-500)
- **Amber**: `#f59e0b` (amber-500)
- **Red**: `#ef4444` (red-500)

### Brand Colors
- **Logo Gradient**: Orange-600 (#db5827) to Orange-500 (#e78137)
- **Status Indicators**: Green (online), Yellow (recording), Gray (away)

## Typography
- **Primary Font**: Inter (Google Fonts)
- **Weights**: 300, 400, 500, 600, 700
- **Additional Fonts**: IBM Plex Serif, IBM Plex Mono (loaded but not actively used)

## Layout Structure

### Sidebar (256px width)
- **Position**: Fixed on mobile (hidden by default), relative on desktop
- **Background**: `slate-900/50` with backdrop blur
- **Border**: Right border with `white/10`
- **Content Sections**:
  1. **Brand Header**: Brand Header: CorePay logo with a subtle, interconnected network icon (representing digital connections/blockchain) within a translucent, glassmorphism-style container. CorePay wordmark in a sleek, modern font, accented by a glowing, subtle gradient underline or side-line, all set against a dark, blurred background.
  2. **Action Button**: "New Track" with keyboard shortcut (⌘N)
  3. **Navigation Menu**: 6 main sections with icons
  4. **Upgrade Prompt**: Premium upsell with gradient background

### Main Content Area
- **Header Bar**: Top navigation with analytics title and user controls
- **Content Grid**: Responsive dashboard sections

## Design Components

### Glass Morphism Effects
- **Background**: Semi-transparent slate with backdrop blur
- **Borders**: Subtle white borders with low opacity
- **Consistent Pattern**: Applied to all cards, sidebar, and overlays

### Icon System
- **Library**: react-feather
- **Style**: Outline icons, consistent sizing (h-4 w-4 to h-5 w-5)
- **Colors**: Contextual coloring based on function

### Interactive Elements

#### Buttons
- **Primary**: Orange gradient background with hover states
- **Secondary**: Transparent with white/10 background, hover transitions
- **Icon Buttons**: Subtle hover effects with color transitions

#### Status Badges
- **Online**: Green background with green text
- **Recording**: Yellow background with yellow text  
- **Away**: Gray background with gray text
- **Live**: Emerald background for streaming status

## Dashboard Sections

### 1. Statistics Cards (Top Row)
- **Layout**: 4-column grid (responsive: 1→2→4 columns)
- **Content**: Total Tracks (247), Storage (84GB), Active Sessions (12), Revenue ($12.4K)
- **Icons**: Colored icons in semi-transparent colored backgrounds
- **Typography**: Small labels, large number displays

### 2. Charts Section
#### Monthly Revenue Trends (2/3 width)
- **Type**: Line chart with filled area
- **Colors**: Orange primary line, purple dashed target line
- **Features**: Year selector dropdown, percentage change indicator
- **Data**: 12 months of revenue data with target comparison

#### Genre Distribution (1/3 width)
- **Type**: Doughnut chart
- **Data**: Hip-Hop (30%), Electronic (25%), Pop (20%), Jazz (15%), Rock (10%)
- **Colors**: Orange spectrum with distinct colors for each genre

### 3. Studio Analytics Row
#### Studio Usage (1/3 width)
- **Type**: Bar chart
- **Data**: 7-day usage pattern
- **Color**: Orange bars with rounded corners

#### Artists Table (2/3 width)
- **Columns**: Artist (with avatar), Genre, Status, Location, Actions
- **Features**: 
  - Profile images from randomuser.me
  - Star ratings for featured artists
  - Status indicators with colored badges
  - Responsive column hiding on smaller screens
  - Hover effects on rows

### 4. Frequency Spectrum Analysis (Full Width)
- **Type**: Bar chart
- **Data**: Audio frequency analysis (20Hz to 20kHz)
- **Color Coding**: 
  - Green: Low amplitude (≤40dB)
  - Amber: Medium amplitude (40-70dB)  
  - Red: High amplitude (>70dB)
- **Labels**: Frequency ranges with proper audio terminology

## Responsive Design

### Breakpoints
- **Mobile**: Default (single column layouts)
- **Small**: `sm:` prefix (2-column stats, show some table columns)
- **Medium**: `md:` prefix (show more table columns)
- **Large**: `lg:` prefix (4-column stats, full table, show sidebar)

### Mobile Features
- **Hamburger Menu**: Top-left button to toggle sidebar
- **Overlay**: Dark backdrop when mobile menu is open
- **Column Hiding**: Table columns progressively hidden on smaller screens
- **Responsive Grid**: Charts stack vertically on mobile

## Interactive Features

### Mobile Navigation
- **Toggle Mechanism**: Hamburger button controls sidebar visibility
- **Smooth Transitions**: 300ms ease-in-out animations
- **Touch-Friendly**: Appropriate touch targets and overlay close

### Chart Interactivity
- **Responsive**: All charts adapt to container sizes
- **Professional Styling**: Chart.js with custom color scheme
- **Data Visualization**: Real-time feel with varied data sets

## Technical Implementation

### Frameworks & Libraries
- **CSS Framework**: Tailwind CSS (CDN)
- **Icons**: Lucide (unpkg CDN)
- **Charts**: Chart.js (CDN)
- **Fonts**: Google Fonts (Inter family)

### Performance Considerations
- **CDN Usage**: All external resources loaded via CDN
- **Warning Suppression**: Custom console.warn override for production warnings
- **Efficient Loading**: Deferred scripts and preconnected font resources

### Accessibility Features
- **Semantic HTML**: Proper heading hierarchy and table structure
- **Color Contrast**: High contrast white text on dark backgrounds
- **Interactive States**: Hover and focus states for all interactive elements
- **Screen Reader Support**: Alt text for images, proper table headers

## Data Presentation Philosophy
The dashboard emphasizes **data density** while maintaining **visual clarity**. Each section serves a specific analytical purpose:
- **Overview metrics** for quick status checks
- **Trend analysis** for business insights  
- **User activity** for operational awareness
- **Technical analysis** for audio engineering insights

The design successfully balances professional music industry aesthetics with modern dashboard UX patterns, creating an interface that feels both technically sophisticated and artistically inspired.