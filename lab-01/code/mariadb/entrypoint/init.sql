-- Criação do banco de dados, caso necessário
CREATE DATABASE IF NOT EXISTS `school-management-system-bd`;

-- Seleção do banco de dados a ser usado
USE `school-management-system-bd`;

-- Criação da tabela usuario
CREATE TABLE IF NOT EXISTS usuario (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(255) NOT NULL,
    senha VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    cpf VARCHAR(14) NOT NULL,
    tipo ENUM('ALUNO', 'PROFESSOR', 'SECRETARIA') NOT NULL
);


-- Criação da tabela professor
CREATE TABLE IF NOT EXISTS professor (
    id BIGINT PRIMARY KEY,
    FOREIGN KEY (id) REFERENCES usuario(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

-- Criação da tabela secretaria
CREATE TABLE IF NOT EXISTS secretaria (
    id BIGINT PRIMARY KEY,
    FOREIGN KEY (id) REFERENCES usuario(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

-- Criação da tabela curso
CREATE TABLE IF NOT EXISTS curso (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(255) NOT NULL
);

-- Criação da tabela aluno
CREATE TABLE IF NOT EXISTS aluno (
    id BIGINT PRIMARY KEY,
    id_curso BIGINT,
    FOREIGN KEY (id) REFERENCES usuario(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    FOREIGN KEY (id_curso) REFERENCES curso(id)
        ON DELETE SET NULL
        ON UPDATE CASCADE
);

-- Criação da tabela disciplina
CREATE TABLE IF NOT EXISTS disciplina (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(255) NOT NULL,
    carga_horaria INT NOT NULL,
    maximo_alunos INT NOT NULL
);

-- Criação da tabela disciplina_curso
CREATE TABLE IF NOT EXISTS disciplina_curso (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    id_curso BIGINT NOT NULL,
    id_disciplina BIGINT NOT NULL,
    periodo INT NOT NULL,
    tipo ENUM('OBRIGATORIA', 'OPTATIVA') NOT NULL,
    FOREIGN KEY (id_curso) REFERENCES curso(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    FOREIGN KEY (id_disciplina) REFERENCES disciplina(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

-- Criação da tabela matricula_disciplina
CREATE TABLE IF NOT EXISTS matricula_disciplina (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    id_aluno BIGINT NOT NULL,
    id_disciplina BIGINT NOT NULL,
    data_matricula DATE NOT NULL,
    FOREIGN KEY (id_aluno) REFERENCES aluno(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    FOREIGN KEY (id_disciplina) REFERENCES disciplina(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);


-- Criação da tabela professor_disciplina
CREATE TABLE IF NOT EXISTS professor_disciplina (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    id_professor BIGINT NOT NULL,
    id_disciplina BIGINT NOT NULL,
    FOREIGN KEY (id_professor ) REFERENCES professor(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    FOREIGN KEY (id_disciplina) REFERENCES disciplina(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

-- Inserindo usuários (1 secretaria, 10 professores, 20 alunos)
INSERT INTO usuario (nome, senha, email, cpf, tipo) VALUES 
('Maria da Silva', 'senha123', 'maria@escola.com', '111.222.333-44', 'SECRETARIA'), -- Secretaria
('João Pereira', 'senha123', 'joao@escola.com', '222.333.444-55', 'PROFESSOR'),
('Ana Costa', 'senha123', 'ana@escola.com', '333.444.555-66', 'PROFESSOR'),
('Pedro Oliveira', 'senha123', 'pedro@escola.com', '444.555.666-77', 'PROFESSOR'),
('Lucia Santos', 'senha123', 'lucia@escola.com', '555.666.777-88', 'PROFESSOR'),
('Carlos Mendes', 'senha123', 'carlos@escola.com', '666.777.888-99', 'PROFESSOR'),
('Juliana Ferreira', 'senha123', 'juliana@escola.com', '777.888.999-00', 'PROFESSOR'),
('Fernando Almeida', 'senha123', 'fernando@escola.com', '888.999.000-11', 'PROFESSOR'),
('Patricia Lima', 'senha123', 'patricia@escola.com', '999.000.111-22', 'PROFESSOR'),
('Marcos Souza', 'senha123', 'marcos@escola.com', '000.111.222-33', 'PROFESSOR'),
('Isabela Rocha', 'senha123', 'isabela@escola.com', '111.222.333-44', 'PROFESSOR'),
('Eduardo Nunes', 'senha123', 'eduardo@escola.com', '222.333.444-55', 'ALUNO'),
('Amanda Martins', 'senha123', 'amanda@escola.com', '333.444.555-66', 'ALUNO'),
('Thiago Silva', 'senha123', 'thiago@escola.com', '444.555.666-77', 'ALUNO'),
('Camila Duarte', 'senha123', 'camila@escola.com', '555.666.777-88', 'ALUNO'),
('Rafael Campos', 'senha123', 'rafael@escola.com', '666.777.888-99', 'ALUNO'),
('Beatriz Gomes', 'senha123', 'beatriz@escola.com', '777.888.999-00', 'ALUNO'),
('Gabriel Lima', 'senha123', 'gabriel@escola.com', '888.999.000-11', 'ALUNO'),
('Larissa Alves', 'senha123', 'larissa@escola.com', '999.000.111-22', 'ALUNO'),
('Victor Araujo', 'senha123', 'victor@escola.com', '000.111.222-33', 'ALUNO'),
('Renata Oliveira', 'senha123', 'renata@escola.com', '111.222.333-44', 'ALUNO'),
('Matheus Ribeiro', 'senha123', 'matheus@escola.com', '222.333.444-55', 'ALUNO'),
('Carolina Teixeira', 'senha123', 'carolina@escola.com', '333.444.555-66', 'ALUNO'),
('Lucas Fernandes', 'senha123', 'lucas@escola.com', '444.555.666-77', 'ALUNO'),
('Vanessa Moura', 'senha123', 'vanessa@escola.com', '555.666.777-88', 'ALUNO'),
('Bruno Correia', 'senha123', 'bruno@escola.com', '666.777.888-99', 'ALUNO'),
('Juliana Batista', 'senha123', 'juliana.batista@escola.com', '777.888.999-00', 'ALUNO'),
('Felipe Souza', 'senha123', 'felipe@escola.com', '888.999.000-11', 'ALUNO'),
('Alice Cardoso', 'senha123', 'alice@escola.com', '999.000.111-22', 'ALUNO'),
('Henrique Medeiros', 'senha123', 'henrique@escola.com', '000.111.222-33', 'ALUNO'),
('Mariana Torres', 'senha123', 'mariana@escola.com', '111.222.333-44', 'ALUNO');

-- Inserindo a secretaria
INSERT INTO secretaria (id) VALUES (1);

-- Inserindo os professores
INSERT INTO professor (id) VALUES 
(2), (3), (4), (5), (6), (7), (8), (9), (10), (11);

-- Inserindo cursos e alunos
INSERT INTO curso (nome) VALUES 
('Engenharia de Software'),
('Administração'),
('Direito'),
('Medicina'),
('Engenharia Elétrica');

INSERT INTO aluno (id, id_curso) VALUES 
(12, 1), (13, 1), (14, 2), (15, 2), (16, 3), (17, 3), (18, 4), (19, 4), (20, 5),
(21, 5), (22, 1), (23, 2), (24, 3), (25, 4), (26, 5), (27, 1), (28, 2), (29, 3), (30, 4), (31, 5);

-- Inserindo disciplinas
INSERT INTO disciplina (nome, carga_horaria, maximo_alunos) VALUES 
-- Disciplinas existentes
('Programação I', 60, 30),
('Banco de Dados', 60, 30),
('Matemática Financeira', 45, 40),
('Gestão de Projetos', 50, 40),
('Anatomia', 70, 25),
('Fisiologia', 70, 25),
('Direito Civil', 60, 35),
('Direito Penal', 60, 35),
('Cálculo I', 80, 30),
('Circuitos Elétricos', 70, 30),
('Algoritmos', 60, 30),
('Contabilidade', 45, 40),
('Microeconomia', 50, 40),
('Histologia', 70, 25),
('Eletromagnetismo', 80, 30),

-- Novas disciplinas
('Programação II', 60, 30),
('Sistemas Operacionais', 60, 30),
('Teoria dos Grafos', 45, 40),
('Engenharia de Requisitos', 50, 40),
('Fisiologia Aplicada', 70, 25),
('Bioquímica', 70, 25),
('Direito Administrativo', 60, 35),
('Direito Internacional', 60, 35),
('Cálculo II', 80, 30),
('Eletrônica Analógica', 70, 30),
('Estruturas de Dados', 60, 30),
('Auditoria', 45, 40),
('Economia Internacional', 50, 40),
('Patologia', 70, 25),
('Eletromagnetismo Aplicado', 80, 30),

-- Mais disciplinas
('Linguagens de Programação', 60, 30),
('Redes de Computadores', 60, 30),
('Estatística', 45, 40),
('Gestão de Operações', 50, 40),
('Genética', 70, 25),
('Imunologia', 70, 25),
('Direito Constitucional', 60, 35),
('Direito do Trabalho', 60, 35),
('Álgebra Linear', 80, 30),
('Sistemas Digitais', 70, 30),
('Engenharia de Software II', 60, 30),
('Gestão Financeira', 45, 40),
('Comportamento Organizacional', 50, 40),
('Neuroanatomia', 70, 25),
('Óptica', 80, 30);

-- Inserindo relacionamentos
-- Engenharia de Software
INSERT INTO disciplina_curso (id_curso, id_disciplina, periodo, tipo) VALUES 
(1, 1, 1, 'OBRIGATORIA'), -- Programação I
(1, 2, 2, 'OBRIGATORIA'), -- Banco de Dados
(1, 3, 1, 'OBRIGATORIA'), -- Matemática Financeira
(1, 4, 2, 'OBRIGATORIA'), -- Gestão de Projetos
(1, 5, 1, 'OBRIGATORIA'), -- Anatomia
(1, 6, 2, 'OBRIGATORIA'), -- Fisiologia
(1, 9, 1, 'OBRIGATORIA'), -- Cálculo I
(1, 11, 1, 'OPTATIVA'),    -- Algoritmos
(1, 12, 2, 'OPTATIVA'),    -- Microeconomia
(1, 13, 1, 'OPTATIVA');    -- Contabilidade

-- Administração
INSERT INTO disciplina_curso (id_curso, id_disciplina, periodo, tipo) VALUES 
(2, 1, 1, 'OBRIGATORIA'), -- Programação I
(2, 2, 2, 'OBRIGATORIA'), -- Banco de Dados
(2, 3, 1, 'OBRIGATORIA'), -- Matemática Financeira
(2, 4, 2, 'OBRIGATORIA'), -- Gestão de Projetos
(2, 5, 1, 'OBRIGATORIA'), -- Anatomia
(2, 6, 2, 'OBRIGATORIA'), -- Fisiologia
(2, 13, 2, 'OBRIGATORIA'), -- Contabilidade
(2, 7, 1, 'OPTATIVA'),     -- Direito Civil
(2, 8, 2, 'OPTATIVA'),     -- Direito Penal
(2, 14, 2, 'OPTATIVA');    -- Economia Internacional

-- Direito
INSERT INTO disciplina_curso (id_curso, id_disciplina, periodo, tipo) VALUES 
(3, 7, 1, 'OBRIGATORIA'), -- Direito Civil
(3, 8, 2, 'OBRIGATORIA'), -- Direito Penal
(3, 9, 1, 'OBRIGATORIA'), -- Cálculo I
(3, 10, 2, 'OBRIGATORIA'), -- Circuitos Elétricos
(3, 11, 1, 'OBRIGATORIA'), -- Algoritmos
(3, 12, 2, 'OBRIGATORIA'), -- Microeconomia
(3, 14, 2, 'OBRIGATORIA'), -- Economia Internacional
(3, 13, 1, 'OPTATIVA'),    -- Contabilidade
(3, 15, 2, 'OPTATIVA'),    -- Eletromagnetismo
(3, 16, 1, 'OPTATIVA');    -- Programação II

-- Medicina
INSERT INTO disciplina_curso (id_curso, id_disciplina, periodo, tipo) VALUES 
(4, 5, 1, 'OBRIGATORIA'), -- Anatomia
(4, 6, 2, 'OBRIGATORIA'), -- Fisiologia
(4, 13, 1, 'OBRIGATORIA'), -- Contabilidade
(4, 14, 2, 'OBRIGATORIA'), -- Histologia
(4, 15, 2, 'OBRIGATORIA'), -- Eletromagnetismo
(4, 16, 1, 'OBRIGATORIA'), -- Programação II
(4, 17, 2, 'OBRIGATORIA'), -- Engenharia de Requisitos
(4, 12, 2, 'OPTATIVA'),    -- Microeconomia
(4, 18, 1, 'OPTATIVA'),    -- Teoria dos Grafos
(4, 19, 2, 'OPTATIVA');    -- Fisiologia Aplicada

-- Engenharia Elétrica
INSERT INTO disciplina_curso (id_curso, id_disciplina, periodo, tipo) VALUES 
(5, 9, 1, 'OBRIGATORIA'), -- Cálculo I
(5, 10, 2, 'OBRIGATORIA'), -- Circuitos Elétricos
(5, 11, 1, 'OBRIGATORIA'), -- Algoritmos
(5, 12, 2, 'OBRIGATORIA'), -- Microeconomia
(5, 13, 1, 'OBRIGATORIA'), -- Contabilidade
(5, 14, 2, 'OBRIGATORIA'), -- Economia Internacional
(5, 15, 2, 'OBRIGATORIA'), -- Eletromagnetismo
(5, 17, 2, 'OPTATIVA'),    -- Engenharia de Requisitos
(5, 18, 1, 'OPTATIVA'),    -- Teoria dos Grafos
(5, 19, 2, 'OPTATIVA');    -- Fisiologia Aplicada


-- Inserindo a relação entre professores e disciplinas
INSERT INTO professor_disciplina (id_professor, id_disciplina) VALUES 
(2, 1), (2, 11),
(3, 2), (3, 12),
(4, 3), (4, 13),
(5, 4), (5, 14),
(6, 5), (6, 15),
(7, 6), (7, 1),
(8, 7), (8, 2),
(9, 8), (9, 3),
(10, 9), (10, 4);

-- Inserindo matriculas em disciplinas
INSERT INTO matricula_disciplina (id_aluno, id_disciplina, data_matricula) VALUES 
(12, 1, '2024-09-01'), (12, 2, '2024-09-01'),
(13, 1, '2024-09-01'), (13, 11, '2024-09-01'),
(14, 3, '2024-09-01'), (14, 12, '2024-09-01'),
(15, 3, '2024-09-01'), (15, 4, '2024-09-01'),
(16, 7, '2024-09-01'), (16, 13, '2024-09-01'),
(17, 7, '2024-09-01'), (17, 8, '2024-09-01'),
(18, 5, '2024-09-01'), (18, 14, '2024-09-01'),
(19, 5, '2024-09-01'), (19, 6, '2024-09-01'),
(20, 9, '2024-09-01'), (20, 15, '2024-09-01');
