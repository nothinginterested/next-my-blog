import {NextApiRequest, NextApiResponse} from 'next';

import getPosts from 'lib/posts';


const Posts = (req: NextApiRequest, res: NextApiResponse) => {
    getPosts();
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.write(JSON.stringify({name: 'lzz'}));
    res.end();
};

export default Posts;
