// test.js
const sequelize = require('./config/sequelize');
const Usuario = require('./models/usuario/usuario.sequelize');
const Aluno = require('./models/usuario/aluno/aluno.sequelize');
const Professor = require('./models/usuario/professor.sequelize'); // Ajuste o caminho se necessário
const Empresa = require('./models/usuario/empresa/empresa.sequelize');
const InstituicaoEnsino = require('./models/instituicao-ensino/instituicao-ensino.sequelize');
const Vantagem = require('./models/vantagem/vantagem.sequelize');
const Transacao = require('./models/transacao/transacao.sequelize');

async function testDatabase() {
  try {
    await sequelize.sync({ force: true });
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
      endereco: 'Rua de Exemplo, 123',
      curso: 'Curso de Exemplo',
      instituicao_id: instituicao.id, // Usando o ID da instituição criada
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
    console.error('Erro ao criar as tabelas ou registros:', error.message);
    console.error(error.stack);
  } finally {
    await sequelize.close();
  }
}

testDatabase();
