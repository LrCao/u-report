<template>
  <div class="tpf-mf-layout">
    <div class="tpf-mf-layout--left">
      <!-- 左侧组件 -->
      <Items :componentsList="componentsList"></Items>
    </div>
    <!-- 中间编辑 -->
    <div class="tpf-mf-layout--center">
      <Content @change="contentChange" @select-change="contentSelectChange"></Content>
    </div>
    <!-- 组件属性设置 -->
    <div class="tpf-mf-layout--right">
      <Setting :data="settingData" v-if="form.formDataList.length && settingData"></Setting>
    </div>
  </div>
</template>

<script>
import Items from './Items'
import Content from './Content'
import Setting from './Setting'
import componentsList from '../configForm'

const exceptComponents = ['Link', 'Divider']

export default {
  name: 'MakeFormLayout',
  components: { Items, Content, Setting },
  provide() {
    return {
      formData: this.form,
      contentSelectChange: this.contentSelectChange,
    }
  },
  data() {
    return {
      componentsList: componentsList,
      form: {
        formDataList: [],
        formStyle: {
          hideLabel: false,
          labelWidth: '85px',
          labelPosition: 'right',
          showRequiredAsterisk: true,
          showVerificationMessage: true,
          size: 'medium',
          labelSuffix: ':',
        },
        model: {},
      },
      settingData: null,
    }
  },
  methods: {
    $getFormDataJSON() {
      this.form.formDataList.forEach((item) => {
        if (item.name === 'Layout') {
          item.setting.colList.forEach((col) => {
            if (col && exceptComponents.indexOf(col.name) === -1) {
              this.form.model[col.fieldId] = col.value
            }
          })
        } else if (exceptComponents.indexOf(item.name) === -1) {
          this.form.model[item.fieldId] = item.value
        }
      })
      return JSON.stringify(this.form)
    },
    $getFormDataByVueSet() {
      this.form.formDataList.forEach((item) => {
        if (item.name === 'Layout') {
          item.setting.colList.forEach((col) => {
            if (col && exceptComponents.indexOf(col.name) === -1) {
              this.$set(this.form.model, col.fieldId, col.value)
            }
          })
        } else if (exceptComponents.indexOf(item.name) === -1) {
          this.$set(this.form.model, item.fieldId, item.value)
        }
      })
      return this.form
    },
    contentSelectChange(item) {
      this.settingData = item
    },
    contentChange(list) {
      this.form.formDataList = list
    },
  },
}
</script>
