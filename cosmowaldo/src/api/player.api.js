import api from "./api";

export default {

    players: async () => {
        const result = await api.get('/player');
        return result.data;
    },

    register: async (name) => {
        const result = await api.post('/player', { name });
        return result.data;
    },

}