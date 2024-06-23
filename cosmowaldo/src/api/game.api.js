import api from "./api";

export default {

    status: async () => {
        const result = await api.get('/admin/game/running');
        return result.data.running;
    },

    start: async () => {
        const result = await api.post('/admin/game/start');
        return;
    },

    stop: async () => {
        const result = await api.post('/admin/game/stop');
        return;
    },

    availableSets: async () => {
      const response = await api.get('/admin/game/availablesets');
      return response.data;
    },

    activeSet: async () => {
      const response = await api.get('/admin/game/activeSet');
      return response.data;
    },

    activeStep: async () => {
      const response = await api.get('/admin/game/activeStep');
      return response.data;
    },

    setActiveSet: async (gameSetName) => {
      await api.post('/admin/game/activeSet', { gameSetName });
      return;
    },

    setActiveStep: async (stepIndex) => {
      await api.post('/admin/game/activeStep', { stepIndex });
      return;
    }


}