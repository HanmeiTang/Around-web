import React, {Component} from 'react';
import {Form, Input, Button, message} from 'antd';
import {API_ROOT} from "../constants.js";
import {Link} from "react-router-dom";

class RegistrationForm extends Component {
    state = {
        confirmDirty: false,
        autoCompleteResult: [], // TODO: What is this?
    };

    render() {
        // 表單的使用
        // 1. 獲取數據：The usage of a form is to get data
        // 2. 表單驗證：FE （獲取時驗證；提交submit時驗證） + BE
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

        const tailFormItemLayout = {
            wrapperCol: {
                xs: {
                    span: 24,
                    offset: 0,
                },
                sm: {
                    span: 16,
                    offset: 8,
                },
            },
        };

        return (
            <Form {...formItemLayout} onSubmit={this.handleSubmit}>
                <Form.Item label="Username">{
                    // Define how data is collected
                    // username is a id, must be unique

                    // This is username input box
                    getFieldDecorator("username", {
                        rules: [{
                            required: true,
                            message: 'Please input your username!',
                        }]
                    })(<Input/>)
                }</Form.Item>

                <Form.Item label="Password" hasFeedback>{
                    // This is 1st password input box
                    getFieldDecorator("password", {
                        // 我們想實現一點功能
                        // 希望密碼必須遵守一些規則
                        //
                        rules: [
                            {
                                // * 聲明式校驗
                                required: true,
                                message: 'Please input your password!',
                            },
                            {
                                // * 自定義校驗
                                // 通過調用validator函數實現
                                validator: this.validateToNextPassword,
                            }]
                    })(<Input.Password/>)
                }</Form.Item>

                <Form.Item label="Confirm Password" hasFeedback>{
                    // This is 2nd password input box
                    getFieldDecorator("confirm", {
                        rules: [{
                            required: true,
                            message: 'Please confirm your password!',
                        },
                            {
                                validator: this.compareToFirstPassword,
                            }]
                    })(<Input.Password onBlur={this.handleConfirmBlur}/>)
                }
                </Form.Item>
                <Form.Item {...tailFormItemLayout}>
                    <Button type="primary" htmlType="submit">
                        Register
                    </Button>
                    <p>I already have an account, go back to <Link to="/login">login</Link></p>
                </Form.Item>

            </Form>
        );
    }

    // Send a HTTP request
    // used to register a user
    // AJAX is very complex
    // we use 'fetch' here instead
    // 'fetch()' is a feature provided by ES6
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                // fetch代碼基礎是promise，但做過一點包裝
                // 和原生promise有點點區別
                fetch(`${API_ROOT}/signup`, {
                    method: 'POST',
                    body: JSON.stringify({
                        username: values.username,
                        password: values.password,
                    })
                }).then(response => {
                    console.log('response -> ', response);
                    if (response.ok) {
                        return response.text();
                    }
                }).then(result => {
                    console.log('success -> ', result);
                })
            }
        });
    };

    compareToFirstPassword = (rule, value, callback) => {
        console.log("compareToFirstPassword");
        console.log("this value is ", value);
        const {form} = this.props;
        if (value && value !== form.getFieldValue('password')) {
            callback('Two passwords that you enter is inconsistent!');
        } else {
            callback();
        }
    };

    // Note this 'rule' is not used
    validateToNextPassword = (rule, value, callback) => {
        const {form} = this.props;
        // has a value && comparator passed
        if (value && this.state.confirmDirty) {
            form.validateFields(['confirm'], {force: true});
        }
        callback();
    };

    // todo: ?? 哪裡用啊
    handleConfirmBlur = e => {
        const {value} = e.target;
        this.setState({confirmDirty: this.state.confirmDirty || !!value});
    };
}

// How to understand this line?
const Register = Form.create({name: 'register'})(RegistrationForm);
export default Register;
