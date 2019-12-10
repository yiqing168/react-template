import axios from "axios"
import { notification, Modal } from "antd";
import errorObj from "./error.json";
import { getUserToken, redirectLogin } from "./authority"

// 通知框
function openNotificationWithIcon(type, data) {
  notification[type]({
    message: "操作" + (data.success ? "成功" : "失败"),
    description: data.success ? "" : data.message,
    duration: 2
  });
}
function isRedirect(message) {
  Modal.info({
    content: message,
    okText: "跳转至登录页",
    className: "redirect-modal",
    onOk() {
      if (!window.location.pathname.includes("/login")) {
        redirectLogin();
      }
    }
  });
}
axios.interceptors.request.use(function (config) {
  // 用户token
  config.headers.access_token = getUserToken();
  return config;
}, function (error) {
  let data = {
    success: false,
    message: "请求发生错误"
  };
  openNotificationWithIcon("error", data);
  return Promise.reject(error);
});
axios.interceptors.response.use(function (response) {
  return response;
}, function (error) {
  let data = {
    success: false
  };
  if (error.response) {
    const response = error.response;
    if (response.status === 400 && response.data) {
      isRedirect(response.data.error_description);
      return;
    }
    if (response.status === 401) {
      isRedirect("操作超时，或异地登录");
      return;
    }
    data.message =
      error.response.statusText || errorObj[error.response.status];
    if (!data.message) {
      data.message = "发生未知错误";
    } else if (data.message.indexOf("Server") > -1) {
      data.message = "数据操作异常";
    }
  } else if (error.message) {
    data.message = error.message;
  } else {
    data.message = "请求发生未知错误";
  }
  openNotificationWithIcon("error", data);
  return Promise.reject(error);
});
export default axios;