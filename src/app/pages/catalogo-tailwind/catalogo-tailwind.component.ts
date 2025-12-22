import { Component, OnInit } from '@angular/core';
import { CatalogoTailwindService } from '../../services/catalogo-tailwind.service';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-catalogo-tailwind',
  templateUrl: './catalogo-tailwind.component.html',
  styleUrls: ['./catalogo-tailwind.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule]
})
export class CatalogoTailwindComponent implements OnInit {

  // ===========================
  // DATOS DEL CATALOGO
  // ===========================
  catalogo: any[] = [];               // Array con los componentes del catálogo
  codigoSeguro: SafeHtml[] = [];      // Preview HTML seguro
  mostrarCodigo: boolean[] = [];      // Toggle para mostrar/ocultar código

  // ===========================
  // FORMULARIO CREATE / EDIT
  // ===========================
  mostrarFormulario = false;          
  editIndex: number | null = null;
  nuevoComponente = {
    nombre_componente: '',
    tipo: '',
    codigo: ''
  };

  // ===========================
  // USUARIO ACTUAL
  // ===========================
  rol: string | null = null;          // Rol del usuario logueado
  usuarioActual: any = null;          // Datos del usuario logueado

  constructor(
    private catalogoService: CatalogoTailwindService,
    private sanitizer: DomSanitizer,
    private router: Router             // Router para redirecciones
  ) { }

  ngOnInit(): void {
    // ===========================
    // PROTECCION DE ACCESO
    // ===========================
    const usuario = JSON.parse(localStorage.getItem('usuario') || 'null');
    if (!usuario) {
      // Si no hay usuario logueado, redirige a login
      this.router.navigate(['/login']);
      return;
    }

    // Guardar usuario y rol
    this.usuarioActual = usuario;
    this.rol = usuario.rol;

    // ===========================
    // CARGA DEL CATALOGO
    // ===========================
    this.catalogoService.getAll().subscribe({
      next: (data) => {
        this.catalogo = data;

        // Inicializamos arrays auxiliares para toggle y preview seguro
        this.mostrarCodigo = new Array(this.catalogo.length).fill(false);
        this.codigoSeguro = this.catalogo.map(item =>
          this.sanitizer.bypassSecurityTrustHtml(item.codigo)
        );
      },
      error: (err) => console.error(err)
    });
  }

  // ===========================
  // METODOS DEL CATALOGO
  // ===========================

  // Alterna la visualización del código
  toggleCodigo(index: number): void {
    this.mostrarCodigo[index] = !this.mostrarCodigo[index];
  }

  // Elimina un componente del catálogo
  eliminar(index: number): void {
    if (this.rol !== 'ADMIN') return; // Solo admin puede eliminar
    this.catalogo.splice(index, 1);
    this.mostrarCodigo.splice(index, 1);
    this.codigoSeguro.splice(index, 1);
  }

  // Muestra el formulario de creación
  create(): void {
    if (this.rol !== 'ADMIN') return; // Solo admin puede crear
    this.editIndex = null;
    this.mostrarFormulario = true;
    this.nuevoComponente = {
      nombre_componente: '',
      tipo: '',
      codigo: ''
    };
  }

  // Muestra el formulario de edición
  editar(index: number): void {
    if (this.rol !== 'ADMIN') return; // Solo admin puede editar
    this.editIndex = index;
    this.mostrarFormulario = true;

    this.nuevoComponente = {
      nombre_componente: this.catalogo[index].nombre_componente,
      tipo: this.catalogo[index].tipo,
      codigo: this.catalogo[index].codigo
    };
  }

  // Guarda un nuevo componente o actualiza uno existente
  guardar(): void {
    if (!this.nuevoComponente.nombre_componente || 
        !this.nuevoComponente.tipo || 
        !this.nuevoComponente.codigo) return;

    if (this.editIndex !== null) {
      // UPDATE
      this.catalogo[this.editIndex] = {
        ...this.catalogo[this.editIndex],
        ...this.nuevoComponente
      };
      this.codigoSeguro[this.editIndex] = this.sanitizer.bypassSecurityTrustHtml(this.nuevoComponente.codigo);
      this.editIndex = null;
    } else {
      // CREATE
      const nuevo = {
        id: Date.now(),
        ...this.nuevoComponente
      };
      this.catalogo.push(nuevo);
      this.mostrarCodigo.push(false);
      this.codigoSeguro.push(this.sanitizer.bypassSecurityTrustHtml(nuevo.codigo));
    }

    this.mostrarFormulario = false;
  }

}
