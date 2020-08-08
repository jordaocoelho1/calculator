import React, { Component } from "react";
import "./calculator.css";

import Button from "../components/button";
import Display from "../components/display";

const bombril = {
  displayValue: "0",
  clearDisplay: false,
  operation: null,
  values: [0, 0],
  current: 0,
};

export default class calculator extends Component {
  state = { ...bombril };
  constructor(props) {
    super(props);
    this.apagarMemoria = this.apagarMemoria.bind(this);
    this.escolhendoOperation = this.escolhendoOperation.bind(this);
    this.adicionandoDigito = this.adicionandoDigito.bind(this);
  }
  apagarMemoria() {
    this.setState({ ...bombril });
  }

  escolhendoOperation(operation) {
    if (this.state.current === 0) {
      this.setState({ operation, current: 1, clearDisplay: true });
    } else {
      const equals = operation === "=";
      const currentOperation = this.state.operation;

      const values = [...this.state.values];
      try {
        values[0] = eval(`${values[0]} ${currentOperation} ${values[1]}`);
      } catch (e) {
        values[0] = this.state.values[0];
      }

      values[1] = 0;

      this.setState({
        displayValue: values[0],
        operation: equals ? null : operation,
        current: equals ? 0 : 1,
        clearDisplay: !equals,
        values,
      });
    }
  }

  adicionandoDigito(n) {
    if (n === "." && this.state.displayValue.includes(".")) {
      return;
    }
    const clearDisplay =
      this.state.displayValue === "0" || this.state.clearDisplay;
    const currentValue = clearDisplay ? "" : this.state.displayValue;
    const displayValue = currentValue + n;
    this.setState({ displayValue, clearDisplay: false });

    if (n !== ".") {
      const i = this.state.current;
      const novoValor = parseFloat(displayValue);
      const values = [...this.state.values];
      values[i] = novoValor;
      this.setState({ values });
    }
  }

  render() {
    return (
      <div className="Calculator">
        <Display value={this.state.displayValue} />
        <Button label="AC" click={this.apagarMemoria} triple />
        <Button label="/" click={this.escolhendoOperation} operation />
        <Button label="7" click={this.adicionandoDigito} />
        <Button label="8" click={this.adicionandoDigito} />
        <Button label="9" click={this.adicionandoDigito} />
        <Button label="*" click={this.escolhendoOperation} operation />
        <Button label="4" click={this.adicionandoDigito} />
        <Button label="5" click={this.adicionandoDigito} />
        <Button label="6" click={this.adicionandoDigito} />
        <Button label="-" click={this.escolhendoOperation} operation />
        <Button label="1" click={this.adicionandoDigito} />
        <Button label="2" click={this.adicionandoDigito} />
        <Button label="3" click={this.adicionandoDigito} />
        <Button label="+" click={this.escolhendoOperation} operation />
        <Button label="0" click={this.adicionandoDigito} double />
        <Button label="." click={this.adicionandoDigito} />
        <Button label="=" click={this.escolhendoOperation} operation />
      </div>
    );
  }
}
