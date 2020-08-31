import React, {ChangeEventHandler, ReactChild, useCallback, useState} from 'react';
import {AxiosResponse} from 'axios';

type Field<T> = {
    label: string,
    type: 'text' | 'password' | 'textarea',
    key: keyof T
}
type useFormOptions<T> = {
    initFormData: T;
    fields: Field<T>[];
    buttons: ReactChild;
    submit: {
        request: (formData: T) => Promise<AxiosResponse<T>>;
        success: () => void
    }
}

export function useForm<T>(options: useFormOptions<T>) {
    const {initFormData, fields, buttons, submit} = options;
    // 非受控
    const [formData, setFormData] = useState(initFormData);
    // initFormData = {username:'', password:''}
    // initErrors = {username: [], password: []}
    const [errors, setErrors] = useState(() => {
        const e: { [k in keyof T]?: string[] } = {};
        for (let key in initFormData) {
            if (initFormData.hasOwnProperty(key)) { // 为了严谨
                e[key] = [];
            }
        }
        return e;
    });
    const onChange = useCallback((key: keyof T, value: any) => {
        setFormData({...formData, [key]: value});
    }, [formData]);
    const _onSubmit = useCallback((e) => {
        e.preventDefault();
        submit.request(formData).then(() => {
                submit.success();
            }, (error) => {
                if (error.response) {
                    const response: AxiosResponse = error.response;
                    if (response.status === 422) {
                        setErrors(response.data);
                    } else if (response.status === 401) {
                        window.alert('请先登录');
                        window.location.href =
                            `/sign_in?returnTo=${encodeURIComponent(window.location.pathname)}`;
                    }

                }
            }
        );

    }, [submit, formData]);
    const form = (
        <>
            <div className="form-wrapper">
                <form onSubmit={_onSubmit}>
                    {fields.map(field =>
                        <div key={field.key.toString()} >
                            <label className="form-item">
                                <span className="form-item-name">{field.label}</span>
                                {field.type === 'textarea' ?
                                    <textarea onChange={(e) => onChange(field.key, e.target.value)}
                                              value={formData[field.key].toString()}

                                    />
                                    :
                                    <input type={field.type} value={formData[field.key].toString()}
                                           onChange={(e) => onChange(field.key, e.target.value)}
                                        className="form-item-input"
                                    />
                                }
                            </label>
                            {errors[field.key]?.length > 0 &&
                            <div className="form-item-error">
                                {errors[field.key].join(',')}
                            </div>}
                        </div>
                    )}
                    <div>
                        {buttons}
                    </div>

                </form>

            </div>
            <style jsx>{`
        .form-wrapper{
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
         color: #DADADA;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        
        }
   
       form > .form-item{
          display: flex;
          justify-content: center;
          align-items: center;
          border: 1px solid red;
          min-height: 3.2rem;
          position: relative;
        
        }
        
        form > .form-item>.form-item-error{
          position: absolute;
          top: 100%;
          font-size: 16px;
          
        
        }
      `}</style>
        </>
    );
    return {
        form: form, setErrors: setErrors
    };
}
