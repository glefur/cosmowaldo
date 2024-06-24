import api from "./api";

export default {

  login: async (password) => {
    const result = await api.post('/admin/user/login', { password });
    return result.data;
  },

}