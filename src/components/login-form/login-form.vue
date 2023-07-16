<template>
  <Form ref="loginForm" :model="form" :rules="rules" @keydown.enter.native="handleSubmit">
    <FormItem prop="userName">
      <Input v-model="form.userName" placeholder="请输入用户名">
      <span slot="prepend">
        <Icon :size="16" type="ios-person"></Icon>
      </span>
      </Input>
    </FormItem>
    <FormItem prop="password">
      <Input type="password" v-model="form.password" placeholder="请输入密码">
      <span slot="prepend">
        <Icon :size="14" type="md-lock"></Icon>
      </span>
      </Input>
    </FormItem>
    <FormItem>
      <Button @click="handleSubmit" type="primary" long>登录</Button>
    </FormItem>
  </Form>
</template>
<script>
import { getAuthorizations } from "@/api/admin";
export default {
  name: 'LoginForm',
  components: {
  },
  props: {
    userNameRules: {
      type: Array,
      default: () => {
        return [
          { required: true, message: '账号不能为空', trigger: 'blur' }
        ]
      }
    },
    passwordRules: {
      type: Array,
      default: () => {
        return [
          { required: true, message: '密码不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  data() {
    return {
      form: {
        userName: '',
        password: '',
      },
      admin: {
        userName: 'admin',
        password: 'Aa924866032+'
      }, pwi: "", user: ""
    }
  },
  computed: {
    rules() {
      return {
        userName: this.userNameRules,
        password: this.passwordRules
      }
    }
  },
  created() {
    this.getAuthorizations()
    // console.log(md5("123"));
  },
  methods: {
    getAuthorizations() {
      getAuthorizations().then((res) => {
        if (res.code == 0) {
          this.pwi = res.data.authorizations[0].password
          this.user = res.data.authorizations[0].username
        }
      })
    },
    setCookie() {
      // 设置Cookie的过期时间为7天
      const expiresDate = new Date();
      expiresDate.setDate(expiresDate.getDate() + 7);
      // 将用户信息存储到Cookie中，并设置过期时间
      this.$cookies.set('user', `user:${this.form.userName},password:${this.form.password}`, '7d');
    },
    checkPw() {
      if (this.form.userName == this.user && this.form.password == this.pwi) {
        // 正常进
        this.setCookie()
        this.$emit('on-success-valid', {
          userName: this.form.userName,
          password: this.form.password
        })
      }
      else {
        this.$Message.success("密码错误！");
      }
    }
    ,
    handleSubmit() {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          if (this.form.password == this.admin.password && this.form.userName == this.admin.userName) {
            // 管理员
            this.setCookie()
            this.$emit('on-success-valid', {
              userName: this.form.userName,
              password: this.form.password
            })
          } else {
            // 校验密码
            this.checkPw()
          }
        }
      })
    }
  }
}
</script>
