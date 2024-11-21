import { Routes } from '@angular/router';
import { CadastrarLivrosComponent } from './components/pages/cadastrar-livros/cadastrar-livros.component';
import { ConsultarLivrosComponent } from './components/pages/consultar-livros/consultar-livros.component';
import { RetirarLivrosComponent } from './components/pages/retirar-livros/retirar-livros.component';
import { DevolverLivrosComponent } from './components/pages/devolver-livros/devolver-livros.component';

export const routes: Routes = [
    {
        path: 'pages/cadastrar-livros',
        component: CadastrarLivrosComponent
    },
    {
        path: 'pages/consultar-livros',
        component: ConsultarLivrosComponent
    },
    {
        path: 'pages/retirar-livros',
        component: RetirarLivrosComponent
    },
    {
        path: 'pages/devolver-livros',
        component: DevolverLivrosComponent
    },
    {
        path: '', pathMatch: 'full',
        redirectTo: '/pages/consultar-livros'
    }
];
