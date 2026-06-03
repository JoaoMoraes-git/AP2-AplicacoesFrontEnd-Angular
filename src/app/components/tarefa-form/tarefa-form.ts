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

  prazoDias = 1;

  tarefa: Tarefa = {
    id: '',
    descricao: '',
    nivelImportancia: 0,
    dataCriado: Date.now(),
    dataLimite: Date.now(), //Colocar para o usuário definir o tempo
    pendente: true
  };

  salvar(): void {
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
          nivelImportancia: 0,
          dataCriado: Date.now(),
          dataLimite: Date.now(),
          pendente: true
        };
        this.prazoDias = 1;

        this.salvo.emit();
      },
      error: (erro) => {
        console.error('Erro ao salvar tarefa:', erro);
      }
    });
  }
}