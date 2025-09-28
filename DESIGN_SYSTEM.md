# EZ Client UI Design System

This document outlines the design patterns and conventions used throughout the EZ Client UI application to ensure consistency and maintainability.

## Core Design Principles

### 1. Modern & Clean
- Use rounded corners (12px for cards, 8px for smaller elements)
- Subtle shadows with smooth transitions
- Generous white space and proper padding
- Clean typography hierarchy

### 2. Consistent Layout Patterns
- Container max-width: 1400px with auto centering
- Standard padding: 2rem for main containers, 1.5rem for cards
- Grid-based layouts with 1.5rem gaps
- Responsive breakpoints at 1200px and 992px

### 3. Color System
- Primary: `var(--bs-primary)` (#096361)
- Secondary: `var(--bs-secondary)` (#095D63)
- Use CSS custom properties for consistency
- Gradient backgrounds for icons/avatars

## Component Patterns

### Dashboard/Page Container
```scss
.dashboard-container {
  padding: 2rem;
  max-width: 1400px;
  margin: 0 auto;
}
```

### Page Header
```html
<div class="dashboard-header">
  <div class="header-content">
    <div class="dashboard-icon"> <!-- or user-avatar -->
      <i class="bi bi-icon-name"></i>
    </div>
    <div class="header-text">
      <h1 class="dashboard-title">Page Title</h1>
      <p class="dashboard-subtitle">Page description</p>
    </div>
  </div>
</div>
```

```scss
.dashboard-header {
  margin-bottom: 2rem;
  
  .header-content {
    display: flex;
    align-items: center;
    gap: 1rem;
  }
  
  .dashboard-icon, .user-avatar {
    width: 64px;
    height: 64px;
    background: linear-gradient(135deg, var(--bs-primary), var(--bs-secondary));
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: 2rem;
  }
  
  .header-text {
    .dashboard-title {
      font-size: 2rem;
      font-weight: 700;
      margin: 0;
      color: var(--bs-dark);
    }
    
    .dashboard-subtitle {
      color: var(--bs-secondary);
      margin: 0;
      font-size: 1.1rem;
      font-weight: 500;
    }
  }
}
```

### Modern Card Component
```html
<div class="card modern-card">
  <div class="card-header">
    <div class="card-title">
      <i class="bi bi-icon-name"></i>
      <span>Card Title</span>
    </div>
    <!-- Optional action button -->
    <button class="btn btn-outline-primary btn-sm">Action</button>
  </div>
  <div class="card-body">
    <!-- Card content -->
  </div>
</div>
```

```scss
.modern-card {
  border: none;
  border-radius: 12px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
  }
  
  .card-header {
    background: transparent;
    border-bottom: 1px solid var(--bs-border-color);
    padding: 1.5rem;
    
    .card-title {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      font-size: 1.1rem;
      font-weight: 600;
      margin: 0;
      color: var(--bs-dark);
      
      i {
        color: var(--bs-primary);
        font-size: 1.25rem;
      }
    }
  }
  
  .card-body {
    padding: 1.5rem;
    
    &.table-container {
      padding: 1rem;
    }
  }
}
```

### Grid Layouts
Use CSS Grid for responsive layouts:

```scss
.dashboard-grid {
  display: grid;
  grid-template-columns: 1fr 2fr; // Adjust ratios as needed
  gap: 1.5rem;
  
  @media (max-width: 1200px) {
    grid-template-columns: 1fr;
  }
}
```

### Empty States
```html
<div class="empty-state">
  <i class="bi bi-relevant-icon"></i>
  <h6>No Items Yet</h6>
  <p>Description with optional <a class="link-primary" (click)="action()">call to action</a>.</p>
</div>
```

```scss
.empty-state {
  text-align: center;
  padding: 2rem 1rem;
  
  i {
    font-size: 3rem;
    color: var(--bs-border-color);
    margin-bottom: 1rem;
  }
  
  h6 {
    font-weight: 600;
    color: var(--bs-dark);
    margin-bottom: 0.5rem;
  }
  
  p {
    color: var(--bs-secondary);
    margin: 0;
  }
}
```

### Information Display
For profile/info sections:

```scss
.info-grid {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.info-item {
  .info-label {
    font-size: 0.875rem;
    font-weight: 500;
    color: var(--bs-secondary);
    margin-bottom: 0.25rem;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }
  
  .info-value {
    font-size: 1rem;
    font-weight: 600;
    color: var(--bs-dark);
  }
}
```

## Typography Scale

- **Page Title**: 2rem, font-weight: 700
- **Card Title**: 1.1rem, font-weight: 600
- **Section Heading**: 1rem, font-weight: 600
- **Body Text**: 1rem, font-weight: 400
- **Small Text**: 0.875rem
- **Labels**: 0.875rem, font-weight: 500, uppercase, letter-spacing: 0.5px

## Spacing System

- **Container Padding**: 2rem
- **Card Padding**: 1.5rem
- **Grid Gap**: 1.5rem
- **Element Gap**: 1rem (standard), 0.75rem (tight), 1.25rem (loose)
- **Margin Bottom**: 2rem (sections), 1rem (elements)

## Interactive Elements

### Buttons
- Use existing Bootstrap button classes
- Prefer `btn-outline-primary` for secondary actions
- Use `btn-sm` for compact spaces

### Links
```scss
.link-primary {
  cursor: pointer;
  text-decoration: none;
  
  &:hover {
    text-decoration: underline;
  }
}
```

### Form Elements
- Follow Bootstrap form styling
- Use consistent spacing and sizing
- Add proper focus states

## Responsive Design

### Breakpoints
- **Large**: 1200px+ (multi-column grids)
- **Medium**: 992px+ (simplified grids)
- **Small**: <992px (single column)

### Grid Behavior
```scss
@media (max-width: 1200px) {
  .dashboard-grid {
    grid-template-columns: 1fr;
    
    .grid-item {
      grid-column: 1;
      grid-row: auto;
    }
  }
}
```

### Quick Add Modal Pattern
For multi-step forms and quick creation workflows:

```html
<div class="modal show d-block" tabindex="-1" style="background-color: rgba(0,0,0,0.5);">
  <div class="modal-dialog modal-lg modal-dialog-scrollable">
    <div class="modal-content border-0 shadow">
      <!-- Modal Header with Icon -->
      <div class="dashboard-header">
        <div class="header-content">
          <div class="dashboard-icon">
            <i class="bi bi-folder-plus"></i>
          </div>
          <div class="header-text">
            <h1 class="dashboard-title">{{ title }}</h1>
            <p class="dashboard-subtitle">Step {{ currentStep }} of {{ totalSteps }}</p>
          </div>
        </div>
        <button type="button" class="btn-close" (click)="onCancel()"></button>
      </div>
      
      <!-- Progress Bar -->
      <div class="mb-4">
        <div class="progress" style="height: 6px">
          <div class="progress-bar" [style.width.%]="(currentStep / totalSteps) * 100"></div>
        </div>
        <div class="d-flex justify-content-between mt-2">
          <small class="text-muted" [class.text-primary]="currentStep >= 1" [class.fw-bold]="currentStep >= 1">Step 1</small>
          <small class="text-muted" [class.text-primary]="currentStep >= 2" [class.fw-bold]="currentStep >= 2">Step 2</small>
          <small class="text-muted" [class.text-primary]="currentStep >= 3" [class.fw-bold]="currentStep >= 3">Step 3</small>
        </div>
      </div>
      
      <!-- Form Content -->
      <form [formGroup]="form" (ngSubmit)="onSubmit()">
        <!-- Step Content Cards -->
        <div class="card modern-card">
          <div class="card-header">
            <div class="card-title">
              <i class="bi bi-step-icon"></i>
              <span>Step Title</span>
            </div>
          </div>
          <div class="card-body">
            <!-- Form fields -->
          </div>
        </div>
        
        <!-- Navigation Footer -->
        <div class="d-flex justify-content-between mt-4">
          <div>
            @if (currentStep > 1) {
            <button type="button" class="btn btn-outline-secondary" (click)="prevStep()">
              <i class="bi bi-arrow-left me-2"></i>Previous
            </button>
            }
          </div>
          <div class="d-flex gap-2">
            <button type="button" class="btn btn-outline-secondary" (click)="onCancel()">Cancel</button>
            @if (currentStep < totalSteps) {
            <button type="button" class="btn btn-primary" (click)="nextStep()" [disabled]="!canProceed()">
              Next<i class="bi bi-arrow-right ms-2"></i>
            </button>
            } @else {
            <button type="submit" class="btn btn-success" [disabled]="form.invalid">
              <i class="bi bi-check me-2"></i>Create
            </button>
            }
          </div>
        </div>
      </form>
    </div>
  </div>
</div>
```

```scss
.modal-content {
  .dashboard-container {
    padding: 2rem;
  }
  
  .progress {
    height: 6px;
    background-color: var(--bs-border-color);
    
    .progress-bar {
      background: linear-gradient(135deg, var(--bs-primary), var(--bs-secondary));
      transition: width 0.3s ease;
    }
  }
  
  .btn {
    transition: all 0.2s ease-in-out;
    
    &:hover {
      transform: translateY(-1px);
    }
  }
}
```

## Implementation Checklist

When creating new components, ensure:

- [ ] Uses `.dashboard-container` for main wrapper
- [ ] Implements `.dashboard-header` pattern for page headers
- [ ] Uses `.modern-card` for card components
- [ ] Follows grid layout patterns
- [ ] Implements proper empty states
- [ ] Uses consistent typography scale
- [ ] Follows spacing system
- [ ] Includes responsive breakpoints
- [ ] Uses CSS custom properties for colors
- [ ] Includes hover/transition effects
- [ ] Uses Quick Add modal pattern for multi-step forms

## File Organization

Each component should have:
- `component.html` - Clean, semantic HTML structure
- `component.scss` - Component-specific styles following patterns
- Shared styles in global stylesheets when appropriate

## Modal Patterns

### Standard Modal
For simple content display and basic forms:

```html
<div class="modal show d-block" tabindex="-1" style="background-color: rgba(0,0,0,0.5);">
  <div class="modal-dialog modal-lg">
    <div class="modal-content border-0 shadow">
      <div class="modal-header bg-primary text-white">
        <h5 class="modal-title mb-0">
          <i class="bi bi-icon me-2"></i>
          Modal Title
        </h5>
        <button type="button" class="btn-close btn-close-white" (click)="close()"></button>
      </div>
      <div class="modal-body p-4">
        <!-- Content -->
      </div>
      <div class="modal-footer bg-light">
        <button type="button" class="btn btn-outline-secondary" (click)="close()">Close</button>
        <button type="button" class="btn btn-primary" (click)="action()">
          <i class="bi bi-arrow-right me-2"></i>Action
        </button>
      </div>
    </div>
  </div>
</div>
```

## Future Considerations

- Consider extracting common patterns into mixins
- Create utility classes for frequently used patterns
- Maintain this guide as patterns evolve
- Document any new patterns that emerge