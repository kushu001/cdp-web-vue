<template>
  <div style="width:40%">
    <el-form ref="form" :model="userInfo" :rules="rules">
      <el-form-item label="姓名" prop="name">
        <el-input v-model="userInfo.name" placeholder="姓名" maxlength="15" />
      </el-form-item>
      <el-form-item label="年龄" prop="age">
        <el-input v-model="userInfo.age" placeholder="年龄" />
      </el-form-item>
      <el-form-item label="性别" prop="gender">
        <el-radio-group v-model="userInfo.gender">
          <el-radio label="0">男</el-radio>
          <el-radio label="1">女</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="爱好" prop="hobby">
        <el-checkbox-group v-model="userInfo.hobby">
          <el-checkbox v-for="item in hobbies" :key="item" :label="item" name="hobby" />
        </el-checkbox-group>
        <div>
          <el-input v-model.trim="hobby" placeholder="自定义" size="mini" style="width:140px;" @change="handleAddHooby" />
        </div>
      </el-form-item>
      <el-form-item label="生日" prop="birthday">
        <el-date-picker v-model="userInfo.birthday" />
      </el-form-item>
      <el-form-item label="自定义" prop="randomValue">
        <custom-input v-model="userInfo.randomValue" />
      </el-form-item>
      <el-form-item label="自定义" prop="userId">
        <user-select-table v-model="userInfo.userId" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleSubmitInfo">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import CustomInput from '@/components/cdp-ui/custom-input'
import UserSelectTable from '@/views/components/user-select-table'
export default {
  components: {
    CustomInput,
    UserSelectTable
  },
  data() {
    function validateAge(rule, value, callback) {
      try {
        if (value === '') {
          callback('请输入年龄')
        }
        if (!value.match(/^\d+$/)) {
          callback('请输入数字')
        }
        if (value * 1 < 0 || value * 1 > 150) {
          callback('请输入合理的年龄值')
        }
        callback()
      } catch (err) {
        console.log(err)
        callback('请输入年龄')
      }
    }

    function validateAgeRandomValue(rule, value, callback) { // 对自定义组件的值进行自定义校验规则
      try {
        if (value === '') {
          callback('请输入随机数')
        }
        if (value < 3) {
          callback('太小了')
        }
        if (value > 7) {
          callback('太大了')
        }
        callback()
      } catch (err) {
        callback('出错了')
      }
    }
    function validateUserIdValue(rule, value, callback) { // 对自定义组件的值进行自定义校验规则
      try {
        if (value === '') {
          callback('请输入随机数')
        }
        if (value < 3) {
          callback('太小了')
        }
        if (value > 7) {
          callback('太大了')
        }
        callback()
      } catch (err) {
        callback('出错了')
      }
    }
    return {
      hobby: '',
      hobbies: ['篮球', '读书', '游戏', '唱歌', '跳舞'],
      userInfo: {
        name: '',
        age: '',
        gender: '1',
        hobby: [],
        birthday: '',
        randomValue: '',
        userId: null
      },
      rules: {
        name: [{ required: true, message: '请输入姓名' }],
        age: [{ validator: validateAge, trigger: 'change' }],
        randomValue: [{ required: true, message: '请输入一个随机值' }, { validator: validateAgeRandomValue }], // 自定义规则
        userId: [{ required: true, message: '请选择用户' }, { validator: validateUserIdValue }]
      }
    }
  },
  methods: {
    handleAddHooby() {
      if (this.hobbies.includes(this.hobby)) {
        return
      }
      this.hobbies.push(this.hobby)
      this.hobby = ''
    },
    handleSubmitInfo() {
      this.$refs.form.validate((error, errrorInfo) => {
        console.log(error)
        if (error) {
          return
        }
        console.log(this.userInfo)
      })
    }
  }
}
</script>
