import 'react-native';

import React, {ReactElement} from 'react';
import SignupScreen from '../src/screens/SignupScreen';
import renderer from 'react-test-renderer';

let props;
let component: ReactElement;

function getTempComponent(props) {
  return <SignupScreen {...props} />;
}

beforeAll(() => {
  jest.mock('@react-native-community/async-storage');
});

describe('[Temp] render', () => {
  props = {}; // fill test props
  component = getTempComponent(props);
  it('renders without crashing', () => {
    const renderResult = renderer.create(component);
    const renderedJson = renderResult.toJSON();
    expect(renderedJson).toMatchSnapshot();
    expect(renderedJson).toBeTruthy();
  });
});
