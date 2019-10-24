import React from "react";
import Enzyme, { shallow } from "enzyme";
import EnzymeAdapter from "enzyme-adapter-react-16";
import App from "./App";

Enzyme.configure({ adapter: new EnzymeAdapter() });

/** *
 * Factory function to create a ShallowWrapper for the App component
 * @function Setup
 * @param {object} props - component props specific to this setups
 * @param {object} state - Initial state for the setup
 * @returns {ShallowWrapper}
 **/
const setup = (props = {}, state = null) => {
  const wrapper = shallow(<App {...props} />);
  if (state) wrapper.setState(state);
  return wrapper;
};

/**
 * Return ShallowWrapper containing node(s) with the given data-test value
 * @param {ShallowWrapper} wrapper - Enzyme shallow wrapper to search within
 * @param {string} val - value of the data-test attribute for search
 * @returns {ShallowWrapper}
 **/
const findByTestAttr = (wrapper, val) => {
  return wrapper.find(`[data-test="${val}"]`);
};

//basic test to see if the page renders correctly
test("renders without error", () => {
  const wrapper = setup();
  const appComponent = findByTestAttr(wrapper, "component-app");
  expect(appComponent.length).toBe(1);
});

test("renders increment button", () => {
  const wrapper = setup();
  const button = findByTestAttr(wrapper, "increment-button");
  expect(button.length).toBe(1);
});

test("renders counter displays", () => {
  const wrapper = setup();
  const counterDisplay = findByTestAttr(wrapper, "counter-display");
  expect(counterDisplay.length).toBe(1);
});

test("counter starts at 0", () => {
  const wrapper = setup();
  const initialCounterState = wrapper.state("counter");
  expect(initialCounterState).toBe(0);
});

test("clicking button increments counter display", () => {
  //start initial state as 7 and plug into wrapper
  const counter = 7;
  const wrapper = setup(null, { counter });

  //find button and click
  const button = findByTestAttr(wrapper, "increment-button");
  button.simulate("click");

  //find display and test value
  const counterDisplay = findByTestAttr(wrapper, "counter-display");
  expect(counterDisplay.text()).toContain(counter + 1);
});

//test to see if decrement button rendered
test("renders decrement button", () => {
  const wrapper = setup();
  const button = findByTestAttr(wrapper, "decrement-button");
  expect(button.length).toBe(1);
});

test("clicking the button decrements counter display", () => {
  //start initial state as 6 and plugs this state into the wrapper
  const counter = 6;
  const wrapper = setup(null, { counter });

  //find button and click
  const button = findByTestAttr(wrapper, "decrement-button");
  button.simulate("click");

  //find display and test value
  const counterDisplay = findByTestAttr(wrapper, "counter-display");
  expect(counterDisplay.text()).toContain(counter - 1);
});

test("clicking decrement button will not go lower than 0", () => {
  //start initial state as 0 and plugs this into the wrapper
  const counter = 0;
  const wrapper = setup(null, { counter });

  //find and click decrement button
  const button = findByTestAttr(wrapper, "decrement-button");
  button.simulate("click");

  //find and display test value
  const counterDisplay = findByTestAttr(wrapper, 'counter-display');
  expect(counterDisplay.text()).toContain(0);
});

test("clicking decrement at 0 will show error", () => {
  //start initial state as 0 and plugs this into the wrapper
  const counter = 0;
  const wrapper = setup(null, { counter });

  //find and click decrement button
  const button = findByTestAttr(wrapper, "decrement-button");
  button.simulate("click");

  //error message displayed after click
  const errorDisplay = findByTestAttr(wrapper, 'error-display');
  const hasErrorClass = errorDisplay.hasClass('hidden');
  expect (hasErrorClass).toBe(false);
});

test('clicking increment after error will remove error message', ()=>{
  //start initial state as 0 and plugs this into the wrapper
  const counter = 0;
  const wrapper = setup(null, { counter });

  //find and click decrement button
  const decButton = findByTestAttr(wrapper, "decrement-button");
  decButton.simulate("click");

  //find and click increment button
  const incButton = findByTestAttr(wrapper, 'increment-button');
  incButton.simulate('click');
  
//error message displayed after click
  const errorDisplay = findByTestAttr(wrapper, 'error-display');
  const hasErrorClass = errorDisplay.hasClass('hidden');
  expect (hasErrorClass).toBe(true);
})