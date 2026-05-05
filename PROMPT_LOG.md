# Grocery Delivery App — Development Log
**Project**: Nectar — Grocery Delivery App
**Stack**: React 18 + TypeScript + Vite + Tailwind CSS v4 + Zustand + React Router v6
**Repository**: https://github.com/LabanaKavina/grocery-delivery.git

---

## May 4, 2026 — 12:00 PM

### Project Initialization
- Scaffolded project with Vite + React + TypeScript template
- Configured Tailwind CSS v4 via `@tailwindcss/vite` plugin
- Installed Zustand for state management, React Router v6 for navigation
- Set up self-hosted Gilroy font family (Regular, Medium, SemiBold, Bold) from `/public/fonts/`
- Configured global font in `index.css` with `@font-face` declarations
- Set up project folder structure: `pages/`, `components/atoms/`, `molecules/`, `organisms/`, `templates/`, `stores/`, `hooks/`, `utils/`, `types/`, `services/`

---

## May 4, 2026 — 12:30 PM

### Auth Flow — Splash & Onboarding

**SplashPage**
- Full-screen green (`#53B175`) background with carrot SVG icon + "nectar" wordmark
- Auto-navigates after 2.5s — checks auth state, goes to `/home` if logged in, `/onboarding` if not

**OnboardingPage**
- Full-screen hero image with gradient overlay
- Carrot icon, "Welcome to our store" heading (48px), subtitle, "Get Started" button (353×67px, `#53B175`, border-radius 19px)

---

## May 4, 2026 — 1:00 PM

### Auth Flow — Sign In, Verification, Select Location

**SignInPage**
- Grocery background image (rotated, top-right), frosted glass overlay on bottom half
- "Get your groceries with nectar" heading
- Phone input with globe icon + `+880` prefix + green arrow submit button
- "Or connect with social media" divider
- Google (`#5383EC`) and Facebook (`#4A66AC`) social buttons (67px height, border-radius 19px)
- "Already have an account? Log In" link

**VerificationPage**
- Custom on-screen phone keypad (4 rows × 3 keys, 72px height each)
- OTP display as 4 dashes that fill with typed digits
- Auto-submits when 4 digits entered
- "Resend Code" link + green circular arrow button

**SelectLocationPage**
- Soft gradient background (pink + blue blobs)
- Custom map pin SVG illustration (yellow/green map sections, blue teardrop pin)
- Zone dropdown (Dhaka, Chittagong, Rajshahi, Khulna, Sylhet)
- Area dropdown (populated based on selected zone)
- "Submit" button navigates to `/home`

---

## May 4, 2026 — 2:00 PM

### Auth Flow — Login & Sign Up

**LoginPage**
- Gradient blob background (matching Figma)
- Carrot icon centered at top
- Email + password fields with underline style (no border box)
- Eye toggle for password visibility
- "Forgot Password?" right-aligned
- Validation: email format + password (min 6 chars, 1 uppercase, 1 lowercase, 1 number)
- Errors consolidated into single `errors` object
- "Log In" button (364×67px, `#53B175`)

**SignUpPage**
- Same layout as Login + Username field
- Email field shows green checkmark SVG when valid
- Terms of Service text
- "Sign Up" button

---

## May 4, 2026 — 3:00 PM

### Home Page

**HomePage**
- Location header: carrot icon + map pin + "Dhaka, Banassree"
- Search bar (navigates to `/search` on tap)
- Banner carousel: 3 slides, auto-play every 4s, swipeable, dot indicators
- "Exclusive Offer" section: horizontal scroll on mobile, products filtered by Fresh Fruits & Vegetable category
- "Best Selling" section: products with `reviewRating >= 4`
- "Groceries" section: 4 category filter chips (Pulses, Rice, Bakery, Dairy) with colored backgrounds, filtered product grid below
- ProductCard: shows green `+` button when not in cart → switches to inline `−/count/+` controls when added (reads cart store directly)

---

## May 4, 2026 — 4:00 PM

### Explore, Search & Category Pages

**ExplorePage**
- "Find Products" title (hidden when searching)
- Search bar with filter icon
- 8 category cards in 2-column grid (Fresh Fruits, Cooking Oil, Meat, Bakery, Dairy, Beverages, Pulses, Rice) — each with image, colored border, label
- Filter sheet (bottom modal) with category + brand filters
- Search results replace category grid when query entered

