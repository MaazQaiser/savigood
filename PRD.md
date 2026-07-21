# Savi — Product Requirements Document

**Version:** 1.0  
**Date:** July 20, 2026  
**Status:** Active

---

## 1. Product Overview

Savi is a B2B procurement platform consisting of two applications delivered as a single design-first React codebase:

- **Buyer Portal** — A self-service interface for buyers to manage quotes, payments, orders, shipments, files, and communication.
- **Admin Dashboard** — An internal operations tool for admins to manage clients, RFQs, quotes, orders, reports, and buyer communications.

The product is UI-only at this stage. All screens are built against mock data. Backend integration is out of scope for this design build.

---

## 2. Goals

- Deliver a complete, production-quality UI for both the Buyer Portal and Admin Dashboard.
- Establish a strict Black & White design system as the single visual language.
- Cover all 17 functional modules across 6 design phases with no additions.
- Achieve full responsiveness across Desktop, Tablet, and Mobile breakpoints.
- Produce an interactive prototype ready for design QA.

---

## 3. Non-Goals

- Marketing website or landing page of any kind.
- Features or screens not explicitly listed in this PRD.
- Backend API, database, authentication logic, or server-side rendering.
- Phase 2 product expansions or future roadmap items not listed here.
- Third-party integrations beyond mock UI representations.

---

## 4. Tech Constraints

| Concern | Decision |
|---|---|
| Framework | React (design-ready SPA) |
| Styling | Tailwind CSS |
| Component Library | shadcn/ui |
| Theme | Black & White — minimal enterprise SaaS |
| Responsive targets | Desktop → Tablet → Mobile |
| Runtime | Vite (to be confirmed at scaffold phase) |
| Mock data | Static/in-memory — no API calls |

---

## 5. Personas

### Buyer
A procurement manager or purchaser at a client company. Uses the Buyer Portal to:
- Request and approve quotes.
- Make deposit and balance payments.
- Track orders and shipments.
- Upload and manage documents.
- Communicate with admins via chat.

### Admin
An internal operations or sales team member. Uses the Admin Dashboard to:
- Receive and respond to RFQs.
- Build and send quotes.
- Manage client records.
- Update order and shipment status.
- Generate reports.
- Communicate with buyers via chat.

---

## 6. Design Phases

### Phase 1 — Design System Foundation

Establish all tokens, typography, and reusable components that all subsequent phases consume.

**Deliverables:**

| Category | Components |
|---|---|
| Tokens | Design Tokens, Color System (B&W), Spacing System, Grid System |
| Typography | Type scale, weights, line heights |
| Icons | Icon library integration |
| Form elements | Buttons, Inputs, Forms |
| Data display | Tables, Cards, Badges |
| Overlays | Modals |
| Navigation | Sidebar, Header, Breadcrumb, Tabs |
| Feedback | Toasts, Empty States, Loading States, Error States |

---

### Phase 2 — Authentication

| Screen | Description |
|---|---|
| Login | Email + password entry with validation |
| Forgot Password | Email submission to trigger reset |
| Reset Password | New password + confirm password entry |

---

### Phase 3 — Buyer Portal

#### Module 1 — Dashboard
| Screen | Description |
|---|---|
| Dashboard | Overview with active quote count, recent orders, shipment status summary |
| Active Quotes | Quick-view list of in-progress quotes |
| Recent Orders | Latest order rows with status indicators |
| Shipment Status | High-level shipment progress indicators |

#### Module 2 — Quotes
| Screen | Description |
|---|---|
| Quote List | Paginated table of all buyer quotes with status badges |
| Quote Details | Line items, pricing, attached files, action area |
| Approve Quote | Confirmation modal or inline action |
| Reject Quote | Rejection modal with optional reason field |

#### Module 3 — Payments
| Screen | Description |
|---|---|
| Payment Screen | Summary of outstanding balances and payment options |
| Deposit Payment | Payment form for initial deposit |
| Balance Payment | Payment form for remaining balance |
| Payment Success | Confirmation screen with reference number |

#### Module 4 — Orders
| Screen | Description |
|---|---|
| Order List | Paginated table of all buyer orders |
| Order Details | Full order summary, line items, status |
| Shipment Timeline | Visual step-by-step timeline component |
| Tracking Widget Section | Embedded tracking status widget area |

#### Module 5 — Chat
| Screen | Description |
|---|---|
| Conversation List | List of active conversations with unread indicators |
| Chat Window | Message thread, input bar, file attachment support |

#### Module 6 — File Upload
| Screen | Description |
|---|---|
| Upload Files | Drag-and-drop + browse file uploader |
| File List | Grid or list of uploaded documents with metadata |

#### Module 7 — Account
| Screen | Description |
|---|---|
| Profile | View and edit buyer profile fields |
| Change Password | Current password + new password + confirm |

---

### Phase 4 — Admin Dashboard

#### Module 1 — Dashboard
| Screen | Description |
|---|---|
| Dashboard | Summary metrics: open RFQs, active quotes, orders, revenue indicators |

#### Module 2 — Clients
| Screen | Description |
|---|---|
| Client List | Searchable, filterable client table |
| Client Details | Full client profile, order history, documents |
| Add/Edit Client | Form for creating or updating a client record |

#### Module 3 — RFQs
| Screen | Description |
|---|---|
| RFQ Inbox | Incoming RFQ list with status and buyer attribution |
| RFQ Details | Full RFQ content, attached files, respond/quote actions |

#### Module 4 — Quote Builder
| Screen | Description |
|---|---|
| Quote List | Admin-side list of all quotes with statuses |
| Create Quote | Quote creation form linked to an RFQ or client |
| Edit Quote | Editable version of an existing quote |
| Line Items | Add, edit, delete individual line items within a quote |

