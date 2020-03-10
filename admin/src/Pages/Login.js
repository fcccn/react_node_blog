import React , {useState} from 'react';
import 'antd/dist/antd.css';
import { Card, Input, Icon,Button ,Spin, message } from 'antd';
import axios from 'axios';
import '../static/css/Login.css';
import servicePath from '../config/apiUrl'
import { setCookies } from '../config/cookie-util'
function Login(props){
    const [userName, setUserName] = useState('')
    // eslint-disable-next-line
    const [password, setPassword] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const checkLogin = ()=>{
      setIsLoading(true)
      if (!userName) {
        message.error('用户名不能为空')
        return false
      } else if (!password) {
        message.error('密码不能为空')
        return false
      }
      let dataProps = {
        'userName': userName,
        'password': password
      }
      axios.post(servicePath.checkLogin, dataProps).then((res) => {
        setIsLoading(false)
        if (res.data.error === 0) {
          setCookies(res.data.results)
          props.history.push('/index')
        } else {
          message.error('用户名密码错误')
        }
      })
      setTimeout(()=>{
          setIsLoading(false)
      },1000)
    }
    return (
      <div className="login-div">
        <Spin tip="Loading..." spinning={isLoading}>
            <Card title="Allen Blog  System" bordered={true} style={{ width: 400 }} >
                <Input
                    id="userName"
                    size="large"
                    placeholder="Enter your userName"
                    prefix={<Icon type="user" style={{color:'rgba(0,0,0,.25)'}} />}
                    onChange={(e)=>{setUserName(e.target.value)}}
                /> 
                <br/><br/>
                <Input.Password
                    id="password"
                    size="large"
                    placeholder="Enter your password"
                    prefix={<Icon type="key" style={{color:'rgba(0,0,0,.25)'}} />}
                    onChange={(e)=>{setPassword(e.target.value)}}
                />     
                <br/><br/>
                <Button type="primary" size="large" block onClick={checkLogin} > Login in </Button>
            </Card>
        </Spin>
      </div>
    )
}
export default Login