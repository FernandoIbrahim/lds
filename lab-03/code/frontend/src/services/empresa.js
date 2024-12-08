import api from "./base";

const empresaUrl = "/empresas";

export async function getEmpresas() {
  const { data } = await api.get(empresaUrl);
  return data;
}

export async function getEmpresa(id) {
  const { data } = await api.get(`${empresaUrl}/${id}`);
  return data;
}

export async function createEmpresa(empresa) {
  const { data } = await api.post(empresaUrl, empresa);
  return data;
}

export async function updateEmpresa(id, empresa) {
  const { data } = await api.put(`${empresaUrl}/${id}`, empresa);
  return data;
}

export async function deleteEmpresa(id) {
  const { data } = await api.delete(`${empresaUrl}/${id}`);
  return data;
}
