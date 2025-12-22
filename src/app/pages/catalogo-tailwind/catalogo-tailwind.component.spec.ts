import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { CatalogoTailwindComponent } from './catalogo-tailwind.component';

describe('CatalogoTailwindComponent', () => {
  let component: CatalogoTailwindComponent;
  let fixture: ComponentFixture<CatalogoTailwindComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CatalogoTailwindComponent,
        HttpClientTestingModule
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CatalogoTailwindComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
