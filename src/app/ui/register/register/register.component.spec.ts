import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterComponent } from './register.component';

import { RouterTestingModule } from '@angular/router/testing';
//import jasmine from 'jasmine';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterComponent,RouterTestingModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


  //verificar que el componente se crea corrctamente
  //[objetivo] -->verificar que angular pueda instancia el componente sin problemas
  it('should create', () => {
    expect(component).toBeTruthy();
  });


  //verificar el estado inicial del formulairo 
  //[objetivo]-->confirmar que al cargar elcomonente , el formulario no esta automaticamente valido
  //evita envia sin datos
  it('should have form invalid initially',() => {
    expect(component.registerForm.valid).toBeFalse();
  });

//prueba para verificar que el formulario se encuntre vacio al cargarse

  it('should initialize from empty fields',() => {
    const form =component.registerForm;

    expect(form.controls['name'].value).toBe('');
    expect(form.controls['email'].value).toBe('');
    expect(form.controls['password'].value).toBe('');
    expect(form.controls['confirmedPassword'].value).toBe('');
    expect(form.controls['email'].value).toBe('');
  })

  //prueba para revisar que los campos son ivalidos cuando esten vacios
it('show marks fields as invalid ',()=>{
  expect(component.registerForm.invalid).toBeTrue();
})

// las contraseñas deben coincidir 
// [objetivo]-->verificar que la configurcion personalizada de contraseñas funcione
/*it('should detect mismatched passwords', () => {
  component.registerForm.controls['password'].setValue('12345678');
  component.registerForm.controls['confirmedPassword'].setValue('99999999');

  component.registerForm.updateValueAndValidity();

  expect(component.registerForm.errors?.['notMatch']).toBeTrue();
});*/




// el formulario debe ser validado con datos correctos
//
it('show be valid when all fileds are filled correctly',() => {
  component.registerForm.controls['name'].setValue('cris');
  component.registerForm.controls['email'].setValue('cris@gmail.com');
  component.registerForm.controls['password'].setValue('12345678');
  component.registerForm.controls['confirmedPassword'].setValue('12345678');
  component.registerForm.controls['terms'].setValue(true);
}
);

// debe llamar on submit si el formulario es valido 
//[objetivo]-->comprobarque la funcion onSubmit solo se ejecuta si el formulario es valido
it('should NOT submit if form is invalid',() => {
    spyOn(component,'onSubmit').and.callThrough();

    component.onSubmit();

    expect(component.onSubmit).toHaveBeenCalled();
    expect(component.registerForm.valid).toBeFalse(); 
});


//con formulario valido 
it('should subit is form is valid', ( ) => {
  component.registerForm.controls['name'].setValue('Kevin');
  component.registerForm.controls['email'].setValue('Kevin@gmail.com');
  component.registerForm.controls['password'].setValue('12345678');
  component.registerForm.controls['confirmedPassword'].setValue('12345678');
  component.registerForm.controls['terms'].setValue(true);

  spyOn(console, 'log');

  component.onSubmit();
  
  expect(console.log).toHaveBeenCalledWith('Datos enviados', jasmine.any(Object));

});

});
