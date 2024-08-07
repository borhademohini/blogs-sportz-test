import React from "react";
import '../assets/css/error.css';

class ErrorBoundary extends React.Component {

  constructor(props) {
    super(props);
    this.state = { error: null, errorInfo: null };
  }

  // This method is called if any error is encountered
  componentDidCatch(error, errorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo
    })

    // You can also log error messages to an error
    // reporting service here
  }

  // This will render this component wherever called
  render() {
    if (this.state.errorInfo) {

      // Error path
      return (
        <div>
                    <div class="error-container">
                        <h1> Something went wrong! </h1>
                        <p>
                            Oops! The page you're
                            looking for is not working.
                        </p>
                        <a href="/">Go Back to Home</a>
                    </div>
                </div>
      );
    }
    // Normally, just render children, i.e. in 
    // case no error is Found
    return this.props.children;
  }
}

export default ErrorBoundary;