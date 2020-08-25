import {NextApiHandler} from 'next';
import {getDatabaseConnection} from 'lib/getDataBaseConnection';
import {User} from '../../../src/entity/User';
import {useEffect} from 'react';
import md5 from 'md5';

const Users: NextApiHandler = async (req, res) => {
    const {username, password, passwordConfirmation} = req.body;
    const connection = await getDatabaseConnection();// 第一次链接能不能用 get
    res.setHeader('Content-Type', 'application/json; charset=utf-8');

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
};

export default Users;
