# Sistema de Matriculas
O sistema de gestão de matrículas permite o controle completo de operações acadêmicas, como login seguro e cadastro de alunos, professores, administradores, disciplinas. Com ele, é possível gerenciar cursos e disciplinas, facilitando a criação e manutenção de ofertas curriculares.

Além disso, o sistema emite relatórios que ajudam na tomada de decisões, fornecendo informações sobre matrículas, preenchimento de turmas e outras métricas importantes. Essas funcionalidades garantem uma administração acadêmica eficiente e baseada em dados precisos. 


## Integrantes
* Fernando Antônio Ferreira Ibrahim
* Gabriel Pongelupe de Carvalho
* Jhonata Silveira Dias

## Orientadores
* Cleiton Silva Tavares

## Instruções de utilização
Assim que a primeira versão do sistema estiver disponível, deverá complementar com as instruções de utilização. Descreva como instalar eventuais dependências e como executar a aplicação.

--- 

## Enunciado

#### Descrição do Sistema
Uma universidade pretende informatizar seu sistema de matrículas. A secretaria da universidade gera o currículo para cada semestre e mantém as informações sobre as disciplinas, professores e alunos.

Cada curso tem um nome, um determinado número de créditos, e é constituído por diversas disciplinas.

Os alunos podem se matricular em 4 disciplinas como 1ª opção (obrigatórias) e em mais 2 outras alternativas (optativas).

Há períodos para efetuar matrículas, durante os quais um aluno pode acessar o sistema para se matricular em disciplinas e/ou para cancelar matrículas feitas anteriormente.

Uma disciplina só fica ativa, isto é, só vai ocorrer no semestre seguinte se, no final do período de matrículas, tiver pelo menos 3 alunos inscritos (matriculados). Caso contrário, a disciplina será cancelada. O número máximo de alunos inscritos em uma disciplina é de 60, e quando este número é atingido, as inscrições (matrículas) para essa disciplina são encerradas.

Após um aluno se inscrever para um semestre, o sistema de cobranças é notificado pelo sistema de matrículas, de modo que o aluno possa ser cobrado pelas disciplinas daquele semestre.

Os professores podem acessar o sistema para saber quais são os alunos que estão matriculados em cada disciplina.

Todos os usuários do sistema têm senhas que são utilizadas para validação do respectivo login.

### Apresentação Final

Ao final da última sprint (Sprint 03), os alunos deverão apresentar o protótipo produzido, comparando-o com os modelos descritos inicialmente, bem como apresentando as modificações inseridas para o funcionamento adequado do software (conforme a especificação anterior). O sistema deverá ser desenvolvido em Java, atendendo aos requisitos apresentados e cumprindo a modelagem produzida nas sprints iniciais do projeto. Para a criação dos diagramas solicitados, os alunos deverão utilizar o PlantUML, um projeto Open Source que permite escrever rapidamente diagramas. O repositório GitHub deve estar atualizado, com todas as versões produzidas dos modelos UML (código e imagem resultante em .png) e o código final desenvolvido.

#### Avaliação
A avaliação final do projeto levará em consideração os seguintes aspectos:

- Qualidade do sistema produzido (adequação aos requisitos apresentados);
- Alinhamento entre modelo (de classes e de arquitetura) e código;
- Atualizações dos modelos conforme necessidade do projeto.

### Processo de Desenvolvimento

#### Lab01S01: Modelo de Análise
Entrega: Diagrama de Caso de Uso referente ao sistema + Descrição em Histórias de Usuário em Markdown (.md), no README do Repositório, com arquivo enviado no Canvas.
Valor: 4 pontos

#### Lab01S02: Projeto Estrutural
Entrega: Correção dos Diagramas desenvolvidos + Diagrama de Classes referente ao sistema + Criação do Projeto Java, contendo: classes, atributos e stub dos métodos modelados.
Valor: 4 pontos

#### Lab01S03: Implementação do Protótipo
Entrega: Correção dos Diagramas desenvolvidos + Implementação do protótipo do sistema (principais funcionalidades usáveis, com interface e persistência). Observação: a interface pode ser em linha de comando e a persistência em arquivos.
Valor: 7 pontos

#### Prazo Final
Entrega: 01/09
Apresentação: 02/09
Valor Total: 15 pontos
