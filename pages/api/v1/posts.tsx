import {NextApiRequest, NextApiResponse} from 'next';
import {Post} from '../../../src/entity/Post';
import {getDatabaseConnection} from '../../../lib/getDataBaseConnection';
import {withSession} from '../../../lib/withSession';
const fm = require('front-matter')

const Posts = withSession(async (req: NextApiRequest, res: NextApiResponse) => {
        if (req.method === 'POST') {
            const {content}=req.body
            fm(content)
            // const {title, content} = req.body;
            // const post = new Post();
            // post.title = title;
            // post.content = content;
            // const user = req.session.get('currentUser');
            // if(!user){O
            //     res.statusCode=401
            //     res.end()
            //     return
            // }
            // post.author = user;
            // const connection = await getDatabaseConnection();
            // console.log(post);
            // await connection.manager.save(post);
            // res.json(post);
            // console.log(req.body);
            res.end('hhhh')
        }

    }
);

export default Posts
