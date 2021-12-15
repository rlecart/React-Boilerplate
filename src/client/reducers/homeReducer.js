import { SYNC_HOME_DATA } from '../actions/homeAction.js';

const initialHomeState = {
  owner: undefined,
  profil: { name: '', },
  joinUrl: '',
};

const homeReducer = (state = initialHomeState, action) => {
  let nextState;

  switch (action.type) {
    case SYNC_HOME_DATA:
      nextState = {
        ...state,
        ...action.value
      };
      return nextState;
    default:
      return state;
  }
};

export { homeReducer, initialHomeState };
export default homeReducer;