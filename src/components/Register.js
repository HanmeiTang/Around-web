import React, {Component} from 'react';
import {Form, Input, Button} from 'antd';

class RegistrationForm extends Component {
    state = {
        confirmDirty: false,
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

        return (
            <Form {...formItemLayout} onSubmit={this.handleSubmit}>

                <Form.Item label="Username">{
                    // Define how data is collected
                    // username is a id, must be unique
                    getFieldDecorator("username", {
                        rules: [{
                            required: true,
                            message: 'Please input your username!',
                        }]
                    })(<Input/>)
                }</Form.Item>

                <Form.Item label="Password" hasFeedback>{
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
                    getFieldDecorator("confirm", {
                        rules: [{
                            required: true,
                            message: 'Please confirm your password!',
                        },
                            {
                                validator: this.compareToFirstPassword,
                            }]
                    })(<Input.Password/>)
                }
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Register
                    </Button>
                </Form.Item>
            </Form>
        );
    }

    // Send a HTTP request
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });
    };

    // TODO: Why you need a rule?
    validateToNextPassword = (rule, value, callback) => {
        const {form} = this.props;
        // has a value && comparator passed
        if (value && this.state.confirmDirty) {
            form.validateFields(['confirm'], {force: true});
        }
        callback();
    };

    // TODO: Why you need a rule?
    compareToFirstPassword = (rule, value, callback) => {
        console.log("this value is ", value);
        const {form} = this.props;
        if (value && value !== form.getFieldValue('password')) {
            callback('Two passwords that you enter is inconsistent!');
        } else {
            callback();
        }
    };

    handleConfirmBlur = e => {
        const {value} = e.target;
        this.setState({confirmDirty: this.state.confirmDirty || !!value});
    };


}

// How to understand this line?
const Register = Form.create({name: 'register'})(RegistrationForm);
export default Register;
