import {GetServerSideProps, GetServerSidePropsContext, NextPage} from 'next';
import axios, {AxiosResponse} from 'axios';
import {useForm} from '../hooks/useForm';

const SignUp: NextPage = (props) => {
    const {form} = useForm({
        initFormData: {username: '', password: '', passwordConfirmation: ''}, fields: [
            {label: '用户名', type: 'text', key: 'username',},
            {label: '密码', type: 'password', key: 'password',},
            {label: '确认密码', type: 'password', key: 'passwordConfirmation',}
        ],
        buttons: <button type="submit">注册</button>,
        submit: {
            request: formData => axios.post(`/api/v1/users`, formData),
            message: '注册成功'
        }
    });
    return (
        form
    );


};

export default SignUp;

