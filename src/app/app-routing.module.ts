import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoriesComponent } from './components/categories/categories.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { DetailSaleComponent } from './components/detail-sale/detail-sale.component';
import { LoginComponent } from './components/login/login.component';
import { ProductsComponent } from './components/products/products.component';
import { RegisterSaleComponent } from './components/register-sale/register-sale.component';
import { SaleComponent } from './components/sale/sale.component';
import { UserRegisterComponent } from './components/user-register/user-register.component';
import { ViewProductsCategoryComponent } from './components/view-products-category/view-products-category.component';


const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register-user', component: UserRegisterComponent },

  // {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
  // {path: 'dashboard', component: DashboardComponent},
  // {path: 'categories', component: CategoriesComponent},
  // {path: 'products', component: ProductsComponent},
  // {path: 'sale', component: SaleComponent},
  // {path: 'register-sale', component: RegisterSaleComponent},
  // {path: 'detail-sale/:id', component: DetailSaleComponent},
  // {path: 'view-products-category/:category', component: ViewProductsCategoryComponent},
  // {path: 'login', component: LoginComponent}

];

export const APP_ROUTES = RouterModule.forRoot(routes, { useHash: false });


// @NgModule({
//   imports: [RouterModule.forRoot(routes)],
//   exports: [RouterModule]
// })
// export class AppRoutingModule { }
