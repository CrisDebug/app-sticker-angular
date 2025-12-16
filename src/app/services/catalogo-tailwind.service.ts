import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CatalogoTailwindService {

  // Ruta al JSON (simula el backend)
  private url = 'assets/data/productostailwind.json';

  // Arreglo en memoria:
  // simula una base de datos viva durante la ejecución
  private catalogoMemoria: any[] = [];

  constructor(private http: HttpClient) {}

  // =========================
  // READ → GET
  // =========================
  getAll(): Observable<any[]> {

    // Si ya cargamos datos antes, devolvemos la memoria
    if (this.catalogoMemoria.length > 0) {
      return of(this.catalogoMemoria);
    }

    // Si no, hacemos la petición HTTP al JSON
    return new Observable(observer => {
      this.http.get<any[]>(this.url).subscribe(data => {

        // Guardamos los datos en memoria
        this.catalogoMemoria = data;

        // Enviamos los datos al componente
        observer.next(this.catalogoMemoria);

        // Cerramos el flujo
        observer.complete();
      });
    });
  }

  // =========================
  // CREATE → POST (simulado)
  // =========================
  create(item: any): Observable<any> {

    // Simulamos un id como haría un backend
    item.id = Date.now();

    // Guardamos en memoria
    this.catalogoMemoria.push(item);

    // Devolvemos el nuevo objeto
    return of(item);
  }

  // =========================
  // UPDATE → PUT (simulado)
  // =========================
  update(id: number, itemActualizado: any): Observable<any> {

    // Buscamos el índice del item
    const index = this.catalogoMemoria.findIndex(i => i.id === id);

    // Si existe, lo reemplazamos
    if (index !== -1) {
      this.catalogoMemoria[index] = { ...itemActualizado, id };
    }

    // Devolvemos el item actualizado
    return of(this.catalogoMemoria[index]);
  }

  // =========================
  // DELETE → DELETE (simulado)
  // =========================
  delete(id: number): Observable<boolean> {

    // Eliminamos el item de la memoria
    this.catalogoMemoria = this.catalogoMemoria.filter(i => i.id !== id);

    // Devolvemos true como confirmación
    return of(true);
  }
}
