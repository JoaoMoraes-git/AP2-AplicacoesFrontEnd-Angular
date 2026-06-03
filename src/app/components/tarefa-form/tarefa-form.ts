import { ChangeDetectorRef, Component, EventEmitter, inject, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Tarefa } from '../../models/tarefa';
import { TarefaService } from '../../services/tarefa.service';

@Component({
  standalone: true,
  selector: 'app-tarefa-form',
  imports: [FormsModule],
  templateUrl: './tarefa-form.html',
  styleUrl: './tarefa-form.css'
})
export class TarefaForm {
  @Output() salvo = new EventEmitter<void>();

  private readonly cdr = inject(ChangeDetectorRef);
  private readonly tarefaService = inject(TarefaService);

  prazoDias: number | null = null;
  mensagemSucesso = '';
  mensagemErro = '';

  tarefa: Tarefa = {
    descricao: '',
    nivelImportancia: null as unknown as number,
    dataCriado: Date.now(),
    dataLimite: Date.now(), //Colocar para o usuário definir o tempo
    pendente: true
  };

  salvar(): void {
    this.mensagemSucesso = '';
    this.mensagemErro = '';

    if (!this.tarefa.descricao || this.tarefa.descricao.trim() === '') {
      this.mensagemErro = 'Por favor, digite uma descrição';
      return;
    }

    if (!this.tarefa.nivelImportancia || this.tarefa.nivelImportancia <= 0) {
      this.mensagemErro = 'Por favor, escolha um nível de importância';
      return;
    }

    if (!this.prazoDias || this.prazoDias <= 0) {
      this.mensagemErro = 'Por favor, defina um prazo válido (mínimo 1 dia)';
      return;
    }

    const agora = Date.now();
    const prazo = this.prazoDias * 24 * 60 * 60 * 1000;
    const tarefaComPrazo: Tarefa = {
      ...this.tarefa,
      id: agora,
      dataCriado: agora,
      dataLimite: agora + prazo
    };

    this.tarefaService.criar(tarefaComPrazo).subscribe({
      next: () => {
        this.tarefa = {
          descricao: '',
          nivelImportancia: null as unknown as number,
          dataCriado: Date.now(),
          dataLimite: Date.now(),
          pendente: true
        };
        this.prazoDias = null;

        this.salvo.emit();
        this.mensagemSucesso = 'A tarefa foi adicionada com sucesso!';
        setTimeout(() => this.mensagemSucesso = '', 3000);
      },
      error: (erro) => {
        console.error('Erro ao salvar tarefa:', erro);
        this.mensagemErro = 'Erro ao salvar a tarefa. Tente novamente.';
      }
    });
  }
}