import {NextApiHandler} from 'next';
import {getDatabaseConnection} from 'lib/getDataBaseConnection';
import {User} from '../../../src/entity/User';
import {useEffect} from 'react';
import md5 from 'md5';
import {withSession} from '../../../lib/withSession';

const Users: NextApiHandler = withSession(async (req, res) => {
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    if (req.method === 'GET') {
        const curUser = (req as any).session.get('currentUser') || '' ;


        res.write(JSON.stringify({username:curUser.username}));
        res.statusCode=200
        res.end();
    }else {
        const {username, password, passwordConfirmation} = req.body;
        const connection = await getDatabaseConnection();// 第一次链接能不能用 get

        const user = new User();
        user.username = username.trim();
        user.password = password;
        user.passwordConfirmation = passwordConfirmation;
        await user.validate();
        if (user.hasErrors()) {
            res.statusCode = 422;
            res.write(JSON.stringify(user.errors));
        } else {
            await connection.manager.save(user);
            res.statusCode = 200;
            res.write(JSON.stringify(user));
        }
        res.end();
    }


});

export default Users;
