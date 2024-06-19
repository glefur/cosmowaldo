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
    }  
}