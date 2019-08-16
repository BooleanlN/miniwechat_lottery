import Taro, { Component } from '@tarojs/taro'
import {View,Form,Input, Button} from '@tarojs/components'

class Login extends Component{
    constructor(props){
        super(props)
        this.state = {
            username: '',
            telephone:''
        }
    }
    formSubmit () {
        Taro.request({
            url: 'xxx',
            data: {
                username: this.state.username,
                telephone: this.state.telephone
            },
            header: {
                'content-type': 'application/json'
            }
        }).then(
            res => {
                console.log(res.data)
            }
        )
    }
    render(){
        const username = this.state.username
        const telephone = this.state.telephone
        return (
            <View className='login-container'>
                <Form onSubmit={this.formSubmit}>
                    <Input type='text' placeholder='请输入您的用户名' focus value={username} />
                    <Input type='number' placeholder='请输入您的手机号' value={telephone} />
                    <Button className='btn' type='primary'>提交</Button>
                </Form>
            </View>
        )
    }
}