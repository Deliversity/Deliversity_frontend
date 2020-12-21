import 'react-native';

import React, {ReactElement} from 'react';
import WriteReviewScreen from '../src/screens/Review/WriteReviewScreen';
import renderer from 'react-test-renderer';
import configureMockStore from 'redux-mock-store';
import {shallow, configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {Provider} from 'react-redux';
import {RenderResult, render, act, fireEvent} from '@testing-library/react-native';
import toJson from 'enzyme-to-json';
const mockStore = configureMockStore();
let props;
let component: ReactElement;
configure({adapter: new Adapter()});
beforeAll(() => {
  jest.mock('@react-native-community/async-storage');
  // jest.mock('@react-native-firebase');
});
let testingLib:RenderResult;
let wrapper;
describe('[Temp] render', () => {
  let store;
  props = {
    route: {
      params: {
        idToken: 'randomToken',
      },
    },
  }; // fill test props
  beforeEach(() => {
    const initialState = {
      authentication: {user: '사용자'},
    };
    
    store = mockStore(initialState);
    component = shallow(
      <Provider store={store}>
        <WriteReviewScreen {...props} />
      </Provider>,
    );
    testingLib=render(component);
  });
  

  describe('interaction', ()=>{
    beforeEach(()=>{
      testingLib=render(component);
    });

    it('sendReivew', ()=>{
      const input=testingLib.getByTestId('textInput')
    
    act(()=>{
      fireEvent.changeText(input,'good');
    })
    const btn=testingLib.queryByTestId('sendReview');
    act(()=>{
      fireEvent.press(btn);
    })
  })
  })
  
});
