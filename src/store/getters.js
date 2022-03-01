const getters = {
  sidebar: state => state.app.sidebar,
  roleList: state => state.account.roleList, //所有角色列表
  token: state => state.user.token,//用户token
  name: state => state.user.name, //用户名称
  userId: state => state.user.userId, //用户id
  permission_routes: state => state.permission.routes, //根据后端返回路由匹配过后，最终生成的菜单
  permission_btnActions: state => state.permission.btnActions, // 当前路由的按钮权限
}
export default getters
