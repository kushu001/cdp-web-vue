<template>
  <div>
    <el-input v-model="val" placeholder="请选择" class="input-with-select" style="font-size:10px" :readonly="true">
      <el-button slot="prepend" :icon="val" />
      <el-button slot="append" icon="el-icon-s-grid" @click="dialogTableVisible = true" />
    </el-input>
    <el-dialog title="选择图标" :fullscreen="false" width="1000px" :visible.sync="dialogTableVisible" :append-to-body="true">
      <el-tabs>
        <el-tab-pane label="ElementUI">
          <ul style="height:400px;overflow:auto;padding-top:1px">
            <li v-for="icon in elementIcons" :key="icon" @click="confirm(icon)">
              <div class="icon center">
                <i :class="icon" />
              </div>
              <div class="title center">{{ icon }}</div>
            </li>
          </ul>
        </el-tab-pane>
        <el-tab-pane label="Alibaba Console">
          <ul style="height:400px;overflow:auto;padding-top:1px">
            <li v-for="icon in cdpIcons" :key="icon" @click="confirm(icon)">
              <div class="icon center">
                <i :class="icon" />
              </div>
              <div class="title center">{{ icon }}</div>
            </li>
          </ul>
        </el-tab-pane>
      </el-tabs>
    </el-dialog>
  </div>
</template>
<script>
import cdpIcon from '@/assets/icons/iconfont.json'
import elementIcons from './element-icons'
export default {
  props: {
    value: {
      type: [String, Number],
      default: null
    }
  },
  data() {
    const { font_family, css_prefix_text } = cdpIcon
    return {
      dialogTableVisible: false,
      cdpIcons: cdpIcon.glyphs.map(item => `${font_family} ${css_prefix_text}${item.font_class}`),
      elementIcons,
      val: null
    }
  },
  watch: {
    value(val) {
      if (val) {
        // get(`${this.url}/${val}`).then(({ data: res }) => {
        //   if (res.code === 200) {
        //     const { data } = res
        //     this.val = data[this.name]
        //   }
        // })
        this.val = val
      } else {
        this.val = ''
      }
    }
  },
  methods: {
    confirm(infor) {
      this.val = infor
      this.$emit('input', infor)
      this.dialogTableVisible = false
    }
  }
}
</script>
<style scoped>
ul,li{
  list-style: none;
}
ul {
  display: flex;
  flex-wrap: wrap;
}
ul>li {
  width: 95px;
  height: 90px;
  border: 1px solid #eee;
  margin-left: -1px;
  margin-top: -1px;
}
ul li:hover{
  background: #ff4949;
  cursor: pointer;
  color: white;
}
ul li .icon {
  font-size: 30px;
  margin-top: 10px;
}
ul li .center{
  text-align: center;
}

ul li .title {
  font-size: 10px;
  margin: 0 10px;
}
</style>
