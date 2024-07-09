import api from "./api";

export default {

    status: async () => {
        const result = await api.get('/game/running');
        return result.data.running;
    },

    activeSet: async () => {
      const response = await api.get('/game/activeSet');
      return response.data;
    },

    activeStep: async () => {
      const response = await api.get('/game/activeStep');
      return response.data;
    },

}