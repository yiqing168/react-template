import { handleActions, createAction } from "redux-actions"
import { queryCurrent, getMenuData } from "@/services/user"
import { setAuthority } from "@/utils/authority"
import { getRouterData } from "../comm/router"
import { setRouterData } from "./menu.redux"

// 获取用户数据
const GET_USER_INFO = "@USER/GET_USER_INFO";
// 登出
const LOGOUT = "@USER/LOGOUT";

// 设置数据
export const userInfoAction = createAction(GET_USER_INFO);
// 登出
export const setLogout = createAction(LOGOUT);

// 获取用户信息
export function getUser() {
  return dispatch => {
    queryCurrent().then(_d => {
      dispatch(userInfoAction(_d));
      setAuthority(_d.currentAuthority);
      return getMenuData();
    }).then(_d => {
      const data = getRouterData(_d);
      dispatch(setRouterData(data));
    })
  }
}

function getInitState() {
  return {
    userInfo: null
  }
}
//定义初始化状态
let defaultState = getInitState();

export default handleActions({
  [GET_USER_INFO]: (state, data) => {
    return Object.assign({}, state, { userInfo: data.payload });
  },
  [LOGOUT]: (state, data) => {
    return Object.assign({}, state, { userInfo: data.payload });
  }
}, defaultState);
