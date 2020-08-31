import React from 'react';
import {GetServerSideProps, NextPage} from 'next';
import {Post} from '../../src/entity/Post';
import {getDatabaseConnection} from '../../lib/getDataBaseConnection';
import {useNav} from '../../hooks/useNav';
import ReactMarkdown from 'react-markdown';

type Props = {
    post: Post
}
const postsShow: NextPage<Props> = (props) => {
    const {post} = props;
    const nav = useNav();

    return (
        <>
            {nav}
            <div className="article-wrapper">
                <article className="article markdown-body">
                    <h1>{post.title}</h1>
                    <article className='markdown-body ' >
                        <ReactMarkdown source={post.content} escapeHtml={true} />
                    </article>
                </article>
            </div>

            <style jsx>
                {`
 .markdown-body{
      color: #DADADA!important;
              
              } 
          .article-wrapper{
              height: 100vh;
              max-width: 60rem;
              margin: 0 auto;
              padding: 0 2em 0 2em;
          }
            .article{
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: flex-start;
               color: #DADADA;

            }
            .article > h1 {
               font-size: 32px;
               margin-bottom: 1.2rem;
              
            }
                
                `}
            </style>
        </>
    );
};

export default postsShow;

export const getServerSideProps: GetServerSideProps<any, { id: string }> = async (context) => {
    const connection = await getDatabaseConnection();
    const post = await connection.manager.findOne(Post, context.params.id);
    return {
        props: {
            post: JSON.parse(JSON.stringify(post))
        }
    };
};
