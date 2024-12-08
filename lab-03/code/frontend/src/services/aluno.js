import api from "./base";

const alunoUrl = "/alunos";

export async function getAlunos() {
  const { data } = await api.get(alunoUrl);
  return data;
}

export async function getAluno(id) {
  const { data } = await api.get(`${alunoUrl}/${id}`);
  return data;
}

export async function createAluno(aluno) {
  const { data } = await api.post(alunoUrl, aluno);
  return data;
}

export async function updateAluno(id, aluno) {
  const { data } = await api.put(`${alunoUrl}/${id}`, aluno);
  return data;
}

export async function deleteAluno(id) {
  const { data } = await api.delete(`${alunoUrl}/${id}`);
  return data;
}