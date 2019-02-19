<template>
  <div class="page">
    <div class="search-panel">
      <!-- <div class="search-inner">
        <el-date-picker v-model="dateSelected" type="datetimerange" start-placeholder="开始日期" end-placeholder="结束日期" :default-time="['12:00:00']"></el-date-picker>
        <input type="text" class="input" v-model="searchParams.connector" placeholder="请输入接口">
        <input type="text" class="input" v-model="searchParams.mobile" placeholder="请输入手机号">
        <input type="text" class="input" v-model="searchParams.uuid" placeholder="请输入UUID">
        <button class="btn search-btn" @click="searchAction">搜索</button>
      </div> -->
      <el-form autoComplete="on" :model="searchParams" :rules="logSearchRules" ref="logSearch" label-position="left" label-width="0px">
        <el-row :gutter="10">
          <el-col :span="2">
            <el-select v-model="searchParams.project" placeholder="请选择">
              <el-option
                v-for="item in projectsOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-col>
          <el-col :span="6">
            <el-date-picker v-model="dateSelected" type="datetimerange" start-placeholder="开始日期" end-placeholder="结束日期" :default-time="['12:00:00']"></el-date-picker>
          </el-col>
          <el-col :span="4">
            <el-input v-model="searchParams.call" clearable placeholder="请输入接口"></el-input>
          </el-col>
          <el-col :span="4">
            <el-form-item prop="mobileNo">
              <el-input v-model="searchParams.mobileNo" clearable placeholder="请输入手机号"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-input v-model="searchParams.uuid" clearable placeholder="请输入UUID"></el-input>
          </el-col>
          <el-col :span="2">
            <button class="btn search-btn" @click.prevent="searchAction">搜索</button>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div class="result-panel">
      <div class="result-panel-toolbar">
        <h3 class="result-panel-title">日志 客户端与麦广服务器 <span v-if="appLogRecord.length > 0">共{{appLogRecord.length}}条</span></h3>
        <div class="result-panel-action">
          <span @click="toggleLogItemType"><i class="fa" :class="[toggleLogItemVisibleClass.type]" aria-hidden="true" text="是否显示多个"></i></span>
          <span @click="toggleLogItemVisible"><i class="fa" :class="[toggleLogItemVisibleClass.visible]" aria-hidden="true"></i></span>
        </div>
      </div>
      <el-collapse v-if="appLogRecord.length > 0" v-model="activeLogIndexs" class="result-pannel-inner" :accordion="toggleLogItemVisibleClass.type === 'fa-window-minimize'">
        <el-collapse-item v-for="(log, index) in appLogRecord" :key="index" :name="index" @hover="addActiveNamesAction(index)">
          <template slot="title">
            <span class="text-label text-label-blue">{{log.dateTime | dateFormatter}}</span>
            <span class="text-label">{{log.call}}（{{interfaceCN[log.call]}}）</span>
          </template>
          <el-row :gutter="20">
            <el-col :span="24">
              <el-row class="text-center">
                <el-col>客户端与麦广服务器</el-col>
              </el-row>
              <el-row :gutter="5">
                <el-col :span="12">
                  <p class="text-center">请求</p>
                  <div v-html="log.request" class="pre"></div>
                </el-col>
                <el-col :span="12">
                  <p class="text-center">响应</p>
                  <div v-html="log.response" class="pre"></div>
                </el-col>
              </el-row>
            </el-col>
            <!-- <el-col :span="12">
              <el-row class="text-center">
                <el-col>麦广服务器与合作方服务器</el-col>
              </el-row>
              <el-row :gutter="5">
                <el-col :span="12">
                  <p class="text-center">请求</p>
                  <div v-html="log.partner.request" class="pre"></div>
                </el-col>
                <el-col :span="12">
                  <p class="text-center">响应</p>
                  <div v-html="log.partner.response" class="pre"></div>
                </el-col>
              </el-row>
            </el-col> -->
          </el-row>
        </el-collapse-item>
      </el-collapse>
      <div v-else class="no-data">暂无数据</div>
    </div>

    <div class="result-panel">
      <div class="result-panel-toolbar">
        <h3 class="result-panel-title">日志 麦广服务器与合作方服务器 <span v-if="partnerLogRecord.length > 0">共{{partnerLogRecord.length}}条</span></h3>
        <div class="result-panel-action">
          <span @click="toggleLogItemType"><i class="fa" :class="[toggleLogItemVisibleClass.type]" aria-hidden="true" text="是否显示多个"></i></span>
          <span @click="toggleLogItemVisible"><i class="fa" :class="[toggleLogItemVisibleClass.visible]" aria-hidden="true"></i></span>
        </div>
      </div>
      <el-collapse v-if="partnerLogRecord.length > 0" v-model="activeLogIndexs" class="result-pannel-inner" :accordion="toggleLogItemVisibleClass.type === 'fa-window-minimize'">
        <el-collapse-item v-for="(log, index) in partnerLogRecord" :key="index" :name="index" @hover="addActiveNamesAction(index)">
          <template slot="title">
            <span class="text-label text-label-blue">{{log.dateTime | dateFormatter}}</span>
            <span class="text-label">{{log.call}}（{{interfaceCN[log.call]}}）</span>
          </template>
          <el-row :gutter="20">
            <!-- <el-col :span="12">
              <el-row class="text-center">
                <el-col>客户端与麦广服务器</el-col>
              </el-row>
              <el-row :gutter="5">
                <el-col :span="12">
                  <p class="text-center">请求</p>
                  <div v-html="log.request" class="pre"></div>
                </el-col>
                <el-col :span="12">
                  <p class="text-center">响应</p>
                  <div v-html="log.response" class="pre"></div>
                </el-col>
              </el-row>
            </el-col> -->
            <el-col :span="12">
              <el-row class="text-center">
                <el-col>麦广服务器与合作方服务器</el-col>
              </el-row>
              <el-row :gutter="5">
                <el-col :span="12">
                  <p class="text-center">请求</p>
                  <div v-html="log.request" class="pre"></div>
                </el-col>
                <el-col :span="12">
                  <p class="text-center">响应</p>
                  <div v-html="log.response" class="pre"></div>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
        </el-collapse-item>
      </el-collapse>
      <div v-else class="no-data">暂无数据</div>
    </div>
  </div>
