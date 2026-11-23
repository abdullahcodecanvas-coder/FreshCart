# 🛒 FreshCart – E-commerce App (Angular)

FreshCart is a modern, responsive e-commerce web application built with **Angular** (standalone components) and **Tailwind CSS v4**. It lets users browse products, manage a cart and wishlist, place orders, and manage their profile.

🔗 **Live Demo:** [your-live-demo-link-here](https://your-live-demo-link-here)

---

## ✨ Features

### 🔐 Authentication
- Register and login
- Forgot password / verify code / reset password
- Logout
- Route guards to protect private pages
- HTTP interceptor to attach the auth token to requests

### 🏠 Home
- Hero slider and promo banners (animated on scroll)
- "Shop By Category" section
- Featured products

### 🛍️ Shop & Products
- Products listing with reusable product card
- Product discount badge and star ratings
- Product details page
- Search, filtering and pagination

### 🗂️ Categories & Brands
- Browse all categories and brands
- Dropdown categories menu in the navbar

### 🧺 Cart
- Add / remove products
- Update item quantity
- Order summary with total price
- Empty cart state
- Visual ✓ indicator on the "Add to cart" button after adding

### ❤️ Wishlist
- Add products to the wishlist
- Visual indicator (filled red heart) after adding

### 📦 Orders
- View all user orders
- Expandable order cards with status, date, items, delivery address and total

### 👤 Profile
- Profile sidebar navigation
- Account settings
- Manage addresses

### 🌍 UX & Extras
- Multi-language support (Arabic / English) using ngx-translate
- Toast notifications (success / warning / error)
- Fully responsive design (desktop, tablet and mobile)
- Loading and error states
- Custom 404 page
- Lazy-loaded routes

---

## 🧰 Tech Stack

| Category | Technology |
| --- | --- |
| Framework | Angular (Standalone Components, Signals) |
| Styling | Tailwind CSS v4, Flowbite |
| Icons | Font Awesome |
| Font | Exo |
| Notifications | ngx-toastr |
| Translation | ngx-translate |
| API | RESTful API (Route E-commerce API) |
| Deployment | Vercel |

---

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (LTS)
- Angular CLI

```bash
npm install -g @angular/cli
```

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/your-username/freshcart.git

# 2. Go to the project folder
cd freshcart

# 3. Install dependencies
npm install

# 4. Run the development server
ng serve
```

Then open `http://localhost:4200/` in your browser.

### Build for production

```bash
ng build
```

The output will be in `dist/<project-name>/browser`.

---

## 📁 Project Structure

```
src/app
├── core        # guards, interceptors, services used app-wide
├── features    # auth, home, shop, cart, wishlist, orders, profile ...
├── shared      # reusable UI components (navbar, product card, ...)
└── app.routes.ts
```

---

## 📸 Screenshots

> Add screenshots of the main pages here (Home, Shop, Cart, Wishlist, Orders, Profile).

---

## 👨‍💻 Author

**Abdullah Mahmoud**
- GitHub: (https://github.com/abdullahcodecanvas-coder)
- LinkedIn:(https://www.linkedin.com/in/codecanvasabdullah-89a26140b/)
