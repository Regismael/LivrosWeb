import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-consultar-livros',
  standalone: true,
  imports: [
    CommonModule,
    NgxPaginationModule,
  ],
  templateUrl: './consultar-livros.component.html',
  styleUrls: ['./consultar-livros.component.css']
})
export class ConsultarLivrosComponent {

  pagina: number = 1;
  livros: any[] = [];

  generos: { value: number; viewValue: string }[] = [
    { value: 1, viewValue: 'Política' },
    { value: 2, viewValue: 'Terror' },
    { value: 3, viewValue: 'Desenvolvimento' },
    { value: 4, viewValue: 'História' },
    { value: 5, viewValue: 'Geografia' }
  ];

  constructor(
    private http: HttpClient,
    private spinnerService: NgxSpinnerService
  ) { }

  ngOnInit() {
    this.spinnerService.show();
    this.carregarLivros();
  }

  carregarLivros() {
    this.http.get<any[]>('http://localhost:5146/api/livros')
      .subscribe((data) => {
        this.livros = data.map((livro) => ({
          ...livro,
          generoNome: this.generos.find(g => g.value === livro.genero)?.viewValue || 'Gênero desconhecido'
        }));
        setTimeout(() => {
          this.spinnerService.hide();
        }, 500);
      }, (error) => {
        this.spinnerService.hide();
        console.error('Erro ao carregar os livros:', error);
      });
  }

  handlePageChange(event: number) {
    this.pagina = event;
  }
}
