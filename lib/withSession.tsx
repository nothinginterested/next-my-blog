import {withIronSession} from 'next-iron-session';
import {GetServerSideProps, NextApiHandler} from 'next';

export function    withSession(handler: NextApiHandler | GetServerSideProps) {
    return withIronSession(handler, {
        password: '2dwdedefmwkefi3jfij3ifji3jfijf',
        cookieName: 'blog',
        cookieOptions: {secure: false}
    });
}
