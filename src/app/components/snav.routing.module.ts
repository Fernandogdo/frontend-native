import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoriesComponent } from './categories/categories.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DetailSaleComponent } from './detail-sale/detail-sale.component';
import { LoginComponent } from './login/login.component';
import { ProductsComponent } from './products/products.component';
import { RegisterSaleComponent } from './register-sale/register-sale.component';
import { SaleComponent } from './sale/sale.component';
import { ViewProductsCategoryComponent } from './view-products-category/view-products-category.component';

// import { SidenavComponent } from './sidenav/sidenav.component';
import { SnavComponent } from './snav.component';
import { UserRegisterComponent } from './user-register/user-register.component';
import { AuthGuard } from '../guards/auth.guard';
import { ListUserComponent } from './list-user/list-user.component';
// SidenavComponent
SnavComponent

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register-user', component: UserRegisterComponent },
  {
    path: '', component: SnavComponent, children: [
      { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
      { path: 'categories', component: CategoriesComponent, canActivate: [AuthGuard] },
      { path: 'products', component: ProductsComponent },
      { path: 'sale', component: SaleComponent },
      { path: 'register-sale', component: RegisterSaleComponent },
      { path: 'list-user', component: ListUserComponent },
      { path: 'detail-sale/:id', component: DetailSaleComponent },
      { path: 'view-products-category/:categoryID', component: ViewProductsCategoryComponent },
      { path: 'login', component: LoginComponent },
      { path: '**', redirectTo: '/login', pathMatch: 'full' }
    ]
  }
];


export const SNAV_ROUTES = RouterModule.forChild(routes);


// @NgModule({
//     imports: [RouterModule.forRoot(routes)],
//     exports: [RouterModule]
// })
// export class AppRoutingModule { }
