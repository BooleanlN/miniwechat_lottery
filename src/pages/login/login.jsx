import Taro, { Component } from '@tarojs/taro'
import {View} from '@tarojs/components'
import { AtInput,AtForm,AtButton } from 'taro-ui'
import './login.scss'

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
                Taro.showToast({
                    title: '注册成功',
                    icon: 'success',
                    duration: 2000
                })
                Taro.reLaunch({
                    url: 'index?name='+ this.state.username + '&telephone=' + this.state.telephone
                })
            }
        ).catch(
            error => {
                Taro.showToast({
                    title:error.msg || '注册失败',
                    icon: 'none',
                    duration: 2000
                })
            }
        )
    }
    setName(val){
        this.setState({
            username:val
        })
    }
    setTele(val){
        this.setState({
            telephone:val
        })
    }
    render(){
        return (
            <View className='login-container'>
                <View className='login-box'>
                    <AtForm>
                        <AtInput type='text' placeholder='请输入您的用户名'  value={this.state.username}  onChange={this.setName.bind(this)} title='用户名' />
                        <AtInput type='phone' placeholder='请输入您的联系方式' value={this.state.telephone} onChange={this.setTele.bind(this)} title='联系方式' />
                    </AtForm>
                    <AtButton className='btn' type='primary' onClick={this.formSubmit.bind(this)} size='normal'>提交</AtButton>
                </View>
            </View>
        )
    }
}