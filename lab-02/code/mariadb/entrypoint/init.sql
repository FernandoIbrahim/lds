-- Tabela usuario
CREATE TABLE IF NOT EXISTS usuario(
    id INT AUTO_INCREMENT NOT NULL,
    email VARCHAR(100) NOT NULL,
    senha VARCHAR(255) NOT NULL,
    endereco VARCHAR(255) NOT NULL,
    user_role ENUM('AGENTE', 'CLIENTE', 'BANCO') NOT NULL,
    PRIMARY KEY (id)
);

-- Tabela pessoa_fisica com chave estrangeira para usuario
CREATE TABLE IF NOT EXISTS pessoa_fisica (
    id INT AUTO_INCREMENT NOT NULL,
    id_usuario INT NOT NULL,
    nome VARCHAR(100) NOT NULL,
    rg VARCHAR(15) NOT NULL,
    cpf VARCHAR(11) NOT NULL,
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
    cnpj VARCHAR(14) NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (id_usuario) REFERENCES usuario(id) ON DELETE CASCADE
);

-- Tabela automoveis com chave estrangeira para usuario
CREATE TABLE IF NOT EXISTS automovel (
	matricula INT NOT NULL,
	ano INT NOT NULL,
	marca VARCHAR(100) NOT NULL,
	modelo VARCHAR(100) NOT NULL,
	placa VARCHAR(7) NOT NULL,
	id_usuario INT NOT NULL,
	PRIMARY KEY (matricula),
	FOREIGN KEY (id_usuario) REFERENCES usuario(id) ON DELETE CASCADE
);



-- Tabela pedidos de aluguel com chave estrangeira para usuario
CREATE TABLE IF NOT EXISTS pedido_aluguel (
	id INT AUTO_INCREMENT NOT NULL,
	aprovacao BOOL NOT NULL,
	total DECIMAL NOT NULL,
	data_inicio DATE NOT NULL,
	data_fim DATE NOT NULL,
	id_cliente INT NOT NULL,
	matricula_automovel INT NOT NULL,
	id_proprietario INT NOT NULL,
	PRIMARY KEY (id),
	FOREIGN KEY (id_cliente) REFERENCES pessoa_fisica(id) ON DELETE CASCADE,
	FOREIGN KEY (matricula_automovel) REFERENCES automovel(matricula) ON DELETE CASCADE,
	FOREIGN KEY (id_proprietario) REFERENCES usuario(id) ON DELETE CASCADE
);




-- Tabela  redimentos com chave estrangeira para usuario
CREATE TABLE IF NOT EXISTS rendimentos (
	id INT NOT NULL,
	provento DECIMAL NOT NULL,
	data DATE NOT NULL,
	id_usuario INT NOT NULL,
	PRIMARY KEY (id),
	FOREIGN KEY (id_usuario) REFERENCES usuario(id) ON DELETE CASCADE
);


-- Tabela  Contrato com chave estrangeira para Pedido Aluguel

CREATE TABLE IF NOT EXISTS contrato (
	id INT NOT NULL,
	numero_contrato INT NOT NULL,
	data_aprovacao DATE NOT NULL,
	id_pedido INT NOT NULL,
	PRIMARY KEY (id),
	FOREIGN KEY (id_pedido) REFERENCES pedido_aluguel(id) ON DELETE CASCADE
);



-- Tabela  Contrato de Crédito com chave estrangeira para Pedido Aluguel
CREATE TABLE IF NOT EXISTS contrato_credito (
	id INT NOT NULL,
	id_pedido INT NOT NULL,
	PRIMARY KEY (id),
	FOREIGN KEY (id_pedido) REFERENCES pedido_aluguel(id) ON DELETE CASCADE
);

