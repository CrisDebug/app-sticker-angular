import { Component, OnInit } from '@angular/core';
import { CatalogoTailwindService } from '../../services/catalogo-tailwind.service';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-catalogo-tailwind',
  templateUrl: './catalogo-tailwind.component.html',
  styleUrls: ['./catalogo-tailwind.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class CatalogoTailwindComponent implements OnInit {

  // datos
  catalogo: any[] = [];

  // preview HTML seguro
  codigoSeguro: SafeHtml[] = [];

  // toggle código
  mostrarCodigo: boolean[] = [];

  // formulario
  mostrarFormulario = false;
  editIndex: number | null = null;

  nuevoComponente = {
    nombre_componente: '',
    tipo: '',
    codigo: ''
  };

  constructor(
    private catalogoService: CatalogoTailwindService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.catalogoService.getAll().subscribe({
      next: (data) => {
        this.catalogo = data;

        this.mostrarCodigo = new Array(this.catalogo.length).fill(false);

        this.codigoSeguro = this.catalogo.map(item =>
          this.sanitizer.bypassSecurityTrustHtml(item.codigo)
        );
      },
      error: (err) => console.error(err)
    });
  }

  // toggle código
  toggleCodigo(index: number): void {
    this.mostrarCodigo[index] = !this.mostrarCodigo[index];
  }

  // eliminar
  eliminar(index: number): void {
    this.catalogo.splice(index, 1);
    this.mostrarCodigo.splice(index, 1);
    this.codigoSeguro.splice(index, 1);
  }

  // crear
  create(): void {
    this.editIndex = null;
    this.mostrarFormulario = true;
    this.nuevoComponente = {
      nombre_componente: '',
      tipo: '',
      codigo: ''
    };
  }

  // editar
  editar(index: number): void {
    this.editIndex = index;
    this.mostrarFormulario = true;

    this.nuevoComponente = {
      nombre_componente: this.catalogo[index].nombre_componente,
      tipo: this.catalogo[index].tipo,
      codigo: this.catalogo[index].codigo
    };
  }

  // guardar (create / update)
  guardar(): void {
    if (
      !this.nuevoComponente.nombre_componente ||
      !this.nuevoComponente.tipo ||
      !this.nuevoComponente.codigo
    ) return;

    // UPDATE
    if (this.editIndex !== null) {
      this.catalogo[this.editIndex] = {
        ...this.catalogo[this.editIndex],
        ...this.nuevoComponente
      };

      this.codigoSeguro[this.editIndex] =
        this.sanitizer.bypassSecurityTrustHtml(this.nuevoComponente.codigo);

      this.editIndex = null;
    }
    // CREATE
    else {
      const nuevo = {
        id: Date.now(),
        ...this.nuevoComponente
      };

      this.catalogo.push(nuevo);
      this.mostrarCodigo.push(false);
      this.codigoSeguro.push(
        this.sanitizer.bypassSecurityTrustHtml(nuevo.codigo)
      );
    }

    this.mostrarFormulario = false;
  }
}
