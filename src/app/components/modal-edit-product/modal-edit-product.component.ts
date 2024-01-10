import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { CategoriesService } from 'src/app/services/categories/categories.service';
import { ProductsService } from 'src/app/services/products/products.service';
import { Product } from "../../interfaces/Product";
import { MatSnackBar } from "@angular/material/snack-bar";
import { GlobalBase } from 'src/app/services/global/global';

@Component({
  selector: 'app-modal-edit-product',
  templateUrl: './modal-edit-product.component.html',
  styleUrls: ['./modal-edit-product.component.scss']
})
export class ModalEditProductComponent implements OnInit {

  idProduct: string;
  titleProduct: string;
  categoryProduct: string;
  descriptionProduct: string;
  priceProduct: number;
  purchase_priceProduct: number;
  stockProduct: number;
  arrayCategories;
  product: Product;
  public url: string

  constructor(
    public dialogRef: MatDialogRef<ModalEditProductComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private categoriesService: CategoriesService,
    private productsService: ProductsService,
    private _snackBar: MatSnackBar
  ) {
    this.url = GlobalBase.url
  }

  ngOnInit(): void {
    this.getCategories()
    this.idProduct = this.data.idProduct;
    this.titleProduct = this.data.title;
    this.categoryProduct = this.data.category._id,
    this.descriptionProduct = this.data.description
    this.priceProduct = this.data.price;
    this.purchase_priceProduct = this.data.purchase_price;
    this.stockProduct = this.data.stock

    this.getProduct();

  }

  //Get Product
  getProduct() {
    this.productsService.getProduct(this.idProduct).subscribe((product) => {
      this.product = product;
    })
  }

  //Get Category
  getCategories() {
    this.categoriesService.getCategories().subscribe((res) => {
      this.arrayCategories = res;
    })
  }


  //Update Product for id
  updateProduct(title: HTMLInputElement, price: HTMLInputElement, purchase_price:HTMLInputElement, stock: HTMLInputElement, description: HTMLTextAreaElement) {

    const producUpdated = {
      title: title.value,
      category: this.categoryProduct,
      description: description.value,
      price: price.value,
      purchase_price: purchase_price.value,
      stock: stock.value,
    }

    // console.log("producUpdated", producUpdated )

    this.productsService.updateProduct(this.idProduct, producUpdated).subscribe({
      next: (res) => {
        this._snackBar.open("Producto actualizado", "Cerrar", {
          duration: 3000,
        });
      },

      error: (e) => {
        console.log(e)
      }

    });


    this.onNoClick();

  }


  //Close Modal after of update
  onNoClick(): void {
    this.dialogRef.close();
  }

}
