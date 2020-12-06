import 'react-native';

import React, {ReactElement} from 'react';
import ChangeButton from '../src/components/ChangeButton';
import renderer from 'react-test-renderer';
import configureMockStore from 'redux-mock-store';
import {shallow, configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {Provider} from 'react-redux';
const mockStore = configureMockStore();
let props;
let component: ReactElement;
configure({adapter: new Adapter()});
beforeAll(() => {
  jest.mock('@react-native-community/async-storage');
  // jest.mock('@react-native-firebase');
});

describe('[Temp] render', () => {
  let store;
  props = {
    onPress: jest.fn(),
  }; // fill test props
  beforeEach(() => {
    const initialState = {
      authentication: {user: '사용자'},
    };
    store = mockStore(initialState);
    component = shallow(
      <Provider store={store}>
        <ChangeButton {...props} />
      </Provider>,
    );
  });
  it('renders without crashing', async () => {
    const renderResult = renderer.create(component);
    const renderedJson = renderResult.toJSON();
    expect(renderedJson).toMatchSnapshot();
    expect(renderedJson).toBeTruthy();
  });
  it('button press', () => {
    const renderResult = renderer.create(component);
    const button = renderResult.root.findByProps({testID: 'MyButton'}).props;
    renderer.act(() => button.onPress());
    const text = renderResult.root.findByProps({testID: 'MyText'}).props;
    expect(text.children).toEqual('사용자');
  });
});
