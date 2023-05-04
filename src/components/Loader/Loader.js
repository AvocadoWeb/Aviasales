import { LoadingOutlined } from '@ant-design/icons'
import { Spin } from 'antd'

export default function Loader() {
  const antIcon = (
    <LoadingOutlined
      style={{
        fontSize: 30,
        marginBottom: 20,
      }}
      spin
    />
  )
  return <Spin indicator={antIcon} />
}
