import {GetServerSideProps, GetServerSidePropsContext, NextPage} from 'next';
import Link from 'next/link';
import {withSession} from '../lib/withSession';
import {useEffect} from 'react';
import axios, {AxiosError, AxiosResponse} from 'axios';
import {useNav} from '../hooks/useNav';
type props = {
    useName : string

}


const Home: NextPage<props> = (props) => {
  const nav=useNav()

    const {useName} = props;
    console.log(useName);
    return (
        <>
            {nav}
            <div className="cover">
                {/*<img src="/logo.png" alt=""/>*/}
                <h1>梁兆璋</h1>
                <p >致力于成为全栈的前端工程师</p>
                <p><Link href="/posts"><a>文章列表</a></Link></p>
            </div>
            <style jsx>{`
       
      .cover{
        height: 100vh;
        display:flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        background: #212121;
        color: #DADADA;
        font-size: 48px;
        margin-bottom: 3.2rem;
      }
      .cover > h1{
        margin-bottom: 16px;
      }
      .cover >p {
        font-size: 24px;
        margin-top: 1.2rem;
      }
      .cover > img{
        width: 120px; 
        height: 120px;
      }
      
      `}</style>
        </>
    );
};

export default Home;

    export const getServerSideProps: GetServerSideProps = withSession (async (context:GetServerSidePropsContext) => {
    const curUser = (context.req as any).session.get('currentUser');
    console.log(curUser);

    return {
        props: {
            useName: curUser ? curUser.username : ''
        }
    };

})
