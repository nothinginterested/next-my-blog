import {NextPage} from 'next';
import axios from 'axios';
import {useForm} from '../../hooks/useForm';
import ReactMde, {Suggestion, SaveImageHandler} from 'react-mde';
import * as Showdown from 'showdown';
import React, {useEffect} from 'react';

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
    metadata:true
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
    const [value, setValue] = React.useState('**Hello world!!!**');
    const [selectedTab, setSelectedTab] = React.useState<'write' | 'preview'>(
        'write'
    );
    useEffect(() => {
        console.log(typeof value);
        console.log();
    }, [value]);
    const submit = (value: string) => {
        axios.post(`/api/v1/posts`, {content:value}).then(res => {
            console.log(res);
            alert('成功')
        });


    };

    const {form} = useForm({
        initFormData: {title: '', content: ''},
        fields: [
            {label: '标题', type: 'text', key: 'title',},
            {label: '内容', type: 'textarea', key: 'content',},
        ],
        buttons: <button type="submit">提交</button>,
        submit: {
            request: formData => axios.post(`/api/v1/posts`, formData),
            success: () => {
                window.alert('提交成功');
                window.location.href = '/posts';
            }
        }
    });

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
            <article dangerouslySetInnerHTML={{__html: converter.makeHtml(value)}}/>

            <button onClick={() => submit(value)}>提交</button>

        </div>
    );
};

export default PostsNew;
