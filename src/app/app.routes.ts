import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./features/home/pages/home/home.component').then((m) => m.HomeComponent),
    title: 'FreshCart | Home',
  },
  {
    path: 'shop',
    loadComponent: () =>
      import('./features/shop/pages/shop/shop.component').then((m) => m.ShopComponent),
    title: 'FreshCart | Shop',
  },
  {
    path: 'shop/:id/:slug',
    loadComponent: () =>
      import('./features/shop/pages/shopdetails/shopdetails.component').then(
        (m) => m.ShopdetailsComponent,
      ),
    title: 'FreshCart | Product Details',
  },

  {
    path: 'catergories',
    loadComponent: () =>
      import('./features/categories/pages/categories/categories.component').then(
        (m) => m.CategoriesComponent,
      ),
    title: 'FreshCart | Categories',
  },
  {
    path: 'catergories/:id',
    loadComponent: () =>
      import('./features/categories/pages/categoriesdetails/categoriesdetails.component').then(
        (m) => m.CategoriesdetailsComponent,
      ),
    title: 'FreshCart | Category Details',
  },

  {
    path: 'brand',
    loadComponent: () =>
      import('./features/brand/pages/brands/brands.component').then((m) => m.BrandsComponent),
    title: 'FreshCart | Brands',
  },
  {
    path: 'brand/:id',
    loadComponent: () =>
      import('./features/brand/pages/detailsbrand/detailsbrand.component').then(
        (m) => m.DetailsbrandComponent,
      ),
    title: 'FreshCart | Brand Details',
  },

  {
    path: 'login',
    loadComponent: () =>
      import('./features/auth/pages/login/login.component').then((m) => m.LoginComponent),
    title: 'FreshCart | Login',
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./features/auth/pages/register/register.component').then((m) => m.RegisterComponent),
    title: 'FreshCart | Register',
  },
  {
    path: 'forgetpassword',
    loadComponent: () =>
      import('./features/auth/pages/forgetpassword/forgetpassword.component').then(
        (m) => m.ForgetpasswordComponent,
      ),
    title: 'FreshCart | Forgot Password',
  },

  {
    path: 'cart',
    loadComponent: () =>
      import('./features/cart/pages/cart/cart.component').then((m) => m.CartComponent),
    title: 'FreshCart | Cart',
  },
  {
    path: 'wishlist',
    loadComponent: () =>
      import('./features/wishlist/pages/wishlist/wishlist.component').then(
        (m) => m.WishlistComponent,
      ),
    title: 'FreshCart | Wishlist',
  },

  {
    path: '**',
    loadComponent: () =>
      import('./layout/notfoundpage/notfoundpage.component').then((m) => m.NotfoundpageComponent),
    title: 'FreshCart | Page Not Found',
  },
];
