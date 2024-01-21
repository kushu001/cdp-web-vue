<template>
  <div class="navbar">
    <hamburger id="hamburger-container" :is-active="sidebar.opened" class="hamburger-container" @toggleClick="toggleSideBar" />

    <breadcrumb id="breadcrumb-container" class="breadcrumb-container" />

    <div class="right-menu">
      <template v-if="device!=='mobile'">
        <search id="header-search" class="right-menu-item" />

        <error-log class="errLog-container right-menu-item hover-effect" />

        <screenfull id="screenfull" class="right-menu-item hover-effect" />

        <el-tooltip content="全局尺寸" effect="dark" placement="bottom">
          <size-select id="size-select" class="right-menu-item hover-effect" />
        </el-tooltip>

      </template>

      <el-dropdown class="avatar-container right-menu-item hover-effect" trigger="click">
        <div class="avatar-wrapper">
          <img :src="avatar+'?imageView2/1/w/80/h/80'" class="user-avatar">
          <i class="el-icon-caret-bottom" />
        </div>
        <el-dropdown-menu slot="dropdown">
          <!-- <router-link to="/profile">
            <el-dropdown-item>简介</el-dropdown-item>
          </router-link>
          <router-link to="/">
            <el-dropdown-item>仪表盘</el-dropdown-item>
          </router-link> -->
          <a target="_blank" href="https://github.com/kushu001/cdp">
            <el-dropdown-item>Github-[cdp]</el-dropdown-item>
          </a>
          <a target="_blank" href="https://github.com/kushu001/cdp-web-vue">
            <el-dropdown-item>Github-[cdp-web-vue]</el-dropdown-item>
          </a>
          <!-- <a target="_blank" href="https://panjiachen.github.io/vue-element-admin-site/#/">
            <el-dropdown-item>文档</el-dropdown-item>
          </a> -->
          <el-dropdown-item @click.native="resetPasswordWindow">
            <span style="display:block;">重置密码</span>
          </el-dropdown-item>
          <el-dropdown-item divided @click.native="logout">
            <span style="display:block;">登出</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <el-dialog title="重置密码" :visible.sync="resetPasswordVisble" width="30%" :append-to-body="true">
      <el-form ref="form" :model="form" label-position="right" :rules="rules">
        <el-form-item label="旧新密码" :label-width="formLabelWidth" prop="old_password">
          <el-input v-model="form.old_password" type="password" autocomplete="off" />
        </el-form-item>
        <el-form-item label="新密码" :label-width="formLabelWidth" prop="new_password">
          <el-input v-model="form.new_password" type="password" autocomplete="off" />
        </el-form-item>
        <el-form-item label="确认密码" :label-width="formLabelWidth" prop="confirm_password">
          <el-input v-model="form.confirm_password" type="password" autocomplete="off" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="resetPasswordVisble = false">取 消</el-button>
        <el-button type="primary" @click="resetPassword">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'
import ErrorLog from '@/components/ErrorLog'
import Screenfull from '@/components/Screenfull'
import SizeSelect from '@/components/SizeSelect'
import Search from '@/components/HeaderSearch'
import { resetPassword } from './api/login'

export default {
  components: {
    Breadcrumb,
    Hamburger,
    ErrorLog,
    Screenfull,
    SizeSelect,
    Search
  },
  data() {
    return {
      resetPasswordVisble: false,
      formLabelWidth: '100px',
      form: {
        old_password: '',
        new_password: '',
        confirm_password: ''
      },
      rules: {
        old_password: [
          { required: true, message: '旧密码不能为空', trigger: 'blur' }
        ],
        new_password: [
          { required: true, message: '新密码不能为空', trigger: 'blur' }
        ],
        confirm_password: [
          { required: true, message: '确认密码不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'avatar',
      'device'
    ])
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    },
    async logout() {
      await this.$store.dispatch('user/logout')
      // this.$router.push(`/login?redirect=${this.$route.fullPath}`)
      this.$router.push(`/login`)
    },
    resetPasswordWindow() {
      this.resetPasswordVisble = true
    },
    resetPassword() {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          if (this.form.old_password === this.form.new_password) {
            this.$message({
              type: 'error',
              message: '新密码不能与旧密码相同'
            })
          } else if (this.form.new_password !== this.form.confirm_password) {
            this.$message({
              type: 'error',
              message: '两次密码不一致'
            })
          } else {
            debugger
            resetPassword(this.form).then(({ data }) => {
              debugger
              if (data.code === 200) {
                this.$message({
                  type: 'success',
                  message: '密码重置成功'
                })
                this.resetPasswordVisble = false
                this.$refs.form.resetFields()
              }
            })
          }
        } else {
          return false
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0,21,41,.08);

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background .3s;
    -webkit-tap-highlight-color:transparent;

    &:hover {
      background: rgba(0, 0, 0, .025)
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .errLog-container {
    display: inline-block;
    vertical-align: top;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background .3s;

        &:hover {
          background: rgba(0, 0, 0, .025)
        }
      }
    }

    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        margin-top: 5px;
        position: relative;

        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
