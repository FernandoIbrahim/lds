import api from "./base";

const userUrl = "/user";

export async function getUser() {
    const { data } = await api.get(userUrl);
    return data;
}
