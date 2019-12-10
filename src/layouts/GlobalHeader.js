import React from 'react'
import { Layout, Icon } from 'antd';
import style from "./index.module.less"
const { Header } = Layout;

/**
 * 导航条
 */
const GlobalHeader = React.memo((props) => {
  const { collapsed, toggle } = props;

  return (
    <Header style={{ background: '#fff', padding: 0 }}>
      <Icon
        className={style["trigger"]}
        type={collapsed ? 'menu-unfold' : 'menu-fold'}
        onClick={e => toggle(!collapsed)}
      />
    </Header>
  )
})

export default GlobalHeader