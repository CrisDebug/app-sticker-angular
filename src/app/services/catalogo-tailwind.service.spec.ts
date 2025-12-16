import { TestBed } from '@angular/core/testing';

import { CatalogoTailwindService } from './catalogo-tailwind.service';

describe('CatalogoTailwindService', () => {
  let service: CatalogoTailwindService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CatalogoTailwindService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
