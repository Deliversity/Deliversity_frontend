import 'react-native';

import React, {ReactElement} from 'react';
import LoginScreen from '../src/screens/Auth/LoginScreen';
import renderer from 'react-test-renderer';
let props;
let component: ReactElement;

beforeAll(() => {
  jest.mock('@react-native-community/async-storage');
  jest.mock('@react-native/google_signin', () => {});
});

function getTempComponent(props) {
    return <LoginScreen {...props} />;
}
let findById = function (tree, testID) {
  if (tree.props && tree.props.testID === testID) {
    return tree;
  }
  if (tree.children && tree.children.length > 0) {
    let childs = tree.children;
    for (let i = 0; i < childs.length; i++) {
      let item = findById(childs[i], testID);
      if (typeof item !== 'undefined') {
        return item;
      }
    }
  }
};


describe('Login render', () => {
  props = {}; // fill test props
  component = getTempComponent(props);
  console.log('in');
  it('renders without crashing', () => {
    const renderResult = renderer.create(component);
    const renderedJson = renderResult.toJSON();
    expect(renderedJson).toMatchSnapshot();
    expect(renderedJson).toBeTruthy();
  });
});
