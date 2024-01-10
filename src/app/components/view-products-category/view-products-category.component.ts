import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/services/products/products.service';
import { MatDialogRef, MatDialog } from "@angular/material/dialog";
import * as _ from "lodash";
import { ActivatedRoute } from '@angular/router';
import { ModalEditProductComponent } from '../modal-edit-product/modal-edit-product.component';
import { CategoriesService } from 'src/app/services/categories/categories.service';
import { MatSnackBar } from "@angular/material/snack-bar";
import { GlobalBase } from 'src/app/services/global/global';

@Component({
  selector: 'app-view-products-category',
  templateUrl: './view-products-category.component.html',
  styleUrls: ['./view-products-category.component.scss']
})
export class ViewProductsCategoryComponent implements OnInit {

  dialogEditCategoria: MatDialogRef<ModalEditProductComponent>;
  categoryProduct;
  categoryTitle;
  categoryId;
  products = [];
  public url: string;

  arrayProductsCategory;
  constructor(
    private productsService: ProductsService,
    private categoriesService: CategoriesService,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private _snackBar: MatSnackBar
  ) { 
    this.url = GlobalBase.url
  }

  ngOnInit(): void {
    this.categoryProduct = this.route.snapshot.params["categoryID"];
    this.getCategory();
    this.getProducts();

  }

  // Get Category
  getCategory() {
    this.categoriesService.getCategory(this.categoryProduct).subscribe((res) => {
      this.categoryTitle = res.title

    })
  }

  // Get Product
  getProducts() {
    this.productsService.getProducts().subscribe((res) => {
      this.arrayProductsCategory = res;
      this.arrayProductsCategory = this.arrayProductsCategory.filter(product => product.category._id == this.categoryProduct);
      console.log(this.arrayProductsCategory)

    });
  }


  // Modal Edit Product
  ModalEditProduct(id, title, category, description, price, purchase_price, stock) {
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


  //Delete Product
  deleteProduct(idProduct, titleProduct) {
    this.productsService.deleteProduct(idProduct).subscribe({
      next: (res) => {
        this._snackBar.open("Producto " + titleProduct + " eliminado", "Cerrar", {
          duration: 2000,
        });
        this.getProducts();

      },
      error: (e) => {
        console.log(e)
      }
    });
  }


}
