import {NextPage} from 'next';
import axios from 'axios';
import {useForm} from '../../hooks/useForm';
import ReactMde, {Suggestion, SaveImageHandler} from 'react-mde';
import * as Showdown from 'showdown';
import React, {useEffect} from 'react';
import ReactMarkdown from 'react-markdown';

const loadSuggestions = async (text: string) => {
    return new Promise<Suggestion[]>((accept, reject) => {
        setTimeout(() => {
            const suggestions: Suggestion[] = [
                {
                    preview: 'Andre',
                    value: '@andre'
                },
                {
                    preview: 'Angela',
                    value: '@angela'
                },
                {
                    preview: 'David',
                    value: '@david'
                },
                {
                    preview: 'Louise',
                    value: '@louise'
                }
            ].filter(i => i.preview.toLowerCase().includes(text.toLowerCase()));
            accept(suggestions);
        }, 250);
    });
};
const converter = new Showdown.Converter({
    tables: true,
    simplifiedAutoLink: true,
    strikethrough: true,
    tasklists: true,
    metadata: true
});
const save: SaveImageHandler = async function* (data: ArrayBuffer) {
    // Promise that waits for "time" milliseconds
    const wait = function (time: number) {
        return new Promise((a, r) => {
            setTimeout(() => a(), time);
        });
    };

    // Upload "data" to your server
    // Use XMLHttpRequest.send to send a FormData object containing
    // "data"
    // Check this question: https://stackoverflow.com/questions/18055422/how-to-receive-php-image-data-over-copy-n-paste-javascript-with-xmlhttprequest

    await wait(2000);
    // yields the URL that should be inserted in the markdown
    yield 'https://picsum.photos/300';
    await wait(2000);

    // returns true meaning that the save was successful
    return true;
};


const PostsNew: NextPage = () => {
    const [value, setValue] = React.useState('---\n' +
        'title: 请输入标题\ ' +
        '\n' +
        '---');
    const [selectedTab, setSelectedTab] = React.useState<'write' | 'preview'>(
        'write'
    );
    useEffect(() => {
        console.log(typeof value);
        console.log();
    }, [value]);
    const submit = (value: string) => {
        axios.post(`/api/v1/posts`, {content: value}).then(res => {
            if (res.status === 401) {
                alert('请先登录');
                window.location.href = '/sign_in';
                return;
            }
            alert('成功');
            window.location.href='/posts'
        });


    };


    return (
        <div>

            <ReactMde
                value={value}
                onChange={setValue}
                selectedTab={selectedTab}
                onTabChange={setSelectedTab}
                generateMarkdownPreview={markdown =>
                    Promise.resolve(converter.makeHtml(markdown))
                }
                loadSuggestions={loadSuggestions}
                childProps={{
                    writeButton: {
                        tabIndex: -1
                    }
                }}
                paste={{
                    saveImage: save
                }}
            />
            <article className='markdown-body'>
                <ReactMarkdown source={value} escapeHtml={true}/>
            </article>
            <button onClick={() => submit(value)}>fuck</button>

            <style jsx>
                {
                    `
    .markdown-body{
      color: #DADADA!important;
              
              }
`
                }

            </style>
        </div>
    );
};

export default PostsNew;
