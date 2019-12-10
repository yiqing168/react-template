import React, { useState } from 'react'
import { Layout } from 'antd';
import { useDispatch } from 'react-redux';
import { withRouter } from "react-router-dom"
import SiderMenu from "./SiderMenu"
import GlobalHeader from "./GlobalHeader"
import style from "./index.module.less"
import Authorized from "@/components/Authorized/"
import ContentLayout from "./ContentLayout"
import { setLogout } from "@/redux/user.redux"
import { setLogoutOfMenu } from "@/redux/menu.redux"
import { redirectLogin } from "@/utils/authority"

/**
 * 主布局
 */
const BasicLayout = (props) => {
  const { menuData, location, userInfo } = props;
  // 左侧展开
  const [collapsed, setcollapsed] = useState(false);
  const dispatch = useDispatch();
  const handleMenuClick = ({ key }) => {
    // 退出
    if (key === 'logout') {
      dispatch(setLogout(null));
      dispatch(setLogoutOfMenu());
      redirectLogin();
    }
  };

  return (
    <Layout className={style["layout"]}>
      <SiderMenu menuData={menuData} collapsed={collapsed} Authorized={Authorized} location={location} />
      <Layout>
        <GlobalHeader onMenuClick={handleMenuClick} userInfo={userInfo} collapsed={collapsed} toggle={setcollapsed} />
        <ContentLayout />
      </Layout>
    </Layout>
  )
}

export default withRouter(BasicLayout);