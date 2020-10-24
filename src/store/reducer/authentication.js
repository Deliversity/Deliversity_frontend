import {
  LOGIN,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT,
  USER_CHANGE,
} from '../actions/type';

const initialState = {
  signIn: {
    status: 'INIT',
  },
  user: '사용자',
  token: null,
};
const authentication = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        signIn: {
          status: 'WAITING',
        },
        token: action.token,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        signIn: {
          status: 'SUCCESS',
        },
        token: action.token,
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        signIn: {
          status: 'FAILURE',
        },
      };
    case LOGOUT:
      return {
        ...initialState,
        token: null,
      };
    case USER_CHANGE:
      return {
        ...state,
        user: action.data,
      };
    default:
      return state;
  }
};

export default authentication;
