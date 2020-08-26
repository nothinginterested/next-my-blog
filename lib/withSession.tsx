import {withIronSession} from 'next-iron-session';
import {GetServerSideProps, NextApiHandler} from 'next';

export function    withSession(handler: NextApiHandler | GetServerSideProps) {
    return withIronSession(handler, {
        password: '&gD~b\\%z9K7,~e~/Hj42?GQ==`P3Q63)',
        cookieName: 'blog',
        cookieOptions: {secure: false}
    });
}
