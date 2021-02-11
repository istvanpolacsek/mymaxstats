import Head from 'next/head';

const HeadMessage = (props) => {
    const message = props.message;

    const title = 'My Stats | ' + message;

    return (
        <>
        <Head>
        <link rel="manifest" href="manifest.json" />
            <meta name="mobile-web-app-capable" content="yes" />
            <meta name="apple-mobile-web-app-capable" content="yes" />
            <meta name="application-name" content="My Stats" />
            <meta name="apple-mobile-web-app-title" content="My Stats" />
            <meta name="theme-color" content="#6c757d" />
            <meta name="msapplication-navbutton-color" content="#6c757d" />
            <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
            <meta name="msapplication-starturl" content="/" />
            <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
            <link rel="icon" type="image/png" sizes="192x192" href="android-icon-192x192.png" />
            <link rel="apple-touch-icon" type="image/jpg" sizes="57x57" href="apple-icon-57x57.jpg"></link>
            <link rel="apple-touch-icon" type="image/jpg" sizes="60x60" href="apple-icon-60x60.jpg"></link>
            <link rel="apple-touch-icon" type="image/jpg" sizes="72x72" href="apple-icon-72x72.jpg"></link>
            <link rel="apple-touch-icon" type="image/jpg" sizes="76x76" href="apple-icon-76x76.jpg"></link>
            <link rel="apple-touch-icon" type="image/jpg" sizes="114x114" href="apple-icon-114x114.jpg"></link>
            <link rel="apple-touch-icon" type="image/jpg" sizes="120x120" href="apple-icon-120x120.jpg"></link>
            <link rel="apple-touch-icon" type="image/jpg" sizes="144x144" href="apple-icon-144x144.jpg"></link>
            <link rel="apple-touch-icon" type="image/jpg" sizes="152x152" href="apple-icon-152x152.jpg"></link>
            <link rel="apple-touch-icon" type="image/jpg" sizes="180x180" href="apple-icon-180x180.jpg"></link>
            <link rel="icon" type="image/png" sizes="16x16" href="favicon-16x16.png"></link>
            <link rel="icon" type="image/png" sizes="32x32" href="favicon-32x32.png"></link>
            <link rel="icon" type="image/png" sizes="96x96" href="favicon-96x96.png"></link>            
            <link rel="icon" type="image/png" sizes="512x512" href="favicon-512x512.png"></link>
            <title>{title}</title>
        </Head>
        </>
    );
}
 
export default HeadMessage