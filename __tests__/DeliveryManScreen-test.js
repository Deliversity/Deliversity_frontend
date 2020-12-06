import 'react-native';

import React, {ReactElement} from 'react';
import DeliveryManScreen from '../src/screens/DeliveryManScreen';
import {shallow, configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json';
configure({adapter: new Adapter()});
let props;
let component: ReactElement;
jest.mock('react-native-sqlite-storage', () => ({
  DEBUG: jest.fn,
  enablePromise: jest.fn(),
  openDatabase: (...args) => {
    return {
      transaction: (...args) =>
        Promise.resolve({
          executeSql: (query) => {
            return Promise.resolve([]);
          },
        }),
      cleanDb: () => Promise.resolve(),
      executeSql: (query) => {
        return Promise.resolve([]);
      },
    };
  },
}));
beforeAll(() => {});

describe('[Temp] render', () => {
  props = {
    route: {
      params: {
        orderID: '1',
      },
    },
  }; // fill test props
  const params = {};
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<DeliveryManScreen {...props} />);
    wrapper.setState({params: params});
    wrapper.find('react-native-sqlite-storage');
  });
  it('renders without crashing', () => {
    // const renderResult = renderer.create(wrapper);
    // const renderedJson = wrapper.toJSON();
    expect(toJson(wrapper)).toMatchSnapshot();
    expect(toJson(wrapper)).toBeTruthy();
  });
});
