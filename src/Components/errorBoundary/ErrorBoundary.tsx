import React, { Component } from 'react';
import ErrorMessage from '../errorMessage';

class ErrorBoundary extends Component {
  state = {
    error: false,
  };

  componentDidCatch() {
    this.setState({ error: true });
  }

  render() {
    return this.state.error ? <ErrorMessage /> : this.props.children;
  }
}

export default ErrorBoundary;
