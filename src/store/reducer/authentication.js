import {
  LOGIN,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT,
  USER_CHANGE,
  ADDRESS_CHANGE,
  CURRENT_RELATION,
} from '../actions/type';

const initialState = {
  signIn: {
    status: 'INIT',
  },
  user: '사용자',
  token: null,
  name: '',
  grade: '',
  address: '',
  id: '',
  nickName: '',
  owner: '',
  guest: '',
  orderNum: '',
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
        name: action.name,
        grade: action.grade,
        id: action.id,
        nickName: action.nickName
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
    case ADDRESS_CHANGE:
      return {
        ...state,
        address: action.data,
      };
    case CURRENT_RELATION:
      return {
        ...state,
        owner: action.owner,
        guest: action.guest,
        orderNum: action.orderNum,
      };
    default:
      return state;
  }
};

export default authentication;
