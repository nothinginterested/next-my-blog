import {GetServerSideProps, GetServerSidePropsContext, NextPage} from 'next';
import {useCallback, useState} from 'react';
import axios, {AxiosResponse} from 'axios';

const SignIn: NextPage = (props) => {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        passwordConfirmation: ''
    });
    const [errors, setErrors] = useState({
        username: [], password: [], passwordConfirmation: []
    });
    const onSubmit = useCallback((e) => {
        e.preventDefault();
        axios.post(`/api/v1/users`, formData)
            .then((res) => {
                console.log(res);
            }, (error) => {
                if (error.response) {
                    const response: AxiosResponse = error.response;
                    if (response.status === 422) {
                        console.log('response.data');
                        console.log(response.data);
                        setErrors({...errors, ...response.data});
                    }
                }
            });
    }, []);
    return (
        <>
            <h1>注册</h1>
            <form onSubmit={onSubmit}>
                {JSON.stringify(formData)}
                <div>
                    <label>
                        用户名
                        <input type="text" value={formData.username} onChange={e => {
                            setFormData({...formData, username: e.target.value});
                        }}/>
                    </label>
                    {errors.username?.length > 0 && <div>
                        {errors.username.join(',')}</div>}l

                </div>
                <div>
                    <label>
                        密码
                        <input type="password" value={formData.password} onChange={e => {
                            setFormData({...formData, password: e.target.value});
                        }}/>
                    </label>
                    {errors.password?.length > 0 && <div>
                        {errors.password.join(',')}</div>}
                </div>
                <div>
                    <label>
                        验证密码
                        <input type="password" value={formData.passwordConfirmation} onChange={e => {
                            setFormData({...formData, passwordConfirmation: e.target.value});
                        }}/>
                    </label>
                    {errors.passwordConfirmation?.length > 0 && <div>
                        {errors.passwordConfirmation.join(',')}</div>}
                </div>
                <button type='submit'>
                    提交
                </button>

            </form>

        </>
    );


};

export default SignIn;

