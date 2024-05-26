import React ,{useState, useEffect}from 'react'
import { Alert, Space } from 'antd';


type props={
    message:string,
    messageType:string
}
const AlertTravis = ({message, messageType}:props) => {
  const [messages, setMessages]= useState<string>("")
  const [isSucesss, setIsSuccess]= useState<boolean>(false)
  const [isError, setIsError]= useState<boolean>(false)


    useEffect(()=>{
        if(message &&messageType==="success"){
            setIsSuccess(true)
            setMessages(messageType)
        } else if (message &&messageType==="error"){
            setIsError(true)
            setMessages(message)
        }
    },[message,messageType])
  return (
    <div>
        {isSucesss && <Alert message={messages} type="success"  showIcon closable/>}
        {isError && <Alert message={messages} type="success"  showIcon closable/>}
    </div>
  )
}

export default AlertTravis