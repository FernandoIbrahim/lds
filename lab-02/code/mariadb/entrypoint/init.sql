-- Tabela usuario
CREATE TABLE IF NOT EXISTS usuario(
    id INT AUTO_INCREMENT NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    senha VARCHAR(255) NOT NULL,
    endereco VARCHAR(255) NOT NULL,
    status ENUM('AGENTE', 'CLIENTE', 'BANCO') NOT NULL,
    PRIMARY KEY (id)
);

-- Tabela pessoa_fisica com chave estrangeira para usuario
CREATE TABLE IF NOT EXISTS pessoa_fisica (
    id INT AUTO_INCREMENT NOT NULL,
    id_usuario INT NOT NULL,
    nome VARCHAR(100) NOT NULL,
    rg VARCHAR(15) NOT NULL UNIQUE,
    cpf VARCHAR(11) NOT NULL UNIQUE,
    profissao VARCHAR(255),
    empregadora VARCHAR(255),
    PRIMARY KEY (id),
    FOREIGN KEY (id_usuario) REFERENCES usuario(id) ON DELETE CASCADE
);

-- Tabela pessoa_juridica com chave estrangeira para usuario
CREATE TABLE IF NOT EXISTS pessoa_juridica (
    id INT AUTO_INCREMENT NOT NULL,
    id_usuario INT NOT NULL,
    nome_fantasia VARCHAR(100) NOT NULL,
    cnpj VARCHAR(14) NOT NULL UNIQUE,
    PRIMARY KEY (id),
    FOREIGN KEY (id_usuario) REFERENCES usuario(id) ON DELETE CASCADE
);
