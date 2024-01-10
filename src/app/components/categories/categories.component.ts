import { Component, OnInit } from '@angular/core';
import { CategoriesService } from 'src/app/services/categories/categories.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ModalCategoryComponent } from '../modal-category/modal-category.component';
import { ModalEditCategoryComponent } from '../modal-edit-category/modal-edit-category.component';
import { ModalRegistroProductosComponent } from '../modal-registro-productos/modal-registro-productos.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GlobalBase } from 'src/app/services/global/global';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {


  dialogCreateCategoria: MatDialogRef<ModalCategoryComponent>;
  dialogEditCategoria: MatDialogRef<ModalEditCategoryComponent>;
  dialogCreateProduct: MatDialogRef<ModalRegistroProductosComponent>;

  public url: string
  categorias: any = []

  constructor(
    private categoriesService: CategoriesService,
    private dialog: MatDialog,
    private _snackBar: MatSnackBar
  ) {
    this.url = GlobalBase.url
  }

  ngOnInit(): void {
    this.getCategories()
  }


  //Get Categories
  getCategories() {
    this.categoriesService.getCategories().subscribe((categories) => {
      this.categorias = categories;
    });
  }

  //Modal for create category
  ModalCreateCategoria() {
    this.dialogCreateCategoria = this.dialog.open(ModalCategoryComponent);
    this.dialogCreateCategoria.afterClosed().subscribe(() => {
      // this.getCategories();
      setTimeout(() => this.getCategories(), 2000);

    });
  }


  //Modal for edit category
  ModalEditCategory(id, title, description) {
    this.dialogEditCategoria = this.dialog.open(ModalEditCategoryComponent, {
      data: {
        idCategoria: id,
        title: title,
        description: description,
        // img: img
      }
    });
    this.dialogEditCategoria.afterClosed().subscribe(() => {
      this.getCategories();
    });

  }


  //Modal for create new Product
  ModalCreateProduct(idCategory, title) {
    this.dialogCreateProduct = this.dialog.open(ModalRegistroProductosComponent, {
      data: {
        idCategoria: idCategory,
        title: title,
      }
    });
    this.dialogCreateProduct.afterClosed()

  }


  //Delete category for id
  deleteCategory(id: string, titleCategory: string) {
    this.categoriesService.deleteCategory(id).subscribe({
      next: (res) => {
        this._snackBar.open("Categoria " + titleCategory + " eliminada correctamente", "Cerrar", {
          duration: 3000,
        });
        setTimeout(() => this.getCategories(), 1500);

      }
    });
  }

}
