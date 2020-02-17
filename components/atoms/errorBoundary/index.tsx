import { PureComponent, ReactNode } from 'react'

class ErrorBoundary extends PureComponent<{ children: ReactNode }> {
    static getDerivedStateFromError(error) {
        // console.log(error)
    }

    componentDidCatch(error, errorInfo) {
        // console.log(error, errorInfo)
    }

    render() {
        return this.props.children
    }
}

export default ErrorBoundary