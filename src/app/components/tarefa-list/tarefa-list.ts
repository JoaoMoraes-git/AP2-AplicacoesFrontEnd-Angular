import { Component, inject } from '@angular/core';
import { Tarefa } from '../../models/tarefa';
import { TarefaService } from '../../services/tarefa.service';

@Component({
  selector: 'app-tarefa-list',
  templateUrl: './tarefa-list.html',
  styleUrl: './tarefa-list.css'
})
export class TarefaList {
  private readonly tarefaService = inject(TarefaService);

  tarefas: Tarefa[] = [];
  carregando = false;

  ngOnInit(): void {
    this.carregarTarefas();
  }

  carregarTarefas(): void {
    this.carregando = true;

    this.tarefaService.listar().subscribe({
      next: (dados) => {
        this.tarefas = dados;
        this.carregando = false;
      },
      error: (erro) => {
        console.error('Erro ao carregar tarefas:', erro);
        this.carregando = false;
      }
    });
  }

  editar(tarefa: Tarefa): void {
    if (!tarefa.id) {
      return;
    }

    const novaDescricao = prompt('Nova descrição:', tarefa.descricao);

    if (!novaDescricao) {
      return;
    }

    const tarefaAtualizado: Tarefa = {
      ...tarefa,
      descricao: novaDescricao
    };

    this.tarefaService.atualizar(tarefa.id, tarefaAtualizado).subscribe({
      next: () => this.carregarTarefas(),
      error: (erro) => console.error('Erro ao editar tarefa:', erro)
    });
  }

  excluir(tarefa: Tarefa): void {
    if (!tarefa.id) {
      return;
    }

    const confirmou = confirm(`Deseja excluir o tarefa "${tarefa.descricao}"?`);

    if (!confirmou) {
      return;
    }

    this.tarefaService.excluir(tarefa.id).subscribe({
      next: () => this.carregarTarefas(),
      error: (erro) => console.error('Erro ao excluir tarefa:', erro)
    });
  }
}