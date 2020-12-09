import 'react-native';

import React, {ReactElement} from 'react';
import ManageDeliveryScreen from '../src/screens/CourierHome/ManageDeliveryScreen';
import renderer from 'react-test-renderer';

let props;
let component: ReactElement;

function getTempComponent(props) {
  return <ManageDeliveryScreen {...props} />;
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
