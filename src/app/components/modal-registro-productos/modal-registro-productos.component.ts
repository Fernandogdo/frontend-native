import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProductsService } from 'src/app/services/products/products.service';

@Component({
  selector: 'app-modal-registro-productos',
  templateUrl: './modal-registro-productos.component.html',
  styleUrls: ['./modal-registro-productos.component.scss']
})
export class ModalRegistroProductosComponent implements OnInit {

  photoSelected: string | ArrayBuffer;
  file: File;
  idCategory;
  titleCategory;

  constructor(
    private productsService: ProductsService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<ModalRegistroProductosComponent>,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.idCategory = this.data.idCategoria
    this.titleCategory = this.data.title


  }


  //Image Selected for upload
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


  //Upload image to server
  uploadPhoto(title: HTMLInputElement, category: HTMLInputElement, description: HTMLTextAreaElement, price: HTMLInputElement, purchase_price: HTMLInputElement, stock: HTMLInputElement) {

    this.productsService.createProduct(title.value, category.value, description.value, stock.value, price.value, purchase_price.value, this.file).subscribe({
      next: (res) => {
        this._snackBar.open("Producto " + title.value + " agregado" , "Cerrar", {
          duration: 3000,
        });
      },
      error: (e) => {
        this._snackBar.open( e , "Cerrar", {
          duration: 3000,
        });
      }
    })

    this.onNoClick()

    return false;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
