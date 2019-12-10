// 查询用户角色信息
export async function queryCurrent() {
  return {
    "name": "Serati Ma",
    "avatar": "https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png",
    "userid": "00000001",
    "notifyCount": 12,
    "currentAuthority": "user"
  };
}
// 获取菜单
export async function getMenuData() {
  return [
    {
      name: 'dashboard',
      icon: 'dashboard',
      path: 'dashboard',
      children: [
        {
          name: '分析页',
          path: 'analysis',
        }
      ]
    },
    {
      name: '列表页',
      icon: 'table',
      path: 'list',
      children: [
        {
          name: '查询表格',
          path: 'table-list',
        },
        {
          name: '标准列表',
          path: 'basic-list',
        },
        {
          name: '搜索列表',
          path: 'search',
          children: [
            {
              name: '搜索列表（文章）',
              path: 'articles',
            },
            {
              name: '搜索列表（项目）',
              path: 'projects',
            }
          ],
        },
      ],
    }
  ];
}