import { list } from '@/api/roles'
const state = {
  roleList: [],
}
const mutations = {
  SET_ROLE_LIST(state, data) {
    state.roleList = data;
  },
}

const actions = {
  /**
   *
   * 更新角色列表方法
   * update 是否更新列表
   */
  updateRoleList({ commit, state }, update = false) {
    return new Promise((resolve, reject) => {
      if (state.roleList.length && !update) {
        resolve(state.roleList);
      } else {
        //查1000条机型
        let params = {
          page: 1,
          size: 1000,
        };
        list(params)
          .then((res) => {
            commit("SET_ROLE_LIST", res.data.list || []);
            resolve(res.data.list || []);
          })
          .catch((err) => {
            reject();
          });
      }
    });
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

