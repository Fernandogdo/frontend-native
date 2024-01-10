import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Product } from 'src/app/interfaces/Product';
import { ProductsService } from 'src/app/services/products/products.service';
import { SalesService } from 'src/app/services/sales/sales.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import * as _ from "lodash";

@Component({
  selector: 'app-register-sale',
  templateUrl: './register-sale.component.html',
  styleUrls: ['./register-sale.component.scss']
})
export class RegisterSaleComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;

  displayedColumns: string[] = ['opciones', 'title', 'purchase_price', 'price', 'date', 'totalSale', 'totalPurchase'];
  displayedVatColumns = ['Total', 'relleno', 'relleno1', 'relleno2', 'relleno3', 'TotalSale', 'TotalPurchase'];

  arrayProducts: Product[] = [];
  product: Product;
  dataSource;
  opcionSeleccionada: string;
  stock: number = 0;
  cantidad: number;
  productName: string;
  title: string;
  description: string;
  price: number;
  purchase_price: number;
  Products = [];
  totalVentas: number;
  totalCostoProducts: number;

  categoryProduct: string;
  descriptionProduct: string;
  productsOriginal;
  disabled: boolean = false;
  disabledQuantity: boolean = true;
  disableAddProduct: boolean = true;

  constructor(
    private salesService: SalesService,
    private productsService: ProductsService,
    private _snackBar: MatSnackBar,
    public router: Router
  ) { }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts() {
    this.productsService.getProducts().subscribe(products => {
      this.arrayProducts = _.orderBy(products, ['title'], ['asc']);
      this.productsOriginal = JSON.parse(
        JSON.stringify(this.arrayProducts)
      );
    })
  }


  myChange($event) {
    this.disabledQuantity = false
    this.disableAddProduct = false;
    this.productsService.getProduct(this.opcionSeleccionada).subscribe((res) => {
      this.product = res
      this.productName = this.product.title;
      this.stock = this.product.stock;
      this.price = this.product.price;
      this.purchase_price = this.product.purchase_price;
      this.categoryProduct = this.product.category;
      this.descriptionProduct = this.product.description;
    });
  }


  //Cost total of sale
  getTotalCostSale() {
    this.totalVentas = this.Products.map(t => t.price * t.quantity).reduce((acc, value) => acc + value, 0);
    return this.totalVentas;
  }


  //Cost total of purchase of products
  getTotalCostPurchase() {
    this.totalCostoProducts = this.Products.map(t => t.purchase_price *  t.quantity).reduce((acc, value) => acc + value, 0);
    return this.totalCostoProducts;
  }


  addProduct(cantidad: number) {
    this.cantidad = cantidad

    const product = {
      id: Math.floor(Math.random() * (1 + 100000)),
      title: this.productName,
      price: this.price,
      purchase_price: this.purchase_price,
      quantity: cantidad,
      category: this.categoryProduct['title']
    }

    console.log('add product', product);

  
    this.Products.push(product)
    this.disabled = true;


    this.Products.forEach((productSale) => {
      let productOriginal = this.arrayProducts.find(productOriginal => productOriginal.title === productSale.title && productOriginal.category['title'] === productSale.category  && productOriginal.price === productSale.price)

      if (productSale.quantity > productOriginal.stock) {
        this._snackBar.open("La cantidad " + productSale.quantity + " sobrepasa el stock disponible " + productOriginal.stock, "Cerrar", {
          duration: 2000,
        });
        this.Products = this.Products.filter((item) => item.id !== productSale.title)
      }

      if (productSale.quantity < 1) {
        this._snackBar.open("Debe ingresar una cantidad mayor a 0 ", "Cerrar", {
          duration: 2000,
        });
        this.Products = this.Products.filter((item) => item.title !== productSale.title)

      }
    });

    this.dataSource = new MatTableDataSource(this.Products);
    this.dataSource.paginator = this.paginator;
    // this.editProduct(cantidad)
  }


  editProduct() {

    this.Products.forEach((productSale) => {

     

      let productOriginal = this.arrayProducts.find(productOriginal => productOriginal.title == productSale.title && productOriginal.price == productSale.price)

      console.log('editando producto', productOriginal)
      if (productOriginal.title == productSale.title && productOriginal.stock == productSale.stock) return

      this.stock = productOriginal.stock - productSale.quantity

      const editProduct = {
        title: productOriginal.title,
        category: productOriginal.category,
        description: productOriginal.description,
        price: productOriginal.price,
        purchase_price: productOriginal.purchase_price,
        stock: this.stock,
      }

      this.productsService.updateProduct(productOriginal._id, editProduct).subscribe((res) => {
        this.getProducts()
      });

    });
  }


  deleteElementProducts(id) {
    this.Products = this.Products.filter((item) => item.id !== id)

    this.dataSource = new MatTableDataSource(this.Products);

    this.dataSource.paginator = this.paginator;

  }


  postSale() {
    let now = new Date();
    let year = new Date().getFullYear();

    console.log("year",year)
    let month = now.toLocaleString("es-ES", { month: "long" })
    month.charAt(0).toUpperCase() + month.slice(1);

    month = month.charAt(0).toUpperCase() + month.slice(1)

    console.log('Costo products',this.totalCostoProducts)
    const sale = {
      title: this.title,
      description: this.description,
      date: now,
      month: month,
      total: this.totalVentas,
      total_spends: this.totalCostoProducts,
      year: year,
      products: this.Products
    }


    if (this.title && this.description) {
      this.salesService.createSale(sale).subscribe({

        next: (res) => {
          this._snackBar.open("Venta registrada con exito!", "Cerrar", {
            duration: 3000,
          });
          this.router.navigate(['/sale']);

          this.editProduct()
        },

        error: (err) => {
          this._snackBar.open("Error al registrar Venta", "Cerrar", {
            duration: 3000,
          });
        }
      })

    } else {
      this._snackBar.open("Ingrese todos los datos", "Cerrar", {
        duration: 2000,
      });
    }
  }
}
