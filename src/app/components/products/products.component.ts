import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductsService } from 'src/app/services/products/products.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Product } from 'src/app/interfaces/Product';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ModalEditProductComponent } from '../modal-edit-product/modal-edit-product.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GlobalBase } from 'src/app/services/global/global';
import * as _ from "lodash";
import { ngxCsv } from 'ngx-csv/ngx-csv';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;

  dialogEditCategoria: MatDialogRef<ModalEditProductComponent>;
  displayedColumns: string[] = ['image', 'title', 'category', 'price', 'stock', 'opciones'];
  displayedVatColumns = ['vatAmountTitle', 'a', 'b', 'c', 'd', 'e'];

  arregloProductos: Product[] = [];
  dataSource;
  url: string;
  arrayProductsCsv

  constructor(
    public productsService: ProductsService,
    private dialog: MatDialog,
    private _snackBar: MatSnackBar
  ) {
    this.url = GlobalBase.url
  }

  ngOnInit(): void {
    this.getProducts()
  }

  // Filter product for title, category, price and stock  
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


  // Get all products
  getProducts() {
    this.productsService.getProducts().subscribe({
      next: (products) => {
        this.arregloProductos = _.orderBy(products, ['title', 'category'], ['asc', 'asc']);;

        this.arrayProductsCsv = this.arregloProductos
          // .filter(product => (product.title === 'Apigel'))
          .map(product => (
            {
              title: product.title,
              category: product.category['title'],
              price: product.price,
              description: product.description
            }
          ));

        this.dataSource = new MatTableDataSource(this.arregloProductos);
        this.dataSource.paginator = this.paginator;
      },
      error: (err) => {
        console.log(err)
      }
    });
  }


  // Delete product for id
  deleteProduct(idProduct: string, titleProduct) {
    this.productsService.deleteProduct(idProduct).subscribe({
      next: (res) => {
        this.getProducts()
        this._snackBar.open("Producto " + titleProduct + " eliminado", "Cerrar", {
          duration: 3000,
        });
      },
      error: (e) => {
        console.log(e)
      }
    })
  }


  // Modal for edit product
  ModalEditProduct(id, title, category, description, price, purchase_price, stock) {
    console.log(id)

    this.dialogEditCategoria = this.dialog.open(ModalEditProductComponent, {
      data: {
        idProduct: id,
        title: title,
        category: category,
        description: description,
        price: price,
        purchase_price: purchase_price,
        stock: stock
      }
    });
    this.dialogEditCategoria.afterClosed().subscribe(() => {
      this.getProducts();
    });
  }


  generateCsv() {
    var options = {
      fieldSeparator: ',',
      quoteStrings: '"',
      decimalseparator: '.',
      showLabels: true,
      showTitle: true,
      title: 'Productos',
      useBom: true,
      noDownload: false,
      headers: ["Título", "Categoría", "Precio", "Descripción"]
    };
    new ngxCsv(this.arrayProductsCsv, 'Productos', options);
  }


}
