import api from "./base";

const professorUrl = "/professores";

export async function getProfessor(id) {
  const { data } = await api.get(`${professorUrl}/${id}`);
  return data;
}

export async function createProfessor(professor) {
  const { data } = await api.post(professorUrl, professor);
  return data;
}

export async function updateProfessor(id, professor) {
  const { data } = await api.put(`${professorUrl}/${id}`, professor);
  return data;
}

export async function deleteProfessor(id) {
  const { data } = await api.delete(`${professorUrl}/${id}`);
  return data;
}