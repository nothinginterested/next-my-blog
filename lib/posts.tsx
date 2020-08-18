import path from "path";
import {promises as fsPromise} from "fs";

const getPosts = async () => {
    const markdownDir = path.join(process.cwd(), 'markdown');
    const fileNames = await fsPromise.readdir(markdownDir);
    fileNames.map(item=>{

    })
    console.log(fileNames);

};

export default getPosts
