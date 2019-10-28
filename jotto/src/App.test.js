import React from "react";
import Enzyme, { shallow } from "enzyme";
import EnzymeAdapter from "enzyme-adapter-react-16";
import App from "./App";
import { exportAllDeclaration } from "@babel/types";

//configure enzyme to use Enzyme adapter
Enzyme.configure({ adapter: new EnzymeAdapter() });

test("Renders App component without crashing", () => {
  //be sure to import wrapper above
  const wrapper = shallow(<App />);
  //renders the app within the terminal
  //console.log(wrapper.debug());
});
