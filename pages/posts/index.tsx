import {GetServerSideProps, GetServerSidePropsContext, NextApiHandler, NextPage} from 'next';
import {UAParser} from 'ua-parser-js';
import {Post} from 'src/entity/Post';
import Link from 'next/link';
import qs from 'query-string';
import {getDatabaseConnection} from '../../lib/getDataBaseConnection';
import {usePager} from '../../hooks/usePager';
import {User} from '../../src/entity/User';
import {withSession} from '../../lib/withSession';
import {useNav} from '../../hooks/useNav';
import dayjs from 'dayjs';

type Props = {
    posts: Post[];
    count: number;
    perPage: number;
    page: number;
    totalPage: number;
}
const PostsIndex: NextPage<Props> = (props) => {
    const nav = useNav();
    const {posts, count, page, totalPage} = props;
    console.log(posts);
    const {pager} = usePager({page, totalPage});
    return (
        <div>
            {nav}
            <div className="posts">
                <div className="posts-content">
                    <header className="posts-header">
                        <h1>Posts</h1>
                    </header>
                    <div className="posts-lists">
                        {posts.map(post =>
                            <div className="posts-single">
                                <p className="posts-single-date"> {dayjs(post.createdAt).format('MMMM DD,YYYY')}</p>
                                <Link key={post.id} href={`/posts/${post.id}`}>

                                    <a>
                                        {post.title}
                                    </a>
                                </Link>
                                <p className="posts-single-author">author: {post.author.username}</p>
                            </div>
                        )}
                    </div>

                    <footer>
                        {pager}
                    </footer>
                </div>
            </div>


            <style jsx>
                {
                    `
        .posts{
        
        margin-top: 1.6rem;

}
      .posts-lists{
               color: #DADADA;
            font-size: 18px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: flex-start;
            margin-top: 3.2rem;
            margin-left: 4.8rem;
            margin-bottom: 1.2rem;
      
      }
      .posts-lists > .posts-single{
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        margin-bottom: 1.2rem;
       
      }
      
      .posts-lists > .posts-single>.posts-single-date{
          margin-right: 1.2rem;
      
      }.posts-lists > .posts-single>.posts-single-author{
          margin-left: 1.2rem;
      
      }
        .posts-content{
             max-width: 60rem;
             width:100%;
             margin:0 auto;

            }
      .posts-header{
           color: #DADADA;
            font-size: 32px;
      }            

`
                }

            </style>
        </div>
    );
};
export default PostsIndex;

export const getServerSideProps: GetServerSideProps = withSession(async (context: GetServerSidePropsContext) => {
    const index = context.req.url.indexOf('?');
    const search = context.req.url.substr(index + 1);
    const query = qs.parse(search);
    const page = parseInt(query.page?.toString()) || 1;
    const connection = await getDatabaseConnection();// 第一次链接能不能用 get
    const perPage = 3;
    const [posts, count] = await connection.manager.findAndCount(Post,
        {
            skip: (page - 1) * perPage, take: perPage, relations: ['author'], order: {
                createdAt: -1
            }
        });

    console.log(posts);
    return {
        props: {
            posts: JSON.parse(JSON.stringify(posts)),
            count: count,
            perPage, page,
            totalPage: Math.ceil(count / perPage)
        }
    };
});
