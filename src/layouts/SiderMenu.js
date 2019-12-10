import React, { useRef, useState, useEffect } from 'react'
import { Layout, Menu, Icon } from 'antd';
import logo from "../assets/logo.svg"
import style from "./index.module.less"
import { getAuthority } from "@/utils/authority"
import { getFlatMenuKeys, urlToList, getMenuMatchKeys } from "./helper"
import { Link } from 'react-router-dom'
import "./index.less"

const { Sider } = Layout;
const { SubMenu } = Menu;


/**
 * 左侧菜单
 */
const SiderMenu = React.memo((props) => {
  const { collapsed, menuData, location } = props;
  const pathnameRef = useRef(location.pathname);
  useEffect(() => {
    if (pathnameRef.current !== location.pathname) {
      pathnameRef.current = location.pathname;
      setopenKeys(getDefaultCollapsedSubMenus(props));
    }
  }, [location.pathname]);
  // 扁平数据
  const flatMenuKeys = useRef(getFlatMenuKeys(menuData));
  /**
  * 转化菜单选中项
  * /list/search/articles = > ['list','/list/search']
  * @param  props
  */
  const getDefaultCollapsedSubMenus = (props) => {
    const {
      location: { pathname },
    } = props;
    return getMenuMatchKeys(flatMenuKeys.current, urlToList(pathname));
  }
  const isMainMenu = key => {
    // 是否是第一层路由
    return menuData.some(item => key && (item.key === key || item.path === key));
  };
  // 展开菜单
  const handleOpenChange = function (openKeys) {
    const lastOpenKey = openKeys[openKeys.length - 1];
    // 超过二个一级路由取最后一个
    const moreThanOne = openKeys.filter(openKey => isMainMenu(openKey)).length > 1;
    const open = moreThanOne ? [lastOpenKey] : [...openKeys];
    setopenKeys(open);
  }
  // 默认打开的菜单
  const [openKeys, setopenKeys] = useState(getDefaultCollapsedSubMenus(props))
  // 无权限菜单过滤
  const checkPermissionItem = (authority, ItemDom, currentUser) => {
    const { Authorized } = props;
    if (Authorized && Authorized.check) {
      const { check } = Authorized;
      return check(authority, currentUser, ItemDom);
    }
    return ItemDom;
  };
  // 菜单跳转
  const getMenuItemPath = item => {
    const { location } = props;
    return (
      <Link
        to={item.path}
        replace={item.path === location.pathname}
      >
        <Icon type="pic-right" />
        <span>{item.name}</span>
      </Link>
    );
  };
  // 菜单项
  function getSubMenuOrItem(menu) {
    if (menu.children && menu.children.length) {
      const title = (
        <span>
          <Icon type="user" />
          <span>{menu.name}</span>
        </span>
      )
      return (
        <SubMenu key={menu.path} title={title}>
          {getNavMenuItems(menu.children)}
        </SubMenu>
      )
    }
    return (
      <Menu.Item key={menu.path}>
        {getMenuItemPath(menu)}
      </Menu.Item>
    )
  }
  // 递归组装菜单权限验证
  function getNavMenuItems(menuData) {
    const currentUser = getAuthority();
    return menuData.map(item => {
      const itemDom = getSubMenuOrItem(item);
      return checkPermissionItem(item.authority, itemDom, currentUser);
    }).filter(item => item);
  }
  // 选中项
  let selectedKeys = getDefaultCollapsedSubMenus(props);
  if (!selectedKeys.length) {
    selectedKeys = [openKeys[openKeys.length - 1]];
  }
  // 收起时处理hug
  const menuProps = collapsed
    ? {}
    : {
      openKeys,
    };
  return (
    <Sider trigger={null} collapsible collapsed={collapsed} width={256}>
      <div className={style.logo} key="logo">
        <img src={logo} alt="logo" />
        <h1>后台管理模板</h1>
      </div>
      <Menu theme="dark" mode="inline" onOpenChange={handleOpenChange} selectedKeys={selectedKeys} {...menuProps}>
        {
          getNavMenuItems(menuData)
        }
      </Menu>
    </Sider>
  )
})

export default SiderMenu