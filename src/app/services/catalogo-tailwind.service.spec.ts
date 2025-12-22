import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing'; // <--- IMPORT NECESARIO
import { CatalogoTailwindService } from './catalogo-tailwind.service';

describe('CatalogoTailwindService', () => {
  let service: CatalogoTailwindService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule] // <--- AÑADIR AQUÍ
    });
    service = TestBed.inject(CatalogoTailwindService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
