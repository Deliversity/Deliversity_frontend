import 'react-native';

import React, {ReactElement} from 'react';
import CourierReviewScreen from '../src/screens/OrderManage/CourierReviewScreen';
import {shallow, configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json';
configure({adapter: new Adapter()});
let props;
let component: ReactElement;

beforeAll(() => {
  jest.mock('@react-native-community/async-storage');
});

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
    wrapper = shallow(<CourierReviewScreen {...props} />);
    wrapper.setState({params: params});
  });
  it('renders without crashing', () => {
    // const renderResult = renderer.create(wrapper);
    // const renderedJson = wrapper.toJSON();
    expect(toJson(wrapper)).toMatchSnapshot();
    expect(toJson(wrapper)).toBeTruthy();
  });
});
