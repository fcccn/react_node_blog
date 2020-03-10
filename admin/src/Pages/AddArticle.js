import React, {useState, useEffect} from 'react';
import marked from 'marked'
import '../static/css/AddArticle.css'
import { Row, Col ,Input, Select ,Button ,DatePicker, message } from 'antd'
import axios from 'axios';
import servicePath  from '../config/apiUrl'
import { getCookie } from '../config/cookie-util'

const { Option } = Select;
const { TextArea } = Input

function AddArticle(props) {
  const [articleId, setArticleId] = useState(0)  // 文章的ID，如果是0说明是新增加，如果不是0，说明是修改
  const [articleTitle,setArticleTitle] = useState('')   //文章标题
  const [articleContent , setArticleContent] = useState('')  //markdown的编辑内容
  const [markdownContent, setMarkdownContent] = useState('预览内容') //html内容
  const [introducemd,setIntroducemd] = useState()            //简介的markdown内容
  const [introducehtml,setIntroducehtml] = useState('等待编辑') //简介的html内容
  const [showDate,setShowDate] = useState()   //发布日期
  // const [updateDate,setUpdateDate] = useState() //修改日志的日期
  const [typeInfo, setTypeInfo] = useState([]) // 文章类别信息
  const [selectedType,setSelectType] = useState('请选择') //选择的文章类别
  const renderer = new marked.Renderer();
  let token = getCookie('token')
  axios.defaults.headers.common['Authorization'] = token;
  marked.setOptions({
    renderer: renderer,
    gfm: true,
    pedantic: false,
    sanitize: false,
    tables: true,
    breaks: false,
    smartLists: true,
    smartypants: false,
  });

  const changeContent = (e)=>{
    setArticleContent(e.target.value)
    let html=marked(e.target.value)
    setMarkdownContent(html)
  }

  const changeIntroduce = (e)=>{
    setIntroducemd(e.target.value)
    let html=marked(e.target.value)
    setIntroducehtml(html)
  }
  //选择类别后的值
  const selectTypeHandler =(value)=>{
    setSelectType(value)
  }

  // 获取文章类别信息
  const getTypeInfo =()=> {
    axios.post(servicePath.getTypeInfo).then((res) => {
      if (res.data.results) {
        setTypeInfo(res.data.results)
      } else {
        props.history.push('/')  
      }
    })
  }
  const saveArticle =()=> {
    if(!selectedType){
      message.error('必须选择文章类别')
      return false
    }else if(!articleTitle){
        message.error('文章名称不能为空')
        return false
    }else if(!articleContent){
        message.error('文章内容不能为空')
        return false
    }else if(!introducemd){
        message.error('简介不能为空')
        return false
    }else if(!showDate){
        message.error('发布日期不能为空')
        return false
    }
    let dataProps = {} // 传递到接口的参数
    dataProps.type_id = selectedType
    dataProps.title = articleTitle
    dataProps.article_content = articleContent
    dataProps.introduce = introducemd
    dataProps.addTime = showDate
    dataProps.token = token
    if (articleId === 0) {
      dataProps.view_count = Math.ceil(Math.random() * 100) + 1000
      axios.post(servicePath.addArticle, {dataProps}).then((res) => {
        setArticleId(res.data.insertId)
        if (res.data.error === 0) {
          message.success('文章保存成功')
        } else {
          message.error('文章保存失败')
        }
      }).catch((err) => {
        console.log(err)
      })
    } else {
      dataProps.id = articleId
      axios.post(servicePath.updateArticle, {dataProps}).then((res) => {
        if (res.data.error === 0) {
          message.success('文章保存成功')
        } else {
          message.error('文章保存失败')
        } 
      }).catch((err) => {
        console.log(err)
      })
    }
  }
  useEffect(()=>{
    getTypeInfo() 
  // eslint-disable-next-line
  },[])
  return (
    <div>
      <Row gutter={5}>
        <Col span={18}>
          <Row gutter={10} >
            <Col span={20}>
              <Input 
                value={articleTitle}
                onChange={e=>{
                  setArticleTitle(e.target.value)
                }}
                placeholder="博客标题" 
                size="large" />
            </Col>
            <Col span={4}>
              &nbsp;
              <Select defaultValue={selectedType} size="large" onChange={selectTypeHandler}>
                {
                    typeInfo.map((item,index)=>{
                        return (<Option key={index} value={item.id}>{item.typeName}</Option>)
                    })
                }
              </Select>
            </Col>
          </Row>
          <br/>
          <Row gutter={10} >
            <Col span={12}>
              <TextArea 
                value={articleContent} 
                className="markdown-content" 
                rows={35}
                onChange={changeContent} 
                onPressEnter={changeContent}  
                placeholder="文章内容"
                />
            </Col>
            <Col span={12}>
              <div className="show-html" dangerouslySetInnerHTML = {{__html:markdownContent}}>
              </div>
            </Col>
          </Row>  
        </Col>
        <Col span={6}>
          <Row>
            <Col span={24}>
              <Button  size="large">暂存文章</Button>&nbsp;
              <Button type="primary" size="large" onClick={saveArticle}>发布文章</Button>
              <br/>
            </Col>
            <Col span={24}>
              <br/>
              <TextArea 
                  rows={4}
                  value={introducemd}  
                  onChange={changeIntroduce} 
                  onPressEnter={changeIntroduce} 
                  placeholder="文章简介"
              />
              <br/><br/>
              <div className="introduce-html" dangerouslySetInnerHTML = {{__html:'文章简介：'+introducehtml}}></div>
            </Col>
            <Col span={12}>
              <div className="date-select">
                <DatePicker
                  onChange={(date, dateString)=>setShowDate(dateString)} 
                  placeholder="发布日期"
                  size="large"  
                />
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  )
}
export default AddArticle