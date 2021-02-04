import Head from 'next/head';

const HeadMessage = (props) => {
    const message = props.message;

    const title = 'My Stats | ' + message;

    return (
        <>
        <Head>
            <title>{title}</title>
        </Head>
        </>
    );
}
 
export default HeadMessage