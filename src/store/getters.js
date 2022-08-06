const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  userId: state => state.user.userInfo.userId,
  userName: state => state.user.userInfo.username,
  staffPhoto: state => state.user.userInfo.staffPhoto,
  companyId: state => state.user.userInfo.companyId,
  points: state => state.user.userInfo.roles.points,
  companyName: state => state.user.userInfo.companyName,
  departmentName: state => state.user.userInfo.departmentName
}
export default getters  
