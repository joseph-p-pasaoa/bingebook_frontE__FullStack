/*
Joseph P. Pasaoa
Error Boundary Component | Bingebook (a full-stack binge-facilitating app)
*/


/* EXTERNAL */
import React, { Component } from 'react';


/* MAIN */
class ErrorBoundary extends Component {
  state = {
    hasError: false
  };

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    console.log(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return <h1>Something went wrong.</h1>;
    }

    return this.props.children; 
  }
}


export default ErrorBoundary;