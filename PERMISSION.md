# 🔐 Angular Permission System

This document explains how the Angular permission system is set up.  
It centralizes **permission handling** so UI elements, routes, and logic are consistent with the permissions array returned from the backend.

---

## 🚀 How It Works

1. **UserStore**
   - On app boot, fetch the current user + their `permission_id`s.
   - Store them in a `Set<number>` for O(1) lookups.
   - Helpers:
     - `has(permId)` – check a single permission
     - `anyOf([permIds])` – check if the user has *at least one*
     - `allOf([permIds])` – check if the user has *all*

2. **Permissions Enum**
   - Maps numeric IDs to descriptive names (e.g., `Perm.ManageUsers = 2`).
   - Keeps the code readable and avoids “magic numbers”.

3. **Route Guards (`canMatch`)**
   - Protect routes at the router level using `requirePerm(...)`.
   - Redirect unauthorized users to `/forbidden` (or another page).

4. **Structural Directive: `*can`**
   - Show/hide UI elements based on permissions.
   - Supports single, any-of, and all-of checks.
   - Automatically reacts to changes in the user store.

5. **Imperative Checks**
   - Use `userStore.has(...)` in components/services to guard actions.

---

## 🗂 File Layout

```
src/app/
  store/
    user.store.ts         # holds user + permissions as signals
    permissions.model.ts  # enum mapping IDs → names
  guards/
    require-perm.can-match.ts # route guard
  directives/
    can.directive.ts       # structural directive
```

---

## 📦 Boot Integration

Load permissions during app boot:

```ts
const me = await this.auth.boot();       // includes `permissions: [{ permission_id: 2 }, ...]`
this.userStore.setMe(me);                // load into store
```

---

## 🛣 Route Example

```ts
export const routes: Routes = [
  {
    path: 'billing',
    canMatch: [requirePerm(Perm.ViewBilling)],
    loadComponent: () => import('./billing/page').then(m => m.BillingPage),
  },
];
```

---

## 🎨 Template Example

```html
<!-- single permission -->
<button *can="Perm.CreateWorkOrders">Add Work Order</button>

<!-- any-of -->
<div *can="[Perm.ViewBilling, Perm.ViewReports]; canAny">
  <app-reports-summary />
</div>

<!-- all-of -->
<button *can="[Perm.ViewBilling, Perm.ExportData]; canAll">
  Export
</button>
```

---

## ⚡ Component/Service Example

```ts
if (!this.userStore.has(Perm.EditWorkOrders)) {
  this.toastr.error('You do not have permission to edit Work Orders');
  return;
}
```

---

## ✅ Best Practices

- **Enforce permissions server-side as well** (Laravel Gates/Policies).
- Keep `permissions.model.ts` as the single source of truth for IDs.
- Use the directive in templates, guards for routes, and store helpers in logic.
- Reload permissions if a user switches accounts/tenants.
