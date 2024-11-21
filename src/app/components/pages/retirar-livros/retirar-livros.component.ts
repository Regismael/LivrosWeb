import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgxSpinnerService } from 'ngx-spinner'; 

@Component({
  selector: 'app-retirar-livros',
  standalone: true,
  imports: [
    CommonModule,
    NgxPaginationModule
  ],
  templateUrl: './retirar-livros.component.html',
  styleUrls: ['./retirar-livros.component.css']
})
export class RetirarLivrosComponent {
  livros: any[] = [];
  livrosSelecionados: any[] = [];
  showConfirm = false;
  successMessage: string = '';
  pagina: number = 1;
  itensPorPagina: number = 6;

  constructor(
    private http: HttpClient,
    private spinnerService: NgxSpinnerService 
  ) { }

  ngOnInit() {
    this.spinnerService.show();  
    this.carregarLivros();
  }

  carregarLivros() {
    this.http.get<any[]>('http://localhost:5146/api/livros').subscribe((data) => {
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

  toggleLivroSelecionado(livro: any) {
    const index = this.livrosSelecionados.indexOf(livro);
    if (index === -1) {
      this.livrosSelecionados.push(livro);
    } else {
      this.livrosSelecionados.splice(index, 1);
    }
  }

  showConfirmBox() {
    if (this.livrosSelecionados.length === 0) {
      alert('Nenhum livro selecionado.');
      return;
    }
    this.showConfirm = true;
  }

  cancelConfirm() {
    this.showConfirm = false;
    this.livrosSelecionados = [];
    this.successMessage = '';
  }

  confirmRetirar() {
    if (this.livrosSelecionados.length === 0) {
      alert('Nenhum livro selecionado.');
      return;
    }

    const ids = this.livrosSelecionados.map(livro => livro.id);

    this.http
      .put('http://localhost:5146/api/livros/retirar', ids)
      .subscribe({
        next: (response) => {
          this.livros = this.livros.map(livro =>
            ids.includes(livro.id) ? { ...livro, disponibilidade: false } : livro
          );
          this.successMessage = 'Livro(s) retirado(s) com sucesso!';
          this.showConfirm = false;
          this.livrosSelecionados = [];
        },
        error: (error) => {
          console.error('Erro ao retirar livros:', error);
          alert('Erro ao tentar retirar os livros. Verifique o console para mais detalhes.');
        }
      });
  }

  handlePageChange(event: number) {
    this.pagina = event;
  }
}
