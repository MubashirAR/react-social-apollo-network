import React, { Component } from 'react';

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isError: false
    }
  }
  static getDerivedStateFromError(error) {
    return { isError: true };
  }
  componentDidCatch(error, errorInfo) {
    console.log('An error occured!!!')
    console.error(error);
    console.log(errorInfo);
  }
  render() {
    if (this.state.isError) {
      return <div>An error occured</div>;
    }
    return this.props.children;
  }
}
