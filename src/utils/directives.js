import store from '../store'
function checkPermission(el, binding) {
  const { value } = binding
  const btnActions = store.getters && store.getters.permission_btnActions

  if (value && typeof value === 'string') {
    const hasPermission = btnActions.some(act => {
      return value === act
    })
    if (!hasPermission) {
      el.parentNode && el.parentNode.removeChild(el)
    }
  } else {
    throw new Error(`need btnActions! Like v-has="'add'"`)
  }
}

export default {
  has: {
    inserted(el, binding) {
      checkPermission(el, binding)
    },
    // update(el, binding) {
    //   checkPermission(el, binding)
    // }
  },
};
