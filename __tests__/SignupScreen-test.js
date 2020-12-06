import 'react-native';

import React, {ReactElement} from 'react';
import SignupScreen from '../src/screens/SignupScreen';
import renderer from 'react-test-renderer';
import {shallow, configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({adapter: new Adapter()});
let props;
let component: ReactElement;

function getTempComponent(props) {
  return <SignupScreen {...props} />;
}

beforeAll(() => {
  jest.mock('@react-native-community/async-storage');
});

describe('[Temp] render', () => {
  props = {
    route: {
      params: {
        idToken: 'randomToken',
      },
    },
  }; // fill test props
  const params = {
    idToken: 'randomToken',
  };
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<SignupScreen {...props} />);
    wrapper.setState({params: params});
  });
  it('renders without crashing', () => {
    // const renderResult = renderer.create(component);
    // const renderedJson = renderResult.toJSON();
    expect(wrapper).toMatchSnapshot();
    expect(wrapper).toBeTruthy();
  });
});
