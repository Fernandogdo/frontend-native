import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { MatSnackBar } from '@angular/material/snack-bar';
import { Categorie } from 'src/app/interfaces/Category';
import { CategoriesService } from 'src/app/services/categories/categories.service';
import { GlobalBase } from 'src/app/services/global/global';

@Component({
  selector: 'app-modal-edit-category',
  templateUrl: './modal-edit-category.component.html',
  styleUrls: ['./modal-edit-category.component.scss']
})
export class ModalEditCategoryComponent implements OnInit {

  public url: string
  idCategoria: string;
  category: Categorie

  constructor(
    private categoriesService: CategoriesService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<ModalEditCategoryComponent>,
    private _snackBar: MatSnackBar

  ) {
    this.url = GlobalBase.url
  }


  ngOnInit(): void {
    this.idCategoria = this.data.idCategoria
    this.getCategory()
  }


  //Get Category
  getCategory() {
    this.categoriesService.getCategory(this.idCategoria)
      .subscribe({
        next: (category) => {
          this.category = category
        },

        error: (err) => {
          console.error('err', err)
        }
      })
  }


  //Update Category for id
  updateCategory(title: HTMLInputElement, description: HTMLTextAreaElement) {
    this.categoriesService.updateCategory(this.idCategoria, title.value, description.value)
      .subscribe({
        next: (res) => {
          this._snackBar.open("Categoria editada correctamente", "Cerrar", {
            duration: 3000,
          });

        },
        error: (e) => {
          console.log(e);
        }
      });

    this.onNoClick();

  }


  //Close Modal
  onNoClick(): void {
    this.dialogRef.close();
  }




}
