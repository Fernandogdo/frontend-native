import { Component, OnInit } from '@angular/core';
import { CategoriesService } from 'src/app/services/categories/categories.service';
import { Router } from '@angular/router'
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

interface HtmlInputEvent extends Event {
  target: HTMLInputElement & EventTarget;
}

@Component({
  selector: 'app-modal-category',
  templateUrl: './modal-category.component.html',
  styleUrls: ['./modal-category.component.scss']
})
export class ModalCategoryComponent implements OnInit {

  photoSelected: string | ArrayBuffer;
  file: File;
  categorias;

  constructor(
    private categoriesService: CategoriesService, private router: Router,
    public dialogRef: MatDialogRef<ModalCategoryComponent>,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
  }

  getCategories() {
    this.categoriesService.getCategories().subscribe((categories) => {
      this.categorias = categories;
    });
  }


  onPhotoSelected(event): void {
    const evento = event.target as HTMLInputElement
    if (evento.files && evento.files[0]) {
      this.file = <File>evento.files[0];
      // image preview
      const reader = new FileReader();
      reader.onload = e => this.photoSelected = reader.result;
      reader.readAsDataURL(this.file);
    }
  }

  uploadPhoto(title: HTMLInputElement, description: HTMLTextAreaElement) {
    this.categoriesService.createCategory(title.value, description.value, this.file).subscribe({
      next: (res) => {
        this._snackBar.open("Categoria " + title.value + " creada correctamente", "Cerrar", {
          duration: 3000,
        });
      },
      error: (e) => {
        console.log(e);
      }
    })
    return false;
  }


  onNoClick(): void {
    this.dialogRef.close();
  }

}
