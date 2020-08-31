import {GetServerSideProps, NextPage} from 'next';
import {useCallback, useState} from 'react';
import axios, {AxiosError, AxiosResponse} from 'axios';
import {withSession} from '../lib/withSession';
import {User} from '../src/entity/User';
import {useForm} from '../hooks/useForm';
import qs from 'query-string';

const SignIn: NextPage<{ user: User }> = (props) => {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        passwordConfirmation: ''
    });
    const {form} = useForm({
        initFormData: formData,
        fields: [{
            label: '用户名',
            type: 'text',
            key: 'username'
        }, {label: '密码', type: 'password', key: 'password',}
        ],
        buttons: <button type='submit'>登录</button>,
        submit: {
            request: formData => axios.post(`/api/v1/sessions`, formData),
            success: () => {
                window.alert('登录成功');
                // const query = qs.parse(window.location.search.substr(1));
                window.location.href = '/'

            }
        }

    });


    return (
        form

    );
};

export default SignIn;

// @ts-ignore
export const getServerSideProps: GetServerSideProps = withSession(async (context) => {
    // @ts-ignore
    const user = context.req.session.get('currentUser');
    console.log(user);
    return {
        props: {
            user: JSON.parse(JSON
                .stringify(user || ''))
        }
    };
});
