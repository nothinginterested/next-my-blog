import {GetServerSideProps, GetServerSidePropsContext, NextPage} from 'next';
import Link from 'next/link';
import {withSession} from '../lib/withSession';

type props = {
    useName?: string

}


const Home: NextPage<props> = (props) => {

    const {useName} = props;
    console.log(useName);
    return (
        <>
            <nav className="header">

                <a className="header-home"><Link href="/"><a>梁兆璋</a></Link></a>
                <ul className="list">
                    <li><Link href="/posts"><a>博客</a></Link></li>
                    <li>关于</li>
                </ul>
                <section>
                    <span>你好</span>
                </section>
            </nav>
            <div className="cover">
                {/*<img src="/logo.png" alt=""/>*/}
                <h1>梁兆璋</h1>
                <p>致力于成为全栈的前端工程师</p>
                <p><Link href="/posts"><a>文章列表</a></Link></p>
            </div>
            <style jsx>{`
        .header{
               color: #DADADA;
               font-size: 22px;
               width: 100%;
               height: 4rem;
               display: flex;
               flex-direction: row;
               justify-content: flex-end;
               position: relative;
               align-items: center;
        }
        .header > a{
            position: absolute;
            top:50%;
            left:16%;
            transform: translateY(-50%);
        
        }
        .header > .list {
          display: flex;
          justify-content: flex-end;
          align-items: center;
          flex-direction: row;
          font-size: 18px;
          margin-right: 16px;
        }
        .header > .list >li{
          flex-grow: 1;
          margin-left: 16px;
        }
        .header > .list >li:hover{
         color: #42a5F5;
         text-decoration: underline;
        }
         .header-home:hover{
         color: #42a5F5;
         text-decoration: underline;
         }

      .cover{
        height: 100vh;
        display:flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        background: #212121;
        color: #DADADA;
        font-size: 32px;
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


    return {
        props: {
            useName: 'xxxx'
        }
    };

})
