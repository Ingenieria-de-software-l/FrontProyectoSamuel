import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { ProductoService  } from '../service/producto.service';
import { Producto } from '../models/producto';
import { error } from 'console';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nuevo-producto',
  templateUrl: './nuevo-producto.component.html',
  styleUrl: './nuevo-producto.component.css'
})
export class NuevoProductoComponent implements OnInit {

  nombre='';
  precio: number= null;
  constructor(
    private productoService: ProductoService,
    private toastr: ToastrService, 
    private router: Router
  ) { }
  ngOnInit() {
  }

  onCreate(): void {
    const producto = new Producto(this.nombre, this.precio);
    this.productoService.save(producto).subscribe(
      data => {
        this.toastr.success('Producto Creado', 'OK',{
          timeOut: 3000, positionClass: 'toast-top-center'
        });
        this.router.navigate(['/']);
       
      },
      err => {
        this.toastr.error(err.error.mensaje, 'No se pudo crear',{
          timeOut: 3000, positionClass: 'toast-top-center',
        });
        
      }
    );

  }

}
