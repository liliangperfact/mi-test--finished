import Vue from 'vue'
import VeeValidate from 'vee-validate'
import zh_CN from 'vee-validate/dist/locale/zh_CN'
Vue.use(VeeValidate)


VeeValidate.Validator.localize('zh_CN', {
  messages: {
    ...zh_CN.messages,
    is: (field) => `${field}必须与密码相同`  // 修改内置规则的message
  },
  attributes: { // 给校验的field属性名映射中文名称
    mobile:'手机号码',
    phone: '手机号',
    code: '验证码',
    password:'密码',
    password2:'确认密码',
    ischeck:'协议'
  }
})

VeeValidate.Validator.extend('agree', {
  //let ischeck = ,
  validate: value => {
    return value
  },
  getMessage: field => field + '必须同意'
})