#### Module 5 — Orders
| Screen | Description |
|---|---|
| Order List | Admin view of all orders across all buyers |
| Order Details | Full order record with status controls |
| Update Status | Inline or modal action to change order status |
| Shipment Status | Current shipment state per order |
| Manual Tracking Override | Form to manually enter or correct tracking data |

#### Module 6 — Reports
| Screen | Description |
|---|---|
| Clients Report | Client activity and order metrics view |
| RFQs Report | RFQ volume, response rates, conversion data |
| Orders Report | Order totals, statuses, timelines |

#### Module 7 — Chat
| Screen | Description |
|---|---|
| Buyer Conversations | List of all buyer conversations for admin |
| Chat Detail | Full message thread for a selected buyer conversation |

#### Module 8 — File Access
| Screen | Description |
|---|---|
| Uploaded Files | Admin view of all buyer-uploaded files |

---

### Phase 5 — Supporting Screens

#### Legal
| Screen |
|---|
| Terms of Service |
| Privacy Policy |
| MSA (Master Service Agreement) |

#### System States
| Screen |
|---|
| 404 Not Found |
| 500 Server Error |
| Empty State (reusable pattern) |
| Loading State (reusable pattern) |

---

### Phase 6 — Responsive & Prototype

| Deliverable | Description |
|---|---|
| Desktop Responsive | All screens validated at ≥1280px |
| Tablet Responsive | All screens validated at 768–1279px |
| Mobile Responsive | All screens validated at 375–767px |
| Interactive Prototype | Linked navigation flows across screens |
| Final Design QA | Full audit against Phase 1–5 deliverables |

---

## 7. Design System Requirements

### Color System

| Token | Value | Usage |
|---|---|---|
| `--color-background` | `#FFFFFF` | Page backgrounds |
| `--color-foreground` | `#000000` | Primary text |
| `--color-border` | `#E5E5E5` | Borders, dividers |
| `--color-muted` | `#737373` | Secondary text, placeholders |
| `--color-muted-bg` | `#F5F5F5` | Table row hover, input bg |
| `--color-accent` | `#000000` | Buttons, active states |
| `--color-destructive` | `#EF4444` | Error and delete states |
| `--color-success` | `#22C55E` | Success states |
| `--color-warning` | `#F59E0B` | Warning states |

### Typography

- Display: large headings, hero labels — bold weight
- Heading 1–4: section and page titles
- Body: default paragraph text — regular weight
- Small / Label: metadata, badges, table cells
- Monospace: reference numbers, tracking IDs

### Spacing

Base unit: `4px`. Scale: 4, 8, 12, 16, 24, 32, 48, 64, 96.

### Grid

- Desktop: 12-column, 24px gutter, 80px max sidebar
- Tablet: 8-column, 16px gutter, collapsible sidebar
- Mobile: 4-column, 16px gutter, bottom nav or hamburger

### Component Checklist (Phase 1)

- [ ] Design tokens file (`tokens.css` / `tailwind.config`)
- [ ] Button variants: primary, secondary, ghost, destructive, disabled
- [ ] Input: text, password, search, disabled, error state
- [ ] Select / Dropdown
- [ ] Checkbox, Radio, Toggle
- [ ] Form layout with label, hint, validation message
- [ ] Table: header, row, hover, empty, loading skeleton
- [ ] Card: base, interactive, with header/footer
- [ ] Badge: neutral, success, warning, error, info
- [ ] Modal: base, confirmation, form modal
- [ ] Sidebar: collapsed + expanded states
- [ ] Header: with user menu, notifications
- [ ] Breadcrumb
- [ ] Tabs: horizontal, with count badges
- [ ] Toast: success, error, warning, info
- [ ] Empty state: with icon, title, CTA
- [ ] Loading state: skeleton, spinner
- [ ] Error state: inline + page-level

---

## 8. Module Summary

| Phase | Scope | Module Count |
|---|---|---|
| Phase 1 | Design System | 1 |
| Phase 2 | Authentication | 1 |
| Phase 3 | Buyer Portal | 7 |
| Phase 4 | Admin Dashboard | 8 |
| Phase 5 | Legal & System Screens | 1 |
| Phase 6 | Responsive Design & Prototype | 1 |
| **Total** | | **19 deliverable groups** |

**Functional modules: 17**  
**Total named screens: ~65**

---

## 9. Out of Scope

- Marketing website, landing page, or promotional surfaces
- Any screen not explicitly named in Section 6
- Backend API, server logic, database, or authentication services
- Payment gateway integration (UI mock only)
- Real-time chat infrastructure (UI mock only)
- File storage or CDN (UI mock only)
- Analytics, tracking scripts, or telemetry
- Email templates or notification services
- Multi-language / i18n support
- Accessibility audit beyond basic semantic HTML

---

## 10. Success Criteria

| Criterion | Acceptance |
|---|---|
| All Phase 1–5 screens present | Every named screen in Section 6 renders without error |
| Design system applied | All screens use tokens from Phase 1; no hardcoded colors or type sizes |
| B&W theme consistent | No color outside the token set used anywhere in the UI |
| Responsive | All screens pass visual review at 375px, 768px, and 1280px |
| Navigation | All primary routes are linked and reachable from the sidebar/header |
| Interactive prototype | Key buyer flows (quote approve, payment, order tracking) are clickable end-to-end |
| No out-of-scope features | No screens, modules, or functionality beyond this PRD exist in the codebase |

---

*This document is the single source of truth for the Savi design build. Any proposed change to scope must update this PRD before implementation.*
