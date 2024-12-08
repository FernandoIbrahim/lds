import api from "./base";

const transacaoUrl = "/transacao";

export async function getTransacoes() {
  const { data } = await api.get(transacaoUrl);
  return data;
}

export async function getTransacao(id) {
  const { data } = await api.get(`${transacaoUrl}/${id}`);
  return data;
}

export async function createTransacao(transacao) {
  const { data } = await api.post(transacaoUrl, transacao);
  return data;
}
