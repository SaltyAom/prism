import { Fragment } from 'react'

import App from 'next/app'
import Head from 'next/head'

import 'styles/init.styl'

class Next extends App {
    componentDidMount() {
        document.addEventListener('touchstart', () => null, false)

        if (
            'serviceWorker' in navigator &&
            process.env.NODE_ENV === 'production' &&
            typeof window !== 'undefined'
        )
            window.addEventListener('load', () => {
                navigator.serviceWorker.register('service-worker.js', {
                    scope: '/',
                })
            })
    }

    render() {
        let { Component, pageProps } = this.props

        return (
            <Fragment>
                <Head>
                    <meta
                        name="viewport"
                        content="width=device-width, initial-scale=1.0, viewport-fit=cover"
                    />
                </Head>
                <Component {...pageProps} />
            </Fragment>
        )
    }
}

export default Next
