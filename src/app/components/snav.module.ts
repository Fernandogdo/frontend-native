import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Angular Material
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatBadgeModule } from '@angular/material/badge';

// import { NgxChartsModule } from '@swimlane/ngx-charts';

// import {MatSnackBarModule} from '@angular/material/snack-bar'; 
// import { AppRoutingModule } from '../app-routing.module';
import { AppComponent } from '../app.component';
// import { BodyComponent } from './components/body/body.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CategoriesComponent } from './categories/categories.component';
import { BodyComponent } from './body/body.component';
import { ModalCategoryComponent } from './modal-category/modal-category.component';
import { ModalEditCategoryComponent } from './modal-edit-category/modal-edit-category.component';
import { ModalRegistroProductosComponent } from './modal-registro-productos/modal-registro-productos.component';

// import { SalesComponent } from './components/sales/sales.component';
import { ProductsComponent } from './products/products.component';
import { SaleComponent } from './sale/sale.component';
import { RegisterSaleComponent } from './register-sale/register-sale.component';
import { DetailSaleComponent } from './detail-sale/detail-sale.component';
import { ModalEditProductComponent } from './modal-edit-product/modal-edit-product.component';
import { ViewProductsCategoryComponent } from './view-products-category/view-products-category.component';
import { ListUserComponent } from '../components/list-user/list-user.component';
import { GraficaBarraComponent } from '../components/grafica-barra/grafica-barra.component';

// import { UserRegisterComponent } from './user-register/user-register.component';
// import { LoginComponent } from './login/login.component';
// import { VentasComponent } from './components/sales/ventas.component';
// import { DashboardComponent } from './components/dashboard/dashboard.component';
// import { CategoriesComponent } from './components/categories/categories.component';

import { SnavComponent } from './snav.component';
import { SNAV_ROUTES } from './snav.routing.module';
import { NgxChartsModule } from '@swimlane/ngx-charts';



@NgModule({
  declarations: [
    // AppComponent,
    // BodyComponent,
    SnavComponent,
    SidenavComponent,
    DashboardComponent,
    CategoriesComponent,
    BodyComponent,
    ModalCategoryComponent,
    ModalEditCategoryComponent,
    ModalRegistroProductosComponent,
    SaleComponent,
    ProductsComponent,
    RegisterSaleComponent,
    DetailSaleComponent,
    ModalEditProductComponent,
    ViewProductsCategoryComponent,
    ListUserComponent,
    GraficaBarraComponent
  ],
  imports: [
    SNAV_ROUTES,
    BrowserModule,
    BrowserAnimationsModule,
    // AppRoutingModule,
    HttpClientModule,
    MatCardModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatTableModule,
    MatMenuModule,
    MatPaginatorModule,
    MatSelectModule,
    MatGridListModule,
    FormsModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    MatToolbarModule,
    MatCheckboxModule,
    MatBadgeModule,
    NgxChartsModule,
    


  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class SnavModule { }