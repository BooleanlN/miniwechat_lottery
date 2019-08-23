import Taro, { Component } from '@tarojs/taro'
import {View,Text,Image} from '@tarojs/components'
import lotterybg from '../../static/images/bg-lottery.png'
import playBtn from '../../static/images/playbtn.png'
import ggif from '../../static/images/ly-plate-c.gif'
import './roulette.scss'
class Roulette extends Component{
    constructor(props){
        super(props)
        this.state={
            an_zhuanp:null,
            height: '1334px'
        }
        let rouletteTurbo = null
        this.useShareAppMessage = this.useShareAppMessage.bind(this)
    }
    componentWillMount(){
        Taro.getSystemInfo({
        }).then(res => {
            console.log(res)
            this.setState({
                height:res.screenHeight + 'px'
            })
        })
    }
    start = ()=>{
        let n = 1
        this.rouletteTurbo = setInterval(()=>{
            const animation = Taro.createAnimation({
                duration:1000,
                timingFuncion:"ease"
            })
            animation.rotate(360 * n).step()
            this.setState({
                an_zhuanp:animation.export()
            })
            n++
        },100) 
        setTimeout(this.drawPrize,3000)
    }
    drawPrize= () => {
        
        clearInterval(this.rouletteTurbo)
        this.rouletteTurbo = null
        let animation = Taro.createAnimation({
            duration:1000,
            timingFuncion:"ease"
        })
        let deg = 0
        Taro.request({
            url:'',
            data:{
                phone:'',
                account: '',
                openid:''
            }
        }).then(res => {
            deg = res.deg
            animation.rotate(deg).step();
            this.setState({
                an_zhuanp:animation.export()
            })
            switch(deg){
                case 60:
                    Taro.showModal({
                        title:'一等奖',
                        content:'一等奖'
                    })
                    break
                case 300:
                    Taro.showModal({
                        title:'二等奖',
                        content:'二等奖'
                    })
                    break
                case 180:
                    Taro.showModal({
                        title:'三等奖',
                        content:'三等奖'
                    })
                    break
                default:
                    Taro.showModal({
                        title:'很遗憾',
                        content:'很遗憾'
                    })
            }
                
        })
    }
    useShareAppMessage = ()=>{
        console.log("分享")
    }
    render(){
        return (
            <View className='roulette-container' style={{height:this.state.height}}>
                <Text className='title'>抽奖界面</Text>
                <View className='content'>
                  <Image className='bg-light' src={ggif} />
                  <Image className='bg-img' src={lotterybg} animation={this.state.an_zhuanp} />
                  <Image className='btn' src={playBtn} onClick={this.start} />
                </View>
                <View className='tips'>
                    <Text>奖品抽完为止。每个账号只有一次抽奖机会!\n抽奖后台会有记录，确保填写了有效联系方式\n一等奖2份，二等奖5份，三等奖10份\n技术支持：网络信息协会</Text>
                </View>
            </View>
        )
    }
}
