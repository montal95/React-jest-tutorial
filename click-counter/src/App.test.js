import React from "react";
import Enzyme, { shallow } from "enzyme";
import EnzymeAdapter from "enzyme-adapter-react-16";
import App from "./App";

Enzyme.configure({ adapter: new EnzymeAdapter() });

//basic test to see if the page renders correctly
test("renders without error", () => {
  const wrapper = shallow(<App />);
  const appComponent = wrapper.find("[data-test='component-app']");
  expect(appComponent.length).toBe(1);
});

test("renders increment button", () => {
  const wrapper = shallow(<App />);
  const appComponent = wrapper.find("[data-test='increment-button']");
  expect(appComponent.length).toBe(1);
});

test("renders counter displays", () => {
  const wrapper = shallow(<App />);
  const appComponent = wrapper.find("[data-test='counter-display']");
  expect(appComponent.length).toBe(1);
});

test("counter starts at 0", () => {});

test("clicking button increments counter display", () => {});
