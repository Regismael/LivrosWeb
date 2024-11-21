import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators, FormBuilder } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MatDatepickerModule, MatDatepicker } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import * as moment from 'moment';

@Component({
  selector: 'app-cadastrar-livros',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatInputModule,
    MatFormFieldModule,
    MatNativeDateModule
  ],
  templateUrl: './cadastrar-livros.component.html',
  styleUrls: ['./cadastrar-livros.component.css']
})
export class CadastrarLivrosComponent implements OnInit {

  mensagemSucesso: string = '';
  mensagemErro: string = '';

  form!: FormGroup;

  generos: { value: number; viewValue: string }[] = [
    { value: 1, viewValue: 'Política' },
    { value: 2, viewValue: 'Terror' },
    { value: 3, viewValue: 'Desenvolvimento' },
    { value: 4, viewValue: 'História' },
    { value: 5, viewValue: 'Geografia' }
  ];

  constructor(private fb: FormBuilder, private httpClient: HttpClient) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      titulo: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
      autor: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
      genero: [null, Validators.required],
      anoDePublicacao: [null, [Validators.required, Validators.min(1800), Validators.max(new Date().getFullYear())]]
    });
  }

  get f() {
    return this.form.controls;
  }

  onSubmit(): void {

    this.mensagemSucesso = '';
    this.mensagemErro = '';

    if (this.form.invalid) {
      console.error('O formulário contém erros!', this.form.errors);
      return;
    }

    const generoSelecionado = this.form.value.genero;
    console.log('Gênero selecionado:', generoSelecionado);

    const generoValido = this.generos.some(g => g.value === +generoSelecionado);
    console.log('Gênero válido?', generoValido);

    if (!generoValido) {
      console.error('Gênero selecionado não é válido!');
      return;
    }

    const payload = {
      ...this.form.value,
      genero: +generoSelecionado
    };

    console.log('Payload enviado:', payload);

    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    this.httpClient.post<any>('http://localhost:5146/api/livros', payload, { headers }).subscribe({
      next: (data: any) => {
        console.log('Livro cadastrado com sucesso:', data);
        if (data && data.titulo) {
          this.mensagemSucesso = `Parabéns, o livro "${data.titulo}" foi cadastrado com sucesso!`;
        } else {
          this.mensagemSucesso = 'Livro cadastrado com sucesso, mas sem título retornado.';
        }
        this.form.reset(); // Resetando o formulário
      },
      error: (err) => {
        console.error('Erro ao cadastrar livro:', err);
        if (err.error && err.error.errors) {
          console.error('Erros de validação:', err.error.errors);
        }
      }
    });
  }

  setYear(normalizedYear: moment.Moment, datepicker: MatDatepicker<moment.Moment>): void {
    const selectedYear = normalizedYear.year();
    this.form.get('anoDePublicacao')?.setValue(selectedYear);
    datepicker.close();
  }

  getYears(): number[] {
    const currentYear = new Date().getFullYear();
    const years: number[] = [];
    for (let year = 1800; year <= currentYear; year++) {
      years.push(year);
    }
    return years;
  }
}
