import { Routes } from '@angular/router';
import { logedGuard } from './core/guard/loged-guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./features/home/pages/home/home.component').then((m) => m.HomeComponent),
    title: 'FreshCart | Home',
  },
  {
  path: 'profile',
  canActivate:[logedGuard],
  loadComponent: () =>
    import('./features/profile/pages/profile/profile.component').then((m) => m.ProfileComponent),
  title: 'FreshCart | Profile',
  children: [
    { path: '', redirectTo: 'setting', pathMatch: 'full' },
    {
      path: 'setting',
      loadComponent: () =>
        import('./features/profile/component/setting/setting.component').then((m) => m.SettingComponent),
      title: 'FreshCart | Settings',
    },
    {
      path: 'address',
      loadComponent: () =>
        import('./features/profile/component/address/address.component').then((m) => m.AddressComponent),
      title: 'FreshCart | Addresses',
    },
  ],
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
  path: 'catergories/:id/:slug',
  loadComponent: () =>
    import('./features/categories/pages/categoriesdetails/categoriesdetails.component')
      .then(m => m.CategoryDetailsComponent),
},

  {
    path: 'brand',
    loadComponent: () =>
      import('./features/brand/pages/brands/brands.component').then((m) => m.BrandsComponent),
    title: 'FreshCart | Brands',
  },
  {
    path: 'brands/:id/:slug',
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
    canActivate:[logedGuard] ,
    loadComponent: () =>
      import('./features/cart/pages/cart/cart.component').then((m) => m.CartComponent),
    title: 'FreshCart | Cart',
  },
{
  path: 'CategrySub/:id/:slug',
  loadComponent: () => import('./features/sub_categries/sub-categry/sub-categry.component')
    .then(m => m.SubCategryComponent)
},
  {
    path: 'wishlist',
    canActivate:[logedGuard],
    loadComponent: () =>
      import('./features/wishlist/pages/wishlist/wishlist.component').then(
        (m) => m.WishlistComponent,
      ),
    title: 'FreshCart | Wishlist',
  },
  {
  path: 'checkout/:id',
  loadComponent: () =>
    import('./features/checkout/pages/check-out/check-out.component').then(
      (m) => m.CheckOutComponent
    ),
     title: 'FreshCart | Check Out',
},
{
  path: 'allorders',
  canActivate: [logedGuard],
  loadComponent: () =>
    import('./features/orders/pages/orders/orders.component')
      .then((m) => m.OrdersComponent),
  title: 'FreshCart | Orders',
},
  {
    path: '**',
    loadComponent: () =>
      import('./layout/notfoundpage/notfoundpage.component').then((m) => m.NotfoundpageComponent),
    title: 'FreshCart | Page Not Found',
  },
 
  
];
