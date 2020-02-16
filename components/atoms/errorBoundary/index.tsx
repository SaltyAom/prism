import { Component } from 'react'

class ErrorBoundary extends Component {
    static getDerivedStateFromError(error) {
    }

    componentDidCatch(error, errorInfo) {
    }

    render() {
        return this.props.children
    }
}

export default ErrorBoundary