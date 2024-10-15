// test.js
const sequelize = require('./config/sequelize'); // Certifique-se de que o caminho está correto
const Usuario = require('./models/usuario');
const Aluno = require('./models/aluno');
const Professor = require('./models/professor');
const Empresa = require('./models/empresa');
const InstituicaoEnsino = require('./models/instituicaoEnsino');
const Vantagem = require('./models/vantagem');
const Transacao = require('./models/transacao');

async function testDatabase() {
  try {
    // Sincronizar os modelos com o banco de dados
    await sequelize.sync({ force: true }); // O parâmetro 'force: true' irá recriar as tabelas

    console.log('Todas as tabelas foram criadas com sucesso!');

    // Adicionando um usuário
    const usuario = await Usuario.create({
      email: 'usuario@example.com',
      senha: 'senha123',
    });

    console.log('Usuário criado:', usuario.toJSON());

    // Adicionando uma instituição de ensino
    const instituicao = await InstituicaoEnsino.create({
      cnpj: '12.345.678/0001-90',
      nome: 'Instituição de Exemplo',
    });

    console.log('Instituição de ensino criada:', instituicao.toJSON());

    // Adicionando um aluno
    const aluno = await Aluno.create({
      nome: 'Aluno Exemplo',
      email: 'aluno@example.com',
      senha: 'senha456',
      endereco: 'Rua de Exemplo, 123',
      curso: 'Curso de Exemplo',
      instituicao_id: 1,
      id: usuario.id, // Referência ao id do usuário
    });

    console.log('Aluno criado:', aluno.toJSON());

    // Adicionando uma empresa
    const empresa = await Empresa.create({
      nome_fantasia: 'Empresa Exemplo',
      cnpj: '12.345.678/0001-90',
      id: usuario.id, // Referência ao id do usuário
    });

    console.log('Empresa criada:', empresa.toJSON());

    // Adicionando um professor
    const professor = await Professor.create({
      cpf: '123.456.789-00',
      nome: 'Professor Exemplo',
      materia: 'Matemática',
      instituicao_id: instituicao.id, // Referência à instituição de ensino
      id: usuario.id, // Referência ao id do usuário
    });

    console.log('Professor criado:', professor.toJSON());

    // Adicionando uma vantagem
    const vantagem = await Vantagem.create({
      nome: 'Vantagem Exemplo',
      desc: 'Descrição da vantagem exemplo',
      foto: 'url_da_foto.jpg',
      preco: 99.99,
      empresa_id: empresa.id, // Referência à empresa
    });

    console.log('Vantagem criada:', vantagem.toJSON());

    // Adicionando uma transação
    const transacao = await Transacao.create({
      tipo: 'compra',
      usuario1: usuario.id, // Referência ao primeiro usuário
      usuario2: usuario.id, // Referência ao segundo usuário (aluno)
      data: new Date(),
      valor: 50.00,
      vantagem_id: vantagem.id, // Referência à vantagem
    });

    console.log('Transação criada:', transacao.toJSON());

  } catch (error) {
    console.error('Erro ao criar as tabelas ou registros:', error);
  } finally {
    // Fecha a conexão com o banco de dados
    await sequelize.close();
  }
}

// Chama a função de teste
testDatabase();