</template>

<script>
import { getLogDataReg } from 'config/api.js'
import { dateFormatter, validateMobileNo } from 'config/com.js'
import { interfaceMap } from 'config/map.js'

export default {
  data () {
    const validatorMobileNo = (rule, value, callback) => {
      if (value !== '' && !validateMobileNo(value)) {
        callback(new Error('请输入正确手机号'))
      } else {
        callback()
      }
    }

    return {
      projectsOptions: [
        {label: '乐贷款', value: 'ldk'},
        {label: '卡还王', value: 'khw'},
        {label: '又一贷', value: 'yyd'},
        {label: '乐一贷', value: 'lyd'},
        {label: '包贷款', value: 'bdk'}
      ],
      appLogRecord: [],
      partnerLogRecord: [],
      allLogIndexs: [],
      activeLogIndexs: [],
      toggleLogItemVisibleClass: {
        visible: 'fa-expand',
        type: 'fa-bars'
      },
      dateSelected: '',
      searchParams: {
        project: 'lyd',
        minDate: '',
        maxDate: '',
        call: '',
        mobileNo: '',
        uuid: ''
      },
      // 中文接口名
      interfaceCN: {},
      logSearchRules: {
        mobileNo: [{ trigger: 'change', validator: validatorMobileNo }, { trigger: 'blur', validator: validatorMobileNo }]
      }
    }
  },
  mounted () {
    // this.getLogData()
  },
  methods: {
    toggleLogItemVisible () {
      if (this.activeLogIndexs.length > 0) {
        this.activeLogIndexs = []
        this.toggleLogItemVisibleClass.visible = 'fa-expand'
      } else {
        this.activeLogIndexs = this.allLogIndexs
        this.toggleLogItemVisibleClass.visible = 'fa-compress'
      }
    },
    toggleLogItemType () {
      if (this.toggleLogItemVisibleClass.type === 'fa-bars') {
        this.toggleLogItemVisibleClass.type = 'fa-window-minimize'
      } else {
        this.toggleLogItemVisibleClass.type = 'fa-bars'
      }
    },
    addActiveNamesAction (index) {
      this.activeNames.push(index)
    },
    searchAction () {
      this.$refs.logSearch.validate(valid => {
        if (!valid) {
          return false
        } else {
          /**
           * @description 点击【搜索】按钮操作
           */
          if (this.dateSelected) {
            this.searchParams.minDate = dateFormatter(this.dateSelected[0], 1)
            this.searchParams.maxDate = dateFormatter(this.dateSelected[1], 1)
          }
          this.getLogData(this.searchParams)
        }
      })
    },
    jsonFormatterFun (arr) {
      /**
       * @description 将json字符串格式化显示在浏览器中
       * @param {json数组} arr
       * @returns {json数组} arr
       */
      for (var i = 0; i < arr.length; i++) {
        this.allLogIndexs.push(i)
        arr[i].args = JSON.stringify(JSON.parse(arr[i].args), undefined, 2)
        arr[i].args = arr[i].args.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/\n/g, '<br/>').replace(/\s/g, '&nbsp;&nbsp;')
        arr[i].args = arr[i].args.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+-]?\d+)?)/g, function (match) {
          var cls = 'number'
          if (/^"/.test(match)) {
            if (/:$/.test(match)) {
              // console.log(match)
              cls = 'key'
            } else {
              cls = 'string'
            }
          } else if (/true|false/.test(match)) {
            cls = 'boolean'
          } else if (/null/.test(match)) {
            cls = 'null'
          }
          return '<span class="' + cls + '">' + match + '</span>'
        })
      }

      return arr
    },
    formatter (value) {
      for (var key in value) {
        if (value[key][0] === '{' || value[key][0] === '[') {
          value[key] = JSON.parse(value[key])
        }
      }

      value = JSON.stringify(value, undefined, 2)
      value = value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/\n/g, '<br/>').replace(/\s/g, '&nbsp;&nbsp;')
      value = value.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+-]?\d+)?)/g, function (match) {
        var cls = 'number'
        if (/^"/.test(match)) {
          if (/:$/.test(match)) {
            cls = 'key'
          } else {
            cls = 'string'
          }
        } else if (/true|false/.test(match)) {
          cls = 'boolean'
        } else if (/null/.test(match)) {
          cls = 'null'
        }
        return '<span class="' + cls + '">' + match + '</span>'
      })

      return value
    },
    // 格式化 客户端与麦广服务器 请求
    jsonFormatterAppReq (arr) {
      if (arr.length === 0) return []

      var arrNew = []
      for (var i = 0; i < arr.length; i++) {
        this.allLogIndexs.push(i)

        arrNew[i] = {
          request: {},
          response: {}
        }

        arrNew[i].dateTime = arr[i].request.baseRequest.timeStamp
        arrNew[i].call = arr[i].request.baseRequest.call
        arrNew[i].response = arr[i].response

        arrNew[i].request = this.formatter(arr[i].request)
        if (i === arr.length - 1) {
          return arrNew
        }
      }
    },
    // 格式化 客户端与麦广服务器 响应
    jsonFormatterAppRes (arr) {
      if (arr.length === 0) return []

      var arrNew = []
      for (var i = 0; i < arr.length; i++) {
        arrNew[i] = {
          request: {},
          response: {}
        }

        arrNew[i].dateTime = arr[i].dateTime
        arrNew[i].call = arr[i].call
        arrNew[i].request = arr[i].request

        arrNew[i].response = this.formatter(arr[i].response)
        if (i === arr.length - 1) {
          return arrNew
        }
      }
    },
    // 格式化 麦广服务器与合作方服务器 请求
    jsonFormatterPartnerReq (arr) {
      if (arr.length === 0) return []

      var arrNew = []
      for (var i = 0; i < arr.length; i++) {
        arrNew[i] = {
          request: {},
          response: {}
        }

        arrNew[i].dateTime = arr[i].dateTime
        arrNew[i].call = arr[i].call
        arrNew[i].response = arr[i].response

        arrNew[i].request = this.formatter(arr[i].request)
        if (i === arr.length - 1) {
          return arrNew
        }
      }
    },
    // 格式化 麦广服务器与合作方服务器 响应
    jsonFormatterPartnerRes (arr) {
      if (arr.length === 0) return []

      var arrNew = []
      for (var i = 0; i < arr.length; i++) {
        arrNew[i] = {
          request: {},
          response: {}
        }

        arrNew[i].dateTime = arr[i].dateTime
        arrNew[i].call = arr[i].call
        arrNew[i].request = arr[i].request

        arrNew[i].response = this.formatter(arr[i].response)
        if (i === arr.length - 1) {
          return arrNew
        }
      }
    },
    getLogData (params) {
      this.interfaceCN = interfaceMap[this.searchParams.project]
      /**
       * @description 请求日志记录
       */
      // if (!params) {
      //   params = {
      //     minDate: '',
      //     maxDate: '',
      //     call: '',
      //     mobileNo: '',
      //     uuid: ''
      //   }
      // }
      params = {
        minDate: '2018-08-20 10:58:30',
        maxDate: '2018-08-20 10:58:35',
        call: '',
        mobileNo: '',
        uuid: ''
      }
      getLogDataReg(params).then(res => {
        var data = res.data
        // if (data) {
        //   data.forEach((item, index, arr) => {
        //     arr.sort((a, b) => {
        //       return new Date(b.app.request.dateTime).getTime() - new Date(a.app.request.dateTime).getTime()
        //     })
        //   })

        // 客户端与麦广服务器
        this.appLogRecord = data.applist
        this.appLogRecord = this.jsonFormatterAppReq(this.appLogRecord)
        this.appLogRecord = this.jsonFormatterAppRes(this.appLogRecord)

        // 麦广服务器与合作方服务器
        this.partnerLogRecord = data.partnerlist
        this.partnerLogRecord = this.jsonFormatterPartnerReq(this.partnerLogRecord)
        this.partnerLogRecord = this.jsonFormatterPartnerRes(this.partnerLogRecord)
      }).catch(err => {
        console.log(err)
      })
    }
  },
  filters: {
    logFormatter (val) {
      val = JSON.parse(val)
      console.log(val)
      var result = JSON.stringify(val, null, 2)
      return result
    },
    dateFormatter (val) {
      return new Date(val).toLocaleString()
    }
  }
}
</script>

