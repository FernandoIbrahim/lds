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

-- Criação da tabela aluno
CREATE TABLE IF NOT EXISTS aluno (
    id BIGINT PRIMARY KEY,
    FOREIGN KEY (id) REFERENCES usuario(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
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
    semestre INT NOT NULL,
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

