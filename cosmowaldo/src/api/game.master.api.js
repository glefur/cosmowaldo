import api from "./api";

export default {

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

    setActiveSet: async (gameSetName) => {
      await api.post('/admin/game/activeSet', { gameSetName });
      return;
    },

    setActiveStep: async (stepIndex) => {
      await api.post('/admin/game/activeStep', { stepIndex });
      return;
    }


}