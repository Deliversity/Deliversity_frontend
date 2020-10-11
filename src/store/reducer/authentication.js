import {
  AUTH_SIGNIN,
  AUTH_SIGNIN_SUCCESS,
  AUTH_SIGNIN_FAILURE,
  AUTH_SIGNOUT,
} from '../actions/type';

const initialState = {
  signIn: {
    status: 'INIT',
  },
  token: null,
};
const authentication = (state = initialState, action) => {
  switch (action.type) {
    case AUTH_SIGNIN:
      return {
        ...state,
        signIn: {
          status: 'WAITING',
        },
      };
    case AUTH_SIGNIN_SUCCESS:
      return {
        ...state,
        signIn: {
          status: 'SUCCESS',
        },
      };
    case AUTH_SIGNIN_FAILURE:
      return {
        ...state,
        signIn: {
          status: 'FAILURE',
        },
      };
    case AUTH_SIGNOUT:
      return {
        ...initialState,
      };
    default:
      return state;
  }
}

export default authentication;
