import App from 'next/app'

import "styles/init.styl"

class Next extends App {
	componentDidMount() {
		document.addEventListener("touchstart", () => null, false)

		if (
			"serviceWorker" in navigator &&
			process.env.NODE_ENV === "production" &&
			typeof window !== "undefined"
		)
			window.addEventListener("load", () => {
				navigator.serviceWorker.register(
					"service-worker.js",
					{ scope: "/" }
				)
			})
	}

    render() {
        let { Component, pageProps } = this.props

        return <Component {...pageProps} />
    }
}

export default Next
