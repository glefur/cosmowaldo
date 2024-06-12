let game = {
    status: false
};

const start = () => {
    game.status = true;
};

const stop = () => {
    game.status = false;
};

const running = () => game.status;

export default {
    start,
    stop,
    running
}