**SearchPage**
- Auto-focused search input on mount
- Debounced search (300ms) via `useDebounce` hook
- Filter sheet integration
- "No results" empty state

**CategoryListPage**
- Handles real `ProductCategory` enum values
- Also handles special slugs: `best-selling` (rating ≥ 4) and `exclusive-offer`
- Filter by brand via filter sheet
- Uses `ProductListLayout` template (back arrow + centered title + filter icon)

---

## May 4, 2026 — 5:00 PM

### Product Detail Page

- Image area: 371px, `#F2F3F2` background, `border-radius: 0 0 25px 25px`
- Back arrow (left: 16px, top: 56px) + share/cart icon inside image area
- Swipeable image carousel (3 slides, touch events, dot indicators)
- Product name (24px bold `#181725`), weight (16px `#7C7C7C`)
- Quantity selector: minus (plain) + count box (45.67×45.67px, border `#E2E2E2`, border-radius 17px) + plus (`#53B175`)
- Price (24px bold, right-aligned)
- Accordion sections: Product Detail (expanded by default), Nutritions (with badge), Review (with star rating)
- "Add To Basket" fixed bottom button (364×67px, `#53B175`) → switches to outlined "Go to Cart" after adding

---

## May 4, 2026 — 6:00 PM

### Cart Page

- Fixed layout: header pinned top, items scrollable, "Go to Checkout" button pinned bottom
- `CartItemRow`: product image (70×65px), name + weight, quantity +/- controls (45.67×45.67px), price
- Minus: `border: 1px solid #F0F0F0` | Plus: `border: 1px solid #E2E2E2` with `#53B175` icon
- Remove item (×) button in `#B3B3B3`
- "Go to Checkout" button with `#489E67` price badge on right
- Empty cart state with "Start Shopping" button

---

## May 4, 2026 — 7:00 PM

### Checkout Sheet & Order Modals

**CheckoutSheet**
- Bottom sheet modal: `#F2F3F2` background, `border-radius: 30px 30px 0 0`
- Dark overlay (40% opacity), `z-[60]` above bottom nav
- 4 rows: Delivery, Payment, Promo Code, Total Cost — each with dropdown
- "Place Order" button enabled only when Delivery + Promo Code selected
- Bottom padding accounts for nav bar height

**OrderAcceptedModal** (inline, no separate route)
- Full-screen blurred grocery background + frosted glass
- Decorative confetti shapes (colored circles, arcs)
- Green checkmark circle (158px, `#53B175`, inner white ring)
- "Track Order" (filled) + "Back to home" (plain text) → both navigate to `/home`

**OrderFailedModal** (inline, no separate route)
- Dark overlay + white card (364px, border-radius 18px)
- `order-failed.png` illustration from assets
- "Please Try Again" (retry logic) + "Back to home"

---

## May 4, 2026 — 8:00 PM

### Favourites Page

- Same fixed header/footer scroll pattern as Cart
- `FavoriteItemRow`: product image, name + weight, price + right chevron
- "Add All To Cart" button (364×67px, `#53B175`)
- Empty state with heart icon

### Account Page

- User avatar placeholder + username + email
- Menu items: Orders, My Details, Delivery Address, Notifications, Help — each with icon + chevron
- "Log Out" button (secondary style)

---

## May 4, 2026 — 9:00 PM

### Navigation & Route Protection

**BottomNavigation** (mobile only, `lg:hidden`)
- 5 tabs: Shop, Explore, Cart, Favourite, Account
- Active tab highlighted in `#53B175`
- Fixed bottom, `z-50`, `h-[92px]`, rounded top corners

**TopNavigation** (desktop only, `hidden lg:block`)
- Logo (green checkmark + "Nectar") + 5 nav tabs
- Active tab underlined in `#53B175`

**ProtectedRoute**
- Checks `isAuthenticated` from auth store
- Redirects to `/login` with `state.from` if not authenticated
- Wraps all main + detail + order routes

**Auth Persistence**
- Zustand `persist` middleware saves `user` + `isAuthenticated` to `localStorage`
- Survives page refresh — authenticated users skip splash/onboarding

