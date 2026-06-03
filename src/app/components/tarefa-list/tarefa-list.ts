import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { Tarefa } from '../../models/tarefa';
import { TarefaService } from '../../services/tarefa.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tarefa-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tarefa-list.html',
  styleUrl: './tarefa-list.css'
})
export class TarefaList {
  private readonly tarefaService = inject(TarefaService);
  private readonly cdr = inject(ChangeDetectorRef);
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
        alert('Erro ao carregar a lista de tarefas.');
        this.carregando = false;
      }
    });
  }

  alternarPendente(tarefa: Tarefa): void {
    if (!tarefa.id) return;

    const tarefaAtualizada: Tarefa = {
      ...tarefa,
      pendente: !tarefa.pendente
    };

    this.tarefaService.atualizar(tarefa.id, tarefaAtualizada).subscribe({
      next: () => this.carregarTarefas(),
      error: (erro) => {
        console.error('Erro ao alternar status da tarefa:', erro);
        alert('Erro ao alternar o status da tarefa.');
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
      error: (erro) => {
        console.error('Erro ao editar tarefa:', erro);
        alert('Erro ao editar a tarefa.');
      }
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
      next: () => {
        alert('Tarefa excluída com sucesso.');
        this.carregarTarefas();
      },
      error: (erro) => {
        console.error('Erro ao excluir tarefa:', erro);
        alert('Erro ao excluir a tarefa.');
      }
    });
  }
}