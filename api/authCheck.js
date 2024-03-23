import { CheckPing, getCookieValue } from './ApiWrapper';

export async function getServerSideProps(context) {
    const key = getCookieValue('key', context.req);
    if (!key) {
        return {
            redirect: {
                destination: '/',
                permanent: false,
            },
        };
    }

    const pingOk = await CheckPing(key);
    if (!pingOk) {
        return {
            redirect: {
                destination: '/',
                permanent: false,
            },
        };
    }

    return { props: {} };
}
