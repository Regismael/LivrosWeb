import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-devolver-livros',
  standalone: true,
  imports: [
    CommonModule,
    NgxPaginationModule
  ],
  templateUrl: './devolver-livros.component.html',
  styleUrls: ['./devolver-livros.component.css']
})
export class DevolverLivrosComponent {
  livros: any[] = [];
  showConfirm = false;
  selectedBook: any = null;
  mensagemSucesso: string | null = null;
  pagina: number = 1;

  constructor(
    private httpClient: HttpClient,
    private spinnerService: NgxSpinnerService
  ) { }

  ngOnInit() {
    this.spinnerService.show();
    this.carregarLivros();
  }

  carregarLivros() {
    this.httpClient.get<any[]>('http://localhost:5146/api/livros').subscribe((data) => {
      this.livros = data.map((livro) => ({
        ...livro,
        disponibilidade: livro.disponibilidade
      }));

      setTimeout(() => {
        this.spinnerService.hide();
      }, 500);
    }, (error) => {
      this.spinnerService.hide();
      console.error('Erro ao carregar os livros:', error);
    });
  }

  showConfirmBox(livro: any) {
    this.selectedBook = livro;
    this.showConfirm = true;
  }

  cancelConfirm() {
    this.showConfirm = false;
    this.selectedBook = null;
  }

  confirmDevolver() {
    if (this.selectedBook) {
      this.httpClient
        .put(`http://localhost:5146/api/livros/devolver/${this.selectedBook.id}`, {})
        .subscribe(() => {
          this.selectedBook.disponibilidade = true;

          this.livros = this.livros.map(livro =>
            livro.id === this.selectedBook.id ? { ...livro, disponibilidade: true } : livro
          );

          this.showConfirm = false;
          this.selectedBook = null;

          this.mensagemSucesso = `O(s) livro(s) foi(foram) devolvido(s) com sucesso!`;
          setTimeout(() => {
            this.mensagemSucesso = null;
          }, 3000);
        });
    }
  }

  handlePageChange(event: any) {
    this.pagina = event;
  }
}
