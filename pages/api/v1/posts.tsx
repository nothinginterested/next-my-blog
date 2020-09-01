import {NextApiRequest, NextApiResponse} from 'next';
import {Post} from '../../../src/entity/Post';
import {getDatabaseConnection} from '../../../lib/getDataBaseConnection';
import {withSession} from '../../../lib/withSession';
const fm = require('front-matter')

const Posts = withSession(async (req: NextApiRequest, res: NextApiResponse) => {
        if (req.method === 'POST') {
            const {content}=req.body
            const article=fm(content)
            const {body,attributes}=article
            const post = new Post();
            post.title = attributes.title;
            post.content = body;
            const user = req.session.get('currentUser');
            if(!user){
                res.statusCode=401
                res.end()
                return
            }
            post.author = user;
            const connection = await getDatabaseConnection();
            await connection.manager.save(post);
            res.json(post);
            res.end()
        }

    }
);

export default Posts
