import React, {Component} from 'react';
import {Form} from 'antd';

class RegeistrationForm extends Component {
    render() {
        return (
            <Form>
                <Form.Item label="Username"></Form.Item>
                <Form.Item label="Password" hasFeedback></Form.Item>
                <Form.Item label="Confirm Password" hasFeedback></Form.Item>
            </Form>
        )
    }
}

// How to understand this line?
const Register = Form.create({name: 'register'})(RegeistrationForm);
export default Register;
