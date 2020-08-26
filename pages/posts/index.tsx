import {GetServerSideProps, NextPage} from 'next';
import {UAParser} from 'ua-parser-js';
import {Post} from 'src/entity/Post';
import Link from 'next/link';
import qs from 'query-string';
import {getDatabaseConnection} from '../../lib/getDataBaseConnection';
// import {usePager} from '../../hooks/usePager';

type Props = {
    posts: Post[];
    count: number;
    perPage: number;
    page: number;
    totalPage: number;
}
const PostsIndex: NextPage<Props> = (props) => {
    const {posts, count, page, totalPage} = props;
    // const {pager} = usePager({page, totalPage})
    return (
        <div>
            <h1>文章列表({props.count}) 每页{props.perPage}</h1>
            {posts.map(post =>
                <div>
                    <Link key={post.id} href={`/posts/${post.id}`}>
                        <a>
                            {post.title}
                        </a>
                    </Link>
                </div>
            )}
            <footer>
            </footer>
        </div>
    );
};
export default PostsIndex;

export const getServerSideProps: GetServerSideProps = async (context) => {
    const index = context.req.url.indexOf('?');
    const search = context.req.url.substr(index + 1);
    const query = qs.parse(search);
    const page = parseInt(query.page?.toString()) || 1;
    const connection = await getDatabaseConnection();// 第一次链接能不能用 get
    const perPage = 1;
    const [posts, count] = await connection.manager.findAndCount(Post,
        {skip: (page - 1) * perPage, take: perPage});
    console.log(posts);

    return {
        props: {
            posts: JSON.parse(JSON.stringify(posts)),
            count: count,
            perPage, page,
            totalPage: Math.ceil(count / perPage)
        }
    };
};
