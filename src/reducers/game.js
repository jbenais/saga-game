const defaultState = {
  lives: 3,
  score: 0,
  isStarted: false
};

const game = (state = defaultState, action) => {
  switch (action.type) {
    case 'GAME_START':
      return {
        ...defaultState,
        isStarted: true
      };
    case 'LOOSE_LIVE':
      return {
        ...state,
        lives: state.lives - 1
      }
    case 'INCREMENT_SCORE':
      return {
        ...state,
        score: state.score + 1
      }
    case 'GAME_END':
      return {
        ...state,
        isStarted: false
      }
    default:
      return state;
  }
};

export default game;
