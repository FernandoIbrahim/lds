// src/App.jsx

import { Routes, Route } from 'react-router-dom';
import './App.css';

// PÁGINAS
import LoginPage from './pages/CadastroPage';
import CadastroAluno from './pages/Cadastro-Aluno/CadastroAluno';
import HomePage from './pages/PaginaInicial/HomePage';
import EmpresaList from './pages/Empresas/EmpresaList';
import AlunoList from './pages/Alunos/AlunosList';
import EditarDadosAluno from './pages/Alunos/EditarDadosAluno';
import Login from './pages/Login';

// COMPONENTE
import Navbar from './components/NavBar';

// IMPORTANDO O UserProvider
import { UserProvider } from './hooks/UserContext'; // Ajuste o caminho conforme necessário
import CadastroEmpresa from './pages/Cadastro-Empresa/CadastroEmpresa';
import EditarDadosEmpresa from './pages/Empresas/EditarDadosEmpresa';
import VantagensList from './pages/Vantagens/VantagensList';
import CadastroProfessor from './pages/Cadastro-Professor/CadastroProfessor';
import ListaTransacoes from './pages/Transacoes/ListaTransacoes';
import EditarDadosProfessor from './pages/Professores/EditarDadosProfessor';
import DetalhesTransacao from './pages/Transacoes/DetalhesTransacao';

function App() {
  return (
    <UserProvider> {/* Envolvendo a aplicação com o UserProvider */}
      <div>
        <Navbar /> {/* Incluindo a Navbar */}
        <Routes>
          {/* Rota pública: Login */}
          <Route path="/" element={<LoginPage />} />
          <Route path="/login" element={<Login/>}/>
          <Route path='/cadastro-aluno' element={<CadastroAluno />} />
          <Route path='/cadastro-empresa' element={<CadastroEmpresa />} />
          <Route path='/cadastro-professor' element={<CadastroProfessor/>}></Route>
          <Route path='/pagina-inicial' element={<HomePage />} />
          <Route path='/listar-empresas' element={<EmpresaList />} />
          <Route path='/listar-alunos' element={<AlunoList />} />
          <Route path='/editar-alunos/:id' element={<EditarDadosAluno />} />
          <Route path='/editar-empresas/:id' element={<EditarDadosEmpresa />} />
          <Route path='/editar-professores/:id' element={<EditarDadosProfessor/>}/>
          <Route path='/listar-vantagens' element={<VantagensList/>}/>
          <Route path='/extrato' element={<ListaTransacoes/>}></Route>
          <Route path='/extrato/:id' element={<DetalhesTransacao/>}></Route>


        </Routes>
      </div>
    </UserProvider>
  );
}

export default App;
