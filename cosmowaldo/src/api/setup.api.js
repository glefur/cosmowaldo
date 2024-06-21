import api from "./api";

export default {
  initializeStep: async (payload) => {
    const result = await api.post('/admin/initialize/step', payload);
    return result.data;
  }
}