import { Component } from '@angular/core';
import { Navbar } from './components/navbar/navbar';
import { TarefaForm } from './components/tarefa-form/tarefa-form';
import { TarefaList } from './components/tarefa-list/tarefa-list';

@Component({
  selector: 'app-root',
  imports: [Navbar, TarefaForm, TarefaList],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {}