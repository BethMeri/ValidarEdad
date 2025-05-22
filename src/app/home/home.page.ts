import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: false,


})
export class HomePage implements OnInit {
  registroForm!: FormGroup;
  edadInvalida = false;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.registroForm = this.fb.group({
      fechaNacimiento: ['', Validators.required]
    });
  }

  validarEdad() {
    const fechaNacimiento = this.registroForm.get('fechaNacimiento')?.value;
    const hoy = new Date();
    const nacimiento = new Date(fechaNacimiento);
    let edad = hoy.getFullYear() - nacimiento.getFullYear();
    const mes = hoy.getMonth() - nacimiento.getMonth();

    if (mes < 0 || (mes === 0 && hoy.getDate() < nacimiento.getDate())) {
      edad--;
    }

    this.edadInvalida = edad < 18;
  }

  registrarUsuario() {
    this.validarEdad();

    if (!this.edadInvalida) {
      alert('¡Registro exitoso!');
    } else {
      alert('Debes tener al menos 18 años.');
    }
  }
}
