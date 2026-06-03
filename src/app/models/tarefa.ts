export interface Tarefa {
    id?: number | string;
    descricao: string;
    nivelImportancia: number | null;
    dataCriado: number;
    dataLimite: number
    pendente: boolean;
}