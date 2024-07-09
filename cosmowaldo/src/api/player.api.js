import api from "./api";

export default {

    players: async () => {
        const result = await api.get('/player');
        console.log('Player API called. Result:');
        console.log(result.data);
        return result.data;
    },

    register: async (name) => {
        const result = await api.post('/player', { name });
        return result.data;
    },

    updateScore: async (name, score) => {
      await api.post(`/player/${name}`, { score });
    },

}