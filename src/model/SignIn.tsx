import {User} from '../entity/User';
import md5 from 'md5';
import {getDatabaseConnection} from '../../lib/getDataBaseConnection';

export class SignIn {
    username: string;
    password: string;
    user: User;

    errors = {username: [] as string[], password: [] as string[]};

    async validate() {
        if (this.username.trim() === '') {
            this.errors.username.push('请填写用户名');
        }
        const connection = await getDatabaseConnection();
        console.log('------------------');
        const user = await connection.manager.findOne(User, {where: {username: this.username}});
        // console.log('1111111111');
        this.user = user;
        console.log(user);
        if (user) {
            if (user.passwordDigest !== md5(this.password)) {
                this.errors.password.push('密码与用户名不匹配');
            }
        } else {
            this.errors.username.push('用户名不存在');
        }

    }

    hasErrors() {
        return !!Object.values(this.errors).find(v => v.length > 0);
    }
}
