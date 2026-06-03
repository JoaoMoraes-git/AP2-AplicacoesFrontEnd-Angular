import { ChangeDetectorRef ,Component, EventEmitter, inject, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Tarefa } from '../../models/tarefa';
import { TarefaService } from '../../services/tarefa.service';

@Component({
  standalone : true,
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

  tarefa: Tarefa = {
    id: '',
    descricao: '',
    nivelImportancia: null as unknown as number,
    dataCriado: Date.now(),
    dataLimite: Date.now(), //Colocar para o usuário definir o tempo
    pendente: true
  };

  salvar(): void {
    if (!this.tarefa.descricao || this.tarefa.descricao.trim() === '') {
      alert('Por favor, digite uma descrição');
      return;
    }

    if (!this.tarefa.nivelImportancia || this.tarefa.nivelImportancia <= 0) {
      alert('Por favor, escolha um nível de importância');
      return;
    }

    if (!this.prazoDias || this.prazoDias <= 0) {
      alert('Por favor, defina um prazo válido (mínimo 1 dia)');
      return;
    }

    const agora = Date.now();
    const prazo = this.prazoDias * 24 * 60 * 60 * 1000;
    const tarefaComPrazo: Tarefa = {
      ...this.tarefa,
      dataCriado: agora,
      dataLimite: agora + prazo
    };

    this.tarefaService.criar(tarefaComPrazo).subscribe({
      next: () => {
        this.tarefa = {
          id: '',
          descricao: '',
          nivelImportancia: null as unknown as number,
          dataCriado: Date.now(),
          dataLimite: Date.now(),
          pendente: true
        };
        this.prazoDias = null;

        this.salvo.emit();
        alert('A tarefa foi adicionada');
      },
      error: (erro) => {
        console.error('Erro ao salvar tarefa:', erro);
      }
    });
  }
}