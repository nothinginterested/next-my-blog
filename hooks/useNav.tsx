import {useEffect, useState} from 'react';
import axios, {AxiosError, AxiosResponse} from 'axios';
import Link from 'next/link';

type res = {
    username: string
}
export const useNav = () => {
    const [userName, setUserName] = useState('');
    useEffect(() => {
        axios.get('/api/v1/users').then((res: AxiosResponse<res>) => {
            console.log('hhhhh');
            setUserName(res.data.username);
        });
    }, [userName]);
    return (
        <>
            <nav className="header">
                <p className="header-home"><Link href="/"><a>梁兆璋</a></Link></p>
                <ul className="list">
                    <li><Link href="/posts"><a>博客</a></Link></li>
                    <li>关于</li>
                </ul>
                <section className="header-user">
                    <span>你好,</span>
                    {userName ? <span>{userName}</span> : '孤独的旅行者'}
                </section>
            </nav>
            <style jsx>
                {
                    `  
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
        .header > p{
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
        .header-user{
         margin-right: 16px;
        font-size: 18px;
        }`
                }
            </style>
        </>
    );
};
