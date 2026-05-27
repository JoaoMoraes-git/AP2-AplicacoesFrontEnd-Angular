export interface Tarefa {
    id?: number | string;
    descricao: string;
    nivelImportancia: number;
    dataCriado: number;
    pendente: boolean;
}