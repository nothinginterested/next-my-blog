import {NextApiHandler} from 'next';
import {withSession} from '../../../lib/withSession';
import {SignIn} from '../../../src/model/SignIn';

const Sessions: NextApiHandler = async (req, res) => {
    const {username, password} = req.body;
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    const signIn = new SignIn();
    signIn.username = username;
    signIn.password = password;
    await signIn.validate();
    console.log(signIn.hasErrors());
    console.log('signIn.hasErrors()');
    if (signIn.hasErrors()) {
        res.statusCode = 422;
        res.end(JSON.stringify(signIn.errors));
    } else {
        req.session.set('currentUser', signIn.user);
        await req.session.save()
        res.statusCode = 200;
        res.end(JSON.stringify(signIn.user));
    }

    // res.end('hhhhh')

};

export default withSession( Sessions)
