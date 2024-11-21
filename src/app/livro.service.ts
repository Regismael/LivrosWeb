import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

interface Livro {
  id: number;
  titulo: string;
  autor: string;
  genero: string;
  anoDePublicacao: number;
  disponibilidade: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class LivroService {

  private livrosSubject = new BehaviorSubject<Livro[]>([]);
  livros$ = this.livrosSubject.asObservable();

  private apiUrl = 'http://localhost:5146/api/livros';

  constructor(private httpClient: HttpClient) { }

  // Carregar todos os livros
  carregarLivros(): void {
    this.httpClient.get<Livro[]>(this.apiUrl)
      .subscribe({
        next: (data) => {
          this.livrosSubject.next(data);  // Atualiza o BehaviorSubject com os novos dados
        },
        error: (err) => {
          console.error('Erro ao carregar livros', err);
        }
      });
  }

  // Retirar livro (marcando como indisponível)
  retirarLivro(livro: Livro): void {
    livro.disponibilidade = false;
    this.httpClient.put(`${this.apiUrl}/${livro.id}`, livro).subscribe({
      next: () => {
        console.log('Livro retirado com sucesso');
        this.carregarLivros();  // Recarrega a lista de livros após a atualização
      },
      error: (err) => {
        console.error('Erro ao retirar livro', err);
      }
    });
  }
}
