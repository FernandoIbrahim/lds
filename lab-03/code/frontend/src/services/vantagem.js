import api from "./base";

const vantagemUrl = "/vantagens";

export async function getVantagens() {
  const { data } = await api.get(vantagemUrl);
  return data;
}

