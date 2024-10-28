import axios from 'axios';
import Cookies from 'js-cookie';

const BASE_URL = 'http://localhost:3000/alunos';

// Cria uma instância do Axios
const api = axios.create({
    baseURL: BASE_URL,
});


// Função para obter todos os alunos
export const getAllAlunos = () => {
    return api.get('/');
};

// Função para obter um aluno por ID
export const getAlunoById = (id) => {
    return api.get(`/${id}`);
};

// Função para criar um novo aluno
export const createAluno = (alunoData) => {
    return api.post('/', alunoData);
};

// Função para atualizar um aluno existente
export const updateAluno = (id, updatedData) => {
    return api.put(`/${id}`, updatedData);
};

// Função para deletar um aluno
export const deleteAluno = (id) => {
    return api.delete(`/${id}`);
};
