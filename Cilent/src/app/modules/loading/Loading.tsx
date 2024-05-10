import React from 'react'
import { Alert, Flex, Spin } from 'antd';
import "./Loading.css"
const Loading = () => {
  return (
    <div className='spin-loading'>
      

<Spin tip="Loading" size="large">
        <div className="content" />
      </Spin>

    </div>
  )
}

export default Loading