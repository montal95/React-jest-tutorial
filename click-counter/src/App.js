import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      counter: 0,
      error: false
    };

    //Binding the functions since they change the state
    this.decrementCounter = this.decrementCounter.bind(this);
  }

  decrementCounter = () => {
    this.state.counter === 0
      ? this.setState({ error: true })
      : this.setState({ counter: this.state.counter - 1 });
  };

  incrementCounter = () => {
    if (this.state.error) {
      this.setState({
        error: false
      });
    }
    this.setState({
      counter: this.state.counter + 1
    });
  };

  render() {
    let errorClass = this.state.error ? "" : "hidden";

    return (
      <div className="App" data-test="component-app">
        <h1 data-test="counter-display">
          The counter is currently {this.state.counter}
        </h1>
        <h2 data-test="error-display" className={`error ${errorClass}`}>
          Counter can not go below 0
        </h2>
        <button data-test="increment-button" onClick={this.incrementCounter}>
          Increment counter
        </button>
        <button data-test="decrement-button" onClick={this.decrementCounter}>
          Decrement counter
        </button>
      </div>
    );
  }
}

export default App;
