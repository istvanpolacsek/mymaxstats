import Head from 'next/head';

const HeadMessage = (props) => {
    const message = props.message;

    const title = 'My Stats | ' + message;

    return (
        <>
        <Head>
            <link rel="manifest" href="manifest.json" />
            <meta name="application-name" content="My Stats" />
            <meta name="theme-color" content="#6c757d" />
            <meta name="apple-mobile-web-app-capable" content="yes" />
            <meta name="apple-mobile-web-app-title" content="My Stats" />
            <meta name="apple-mobile-web-app-status-bar-style" content="black" />
            <meta name="mobile-web-app-capable" content="yes" />
            <meta name="msapplication-navbutton-color" content="#6c757d" />
            <meta name="msapplication-starturl" content="/" />
            <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
            <link rel="icon" type="image/png" sizes="192x192" href="android-icon-192x192.png" />
            <link rel="apple-touch-icon" type="image/png" sizes="57x57" href="apple-icon-57x57.png" />
            <link rel="apple-touch-icon" type="image/png" sizes="60x60" href="apple-icon-60x60.png" />
            <link rel="apple-touch-icon" type="image/png" sizes="72x72" href="apple-icon-72x72.png" />
            <link rel="apple-touch-icon" type="image/png" sizes="76x76" href="apple-icon-76x76.png" />
            <link rel="apple-touch-icon" type="image/png" sizes="114x114" href="apple-icon-114x114.png" />
            <link rel="apple-touch-icon" type="image/png" sizes="120x120" href="apple-icon-120x120.png" />
            <link rel="apple-touch-icon" type="image/png" sizes="144x144" href="apple-icon-144x144.png" />
            <link rel="apple-touch-icon" type="image/png" sizes="152x152" href="apple-icon-152x152.png" />
            <link rel="apple-touch-icon" type="image/png" sizes="180x180" href="apple-icon-180x180.png" />
            <link href="apple-splash-iphone5.png" media="(device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2)" rel="apple-touch-startup-image" />
            <link href="apple-splash-iphone6.png" media="(device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2)" rel="apple-touch-startup-image" />
            <link href="apple-splash-iphoneplus.png" media="(device-width: 621px) and (device-height: 1104px) and (-webkit-device-pixel-ratio: 3)" rel="apple-touch-startup-image" />
            <link href="apple-splash-iphonex.png" media="(device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3)" rel="apple-touch-startup-image" />
            <link href="apple-splash-iphonexr.png" media="(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2)" rel="apple-touch-startup-image" />
            <link href="apple-splash-iphonexsmax.png" media="(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3)" rel="apple-touch-startup-image" />            
            <link rel="icon" type="image/png" sizes="16x16" href="favicon-16x16.png" />
            <link rel="icon" type="image/png" sizes="32x32" href="favicon-32x32.png" />
            <link rel="icon" type="image/png" sizes="96x96" href="favicon-96x96.png" />
            <link rel="icon" type="image/png" sizes="512x512" href="favicon-512x512.png" />
            <title>{title}</title>
        </Head>
        </>
    );
}
 
export default HeadMessage