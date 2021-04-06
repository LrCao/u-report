<!--
* 中间页面编辑部分
-->
<template>
  <div class="tpf-mf-layout--content">
    <div class="tpf-mf-layout--content--header">
      <div class="tpf-mf-layout--content--header--place"></div>
      <el-button
        class="tpf-mf-layout--content--header--btn"
        type="text"
        icon="el-icon-copy-document"
        @click="showForm"
        >查看表单</el-button
      >
      <!-- <el-button
        class="tpf-mf-layout--content--header--btn"
        type="text"
        icon="el-icon-view"
        @click="showJSON"
        >查看JSON</el-button -->
      >
    </div>
    <tp-form-box class="tpf-mf-layout--content--form" :formData="formData">
      <draggable
        class="tpf-mf-layout--content--draggable"
        v-model="formData.formDataList"
        :disabled="main.isShow"
        group="TpFormGroup"
        animation="300"
      >
        <which-component
          v-for="li in formData.formDataList"
          :key="li.fieldId"
          :data="li"
          @click.native="clickComponent(li)"
        ></which-component>
      </draggable>
    </tp-form-box>
    <el-dialog title="查看表单" :visible.sync="showFormVisible" width="600px">
      <tp-form v-if="showFormVisible" :formData="form"></tp-form>
    </el-dialog>
    <el-dialog title="查看JSON" :visible.sync="showJSONVisible" width="600px">
      <json-viewer v-if="showJSONVisible" :value="json" :expand-depth="2"></json-viewer>
    </el-dialog>
  </div>
</template>

<script>
import draggable from 'vuedraggable'
import TpFormBox from '../componentList/common/FormBox'
import WhichComponent from '../componentList/WhichComponent.vue'
import JsonViewer from 'vue-json-viewer'
// import _ from 'lodash'
export default {
  name: 'Content',
  components: { draggable, TpFormBox, WhichComponent, JsonViewer },
  inject: ['formData', 'main'],
  data() {
    return {
      showFormVisible: false,
      showJSONVisible: false,
      json: '{}',
      form: {},
    }
  },
  watch: {
    'formData.formDataList': {
      handler(v) {
        this.$emit('change', v)
      },
      deep: true,
    },
  },
  methods: {
    clickComponent(item) {
      this.formData.formDataList.forEach((f) => {
        if (f.name === 'Layout') {
          f.setting.colList.forEach((c) => {
            if (c) {
              console.log('abc:', c)
              c && (c.makeStyle.active = false)
            }
          })
        }
        if (f === item) f.makeStyle.active = true
        else f.makeStyle.active = false
      })
      this.$emit('select-change', item)
    },
    showForm() {
      this.main.isShow = !this.main.isShow
      // this.form = this.$parent.$getFormDataByVueSet()
      // this.showFormVisible = true
      // this.$store.state.formData = this.formData
      // this.$router.push('/show')
      // let routerUrl = this.$router.resolve({ path: '/show' })
      // window.open(routerUrl.href, '_blank')
    },
    showJSON() {
      this.json = this.$parent.$getFormDataByVueSet()
      this.showJSONVisible = true
    },
  },
}
</script>
