import Document, { Html, Head, Main, NextScript } from 'next/document'

class MusicPlayerDocument extends Document {
    render() {
        return (
            <Html>
                <Head>
                    <meta name="title" content="Prism" />
                    <meta name="description" content="Progressive Web App as Music Player." />
                    <meta name="author" content="SaltyAom" />
                    <link rel="icon" href="/images/dokodayo.png" />
                    <link rel="shortcut icon" href="/images/dokodayo.png" />

                    <meta property="og:title" content="Prism" />
                    <meta
                        property="og:description"
                        content="Progressive Web App as Music Player."
                    />
                    <meta property="article:author" content="SaltyAom" />
                    <meta property="og:site_name" content="Prism" />
                    <meta
                        property="og:image"
                        content="Open graph image, absolute web path to image"
                    />
                    <meta property="og:image:width" content="512" />
                    <meta property="og:image:height" content="512" />
                    <meta property="og:locale" content="en_US" />
                    <meta property="og:type" content="website" />

                    <meta name="twitter:card" content="summary_large_image" />
                    <meta
                        name="twitter:title"
                        content="Prism"
                    />
                    <meta
                        name="twitter:description"
                        content="Progressive Web App as Music Player."
                    />
                    <meta name="twitter:site" content="@SaltyAom" />
                    <meta
                        name="twitter:image"
                        content="Absoulute web path to image"
                    />
                    <meta
                        name="twitter:creator"
                        content="@yourtwitteraccount"
                    />

                    <link rel="manifest" href="/manifest.json" />
                    <meta name="mobile-web-app-capable" content="yes" />

                    <meta name="application-name" content="Prism" />
                    <meta name="mssmarttagspreventparsing" content="true" />
                    <meta
                        name="msapplication-window"
                        content="width=1366;height=768"
                    />
                    <meta
                        name="msapplication-tooltip"
                        content="Progressive Web App as Music Player."
                    />

                    <meta name="apple-mobile-web-app-capable" content="yes" />
                    <meta
                        name="apple-mobile-web-app-title"
                        content="Prism"
                    />
                    <link
                        rel="apple-touch-icon"
                        href="/images/dokodayo.png"
                    />
                    <meta
                        name="apple-mobile-web-app-status-bar-style"
                        content="black-translucent"
                    />
                    <meta name="format-detection" content="telephone=no" />
                    <meta name="apple-touch-fullscreen" content="yes" />
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        )
    }
}

export default MusicPlayerDocument
