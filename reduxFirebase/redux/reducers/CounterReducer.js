const initialState = {
  counter: 0,
};
const counter = (state = initialState, action) => {
  switch (action.type) {
    case 'INCREASE':
      return {
        counter: state.counter + 1,
      };
      break;
    case 'DECREASE':
      return {
        counter: state.counter - 1,
      };
      break;

    default:
      return state;
      break;
  }
};

export default counter;
