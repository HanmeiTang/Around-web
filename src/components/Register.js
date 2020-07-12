import React, {Component} from 'react';
import {Form, Input} from 'antd';

class RegistrationForm extends Component {
    render() {
        // 表單的使用
        // 1. 獲取數據：The usage of a form is to get data
        // 2. 表單驗證：FE （獲取時驗證；提交時驗證） + BE
        const {getFieldDecorator} = this.props.form;
        const formItemLayout = {
            labelCol: {
                xs: {span: 24},
                sm: {span: 8},
            },
            wrapperCol: {
                xs: {span: 24},
                sm: {span: 16},
            },
        };

        return (

            <Form {...formItemLayout}>
                <Form.Item label="Username">{
                    getFieldDecorator("username", {
                        required: true,
                        message: 'Please input your username!',
                    })(<Input/>)
                }</Form.Item>
                <Form.Item label="Password" hasFeedback></Form.Item>
                <Form.Item label="Confirm Password" hasFeedback></Form.Item>
            </Form>
        )
    }
}

// How to understand this line?
const Register = Form.create({name: 'register'})(RegistrationForm);
export default Register;
