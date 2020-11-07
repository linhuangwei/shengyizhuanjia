import { StartAppGuard } from './core/start-app.guard';
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'welcome', // 原来是home
    pathMatch: 'full'
  },

  {
    path: 'folder/:id',
    loadChildren: () => import('./folder/folder.module').then( m => m.FolderPageModule)
  },

  {
    path: 'welcome',
    canActivate: [StartAppGuard],
    loadChildren: () => import('./routes/welcome/welcome.module').then( m => m.WelcomePageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./routes/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'passport',
    loadChildren: () => import('./routes/passport/passport.module').then( m => m.PassportModule)
  },
  {
    path: 'signup',
    loadChildren: () => import('./routes/passport/signup/signup.module').then( m => m.SignupPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./routes/passport/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'forgot-password',
    loadChildren: () => import('./routes/passport/forgot-password/forgot-password.module').then( m => m.ForgotPasswordPageModule)
  },
  {
    path: 'setting',
    loadChildren: () => import('./routes/setting/setting.module').then( m => m.SettingPageModule)
  },
  {
    path: 'about-me',
    loadChildren: () => import('./routes/setting/about-me/about-me.module').then( m => m.AboutMePageModule)
  },
  {
    path: 'change-password',
    loadChildren: () => import('./routes/setting/change-password/change-password.module').then( m => m.ChangePasswordPageModule)
  },
  {
    path: 'shop',
    loadChildren: () => import('./routes/setting/shop/shop.module').then( m => m.ShopPageModule)
  },
  {
    path: 'edit-shop',
    loadChildren: () => import('./routes/setting/edit-shop/edit-shop.module').then( m => m.EditShopPageModule)
  },
  {
    path: 'category-list',
    loadChildren: () => import('./routes/category/category-list/category-list.module').then( m => m.CategoryListPageModule)
  },
  {
    path: 'category-edit/:id',
    loadChildren: () => import('./routes/category/category-edit/category-edit.module').then( m => m.CategoryEditPageModule)
  },
  {
    path: 'category-name-edit',
    loadChildren: () => import('./routes/category/category-name-edit/category-name-edit.module').then( m => m.CategoryNameEditPageModule)
  },
  {
    path: 'category-add',
    loadChildren: () => import('./routes/category/category-add/category-add.module').then( m => m.CategoryAddPageModule)
  },
  {
    path: 'add-product',
    loadChildren: () => import('./routes/product/add-product/add-product.module').then( m => m.AddProductPageModule)
  },
  {
    path: 'product-list',
    loadChildren: () => import('./routes/product/product-list/product-list.module').then( m => m.ProductListPageModule)
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
