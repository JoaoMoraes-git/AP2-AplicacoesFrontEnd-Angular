# AP2 - Aplicações Front-End

## Identificação

Nome: João Guilherme Silva de Moraes
Curso: Análise e Desenvolvimento de Sistemas  
Disciplina: Aplicações Front-End  
Instituição: ULBRA  

## Tema do projeto

CRUD com Angular e JSON Server, com a temática de lista de tarefas.

## Descrição

Aplicação desenvolvida em Angular para cadastro, listagem, edição e exclusão de tarefas, utilizando JSON Server como API simulada.

## Tecnologias utilizadas

- Angular
- TypeScript
- HTML
- CSS
- JSON Server
- Git e GitHub

## Como executar o projeto

1. Clone o repositório:

```bash
git clone https://github.com/JoaoMoraes-git/AP2-AplicacoesFrontEnd-Angular.git
```

2. Acesse a pasta do projeto:

```bash
cd AP2-AplicacoesFrontEnd-Angular
```

3. Instale as dependências:

```bash
npm install
```

4. Inicie a API simulada e o Angular simultaneamente com um único comando:

```bash
npm run start:all
```

> **Nota:** Caso prefira, você pode rodar os serviços separadamente executando `npm run api` em um terminal e `npm start` em outro.

5. Acesse no navegador:

```txt
http://localhost:4200
```

## Link do vídeo demonstrativo

https://drive.google.com/drive/folders/1yzeSQAzkoJAyLRuomPA_uL2arsf-7RI-?usp=sharing

## Funcionalidades

- **Gestão de Tarefas (CRUD Completo):** Permite criar novas tarefas com níveis de importância e prazos, visualizar todas as tarefas registradas, editar as descrições e remover as tarefas indesejadas.
- **Controle de Status:** Possibilidade de alternar facilmente o status de uma tarefa entre pendente e concluída com um único clique.
- **Persistência Dinâmica de Dados:** Integração total e em tempo real com o JSON Server, garantindo que todas as mudanças feitas na interface sejam instantaneamente gravadas e refletidas pela API simulada.