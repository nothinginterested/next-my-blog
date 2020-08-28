import {NextPage} from 'next';
import Link from 'next/link';

const Home: NextPage = () => {
    return (
        <>
            <div className="header">


            </div>
            <div className="cover">
                {/*<img src="/logo.png" alt=""/>*/}
                <h1>梁兆璋</h1>
                <p >致力于成为全栈的前端小白</p>
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
