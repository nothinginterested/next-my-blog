import 'reflect-metadata';
import {createConnection} from 'typeorm';
import {Post} from './entity/Post';

createConnection().then(async connection => {

    // console.log(connection);
    const posts1 = await connection.manager.find(Post);
    if (posts1.length === 0) {
        await connection.manager.save(
            [1,2,3,4,5,6,7,8,9,10].map(p=>{
            return new Post({title:`Post ${p}`,content:`这是我的第${p}篇文章`})
        }))


    }

    connection.close();

}).catch(error => console.log(error));
