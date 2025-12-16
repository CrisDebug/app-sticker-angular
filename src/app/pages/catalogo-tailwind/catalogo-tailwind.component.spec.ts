import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogoTailwindComponent } from './catalogo-tailwind.component';

describe('CatalogoTailwindComponent', () => {
  let component: CatalogoTailwindComponent;
  let fixture: ComponentFixture<CatalogoTailwindComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CatalogoTailwindComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CatalogoTailwindComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
