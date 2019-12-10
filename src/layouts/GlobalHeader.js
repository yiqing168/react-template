import React from 'react'
import { Layout, Icon, Menu, Dropdown } from 'antd';
import style from "./index.module.less"
const { Header } = Layout;

/**
 * 导航条
 */
const GlobalHeader = React.memo((props) => {
  const { collapsed, toggle, userInfo, onMenuClick } = props;
  const menu = (
    <Menu>
      <Menu.Item onClick={onMenuClick} key="logout">
        <Icon type="user" />
        退出登录
      </Menu.Item>
    </Menu>
  );

  return (
    <Header style={{ background: '#fff', padding: "0 12px 0 0" }}>
      <Icon
        className={style["trigger"]}
        type={collapsed ? 'menu-unfold' : 'menu-fold'}
        onClick={e => toggle(!collapsed)}
      />
      <div className={`fr`}>
        <span className={style["header-itam"]}>
          <Icon type="bell" />
        </span>
        <Dropdown overlay={menu}>
          <span className={style["header-itam"]}>
            <img alt="" src="https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png" />
            <span className={style["name"]}>{userInfo ? userInfo.name : ''}</span>
          </span>
        </Dropdown>
      </div>
    </Header>
  )
})

export default GlobalHeader