---

## May 4, 2026 — 10:00 PM

### Code Cleanup & Refactoring

**Removed unused files**
- `Badge.tsx`, `Icon.tsx`, `Spinner.tsx`, `StarRating.tsx`
- `CategoryCard.tsx`, `OtpInput.tsx`, `AuthForm.tsx`, `AuthLayout.tsx`
- `useToast.ts`, `OrderAcceptedPage.tsx`, `OrderFailedPage.tsx`
- Removed dead imports from `App.tsx`, dead functions from `validators.ts`

**State refactoring**
- Login/SignUp: 3 separate error states → 1 `errors` object
- CartPage: 2 boolean order states → single `orderStatus: 'idle' | 'accepted' | 'failed'`
- CheckoutSheet: removed dead `payment` state, typed `openDropdown` as strict union

---

## May 5, 2026 — 12:00 PM

### Desktop Responsive Implementation

**Strategy**: Mobile-first — all mobile CSS untouched. Desktop additions use `lg:` breakpoint only. Auth pages use `lg:hidden` to wrap mobile absolute layout with a desktop card alongside.

**Auth Pages — Desktop Cards**
- All auth pages (Onboarding, SignIn, Verification, SelectLocation, Login, SignUp) show a centered white card (`max-w-md`, `shadow-xl`, `rounded-2xl`) on desktop
- Onboarding: frosted glass card over full-screen hero image
- SignIn: fixed overlapping button issue — input `calc(100% - 110px)` wide, arrow button `position: absolute right: 25px`
- Verification: 4 OTP boxes with hidden input behind them (captures keyboard), no on-screen keypad on desktop

**Main Pages — Desktop Layout**
- `HomePage`: `max-w-6xl` centered, location header hidden, grocery chips `lg:flex-1`, product sections `lg:grid-cols-4`
- `ProductCard`: `w-[173px]` mobile → `lg:w-full` desktop
- `ExplorePage`: category grid `grid-cols-2` → `lg:grid-cols-4`
- `SearchPage`, `CategoryListPage`: `max-w-7xl` centered
- `AccountPage`: `max-w-2xl` centered

**Cart & Favourites — Desktop Fix**
- Added `.mobile-fixed-page` CSS class with `@media (min-width: 1024px)` override to reset `position: fixed` and `bottom: auto`
- Both pages flow normally on desktop with `max-w-2xl mx-auto`

**Product Detail — Desktop**
- Two-column layout: `lg:flex-row lg:max-w-5xl lg:gap-16`
- Left: "← Back" button + sticky image (420×420px)
- Right: all product info + "Add To Basket" inline (switches to "Go to Cart" after adding)
- Mobile layout unchanged from Figma

---

## May 5, 2026 — 3:00 PM

### Git Push
- Added `.kiro/` to `.gitignore`, unstaged kiro files before commit
- Initial commit pushed to `https://github.com/LabanaKavina/grocery-delivery.git`
- 83 files, 9076 insertions

---

## Feature Summary

| Feature | Mobile | Desktop |
|---|---|---|
| Splash Screen | ✅ | ✅ |
| Onboarding | ✅ | ✅ Card layout |
| Sign In (Phone + OTP) | ✅ | ✅ Card layout |
| Verification (OTP keypad) | ✅ | ✅ Keyboard input |
| Select Location | ✅ | ✅ Card layout |
| Login (Email + Password) | ✅ | ✅ Card layout |
| Sign Up | ✅ | ✅ Card layout |
| Home (Banner + Sections) | ✅ | ✅ 4-col grid |
| Explore (Categories + Search) | ✅ | ✅ 4-col grid |
| Product Detail | ✅ | ✅ 2-col layout |
| Cart (Scroll + Checkout) | ✅ | ✅ Centered |
| Checkout Sheet + Order Modals | ✅ | ✅ |
| Favourites | ✅ | ✅ Centered |
| Account | ✅ | ✅ Centered |
| Search | ✅ | ✅ Centered |
| Category List | ✅ | ✅ 4-col grid |
| Route Protection | ✅ | ✅ |
| Auth Persistence | ✅ | ✅ |
| Form Validation | ✅ | ✅ |
