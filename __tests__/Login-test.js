import React from "react";
import LoginScreen from "../src/screens/Auth/LoginScreen";
import { render } from "@testing-library/react-native";
import AsyncStorage from '@react-native-community/async-storage';
let props;
let component;

function getTempComponent(props) {
  return <LoginScreen {...props} />;
}

describe("[App] render", () => {
  props = {}; // fill test props
  component = getTempComponent(props);
  test("renders without crashing", () => {
    const rendered = render(component);
    expect(rendered).toMatchSnapshot();
    expect(rendered).toBeTruthy();
  });
});