<style>
:-moz-placeholder { /* Mozilla Firefox 4 to 18 */
  color: #C0C4CC;
  opacity: 1;
}
::-moz-placeholder { /* Mozilla Firefox 19+ */
  color: #C0C4CC;
  opacity: 1;
}
input:-ms-input-placeholder{
  color: #C0C4CC;
  opacity: 1;
}
input::-webkit-input-placeholder{
  color: #C0C4CC;
  opacity: 1;
}
.page {
  /* height: 100%; */
  min-height: 100%;
  background: #f5f5f5;
  padding: 0 10px;
}
.search-panel {
  /* padding: 10px; */
  padding: 18px 10px 0;
  background: #fff;
}
.search-inner {
  display: inline-block;
  padding-right: 60px;
  position: relative;
}
.input {
  border: 1px solid #DCDFE6;
  border-radius: 3px;
  height: 28px;
  vertical-align: top;
  padding: 0 4px;
}
.btn {
  border-radius: 6%;
  border: none;
  height: 30px;
  cursor: pointer;
}
.search-btn {
  /* position: absolute;
  right: 0;
  bottom: 0; */
  padding: 0 10px;
  background: #7266BA;
  color: #fff;
}
.result-panel {
  /* height: 92%; */
  border: 1px solid #E7EAEC;
  /* overflow: hidden; */
}
.result-pannel-inner {
  height: 100%;
  /* overflow: auto; */
}
.result-panel-toolbar {
  font-size: 18px;
  margin: 0;
  padding: 10px;
  background: #F6F8F8;
  border-bottom: 1px solid #E7EAEC;
  margin-bottom: -1px;
  position: relative;
  overflow: hidden;
}
.result-panel-title {
  float: left;
  font-size: 18px;
}
.result-panel-action {
  float: right;
}
.result-panel-action i {
  cursor: pointer;
  padding: 2px 6px;
  border: 1px solid transparent;
}
.result-panel-action i:hover {
  border: 1px solid #ccc;
  border-radius: 10%;
}
.pre {color: #fff; outline: 1px solid #ccc; padding: 5px; line-height: 1.2; background: #23241F;}
.pre p {margin: 0; padding: 0;}
.string { color: #C78A1F; }
.number { color: #AE81FF; }
.boolean { color: blue; }
.null { color: magenta; }
.key { color: #F8F8F2;}
.text-label {
  display: inline-block;
  height: 60%;
  line-height: 1.4;
  vertical-align: middle;
  padding: 0 6px;
}
.text-label-blue {
  border: 1px solid #CAE5FF;
  background: #ECF6FF;
  color: #409EFF;
  border-radius: 3px;
}
.el-collapse-item__header {
  padding-left: 10px;
  height: 34px !important;
  line-height: 34px !important;
}
.el-collapse-item__arrow{
  line-height: 34px !important;
}
.el-date-editor--datetimerange.el-input__inner {
  /* width: 340px; */
  width: 100% !important;
}
.el-range-editor--small.el-input__inner {
  height: 30px;
}
.el-range-editor.el-input__inner {
  padding: 0 4px;
}
.el-date-editor .el-range-input {
  width: 39%;
}

.text-center {
  text-align: center;
}
.no-data {
  padding: 20px 0;
  text-align: center;
  font-size: 20px;
  color: #999;
}
</style>
