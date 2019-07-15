<template>
  <div class="page">
    <div class="search-panel">
      <el-form autoComplete="on" :model="searchParams" :rules="logSearchRules" ref="logSearch" label-position="left" label-width="0px">
        <el-row :gutter="10">
          <el-col :span="2">
            <!-- <el-select v-model="searchParams.project" placeholder="请选择">
              <el-option
                v-for="item in projectsOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select> -->
          </el-col>
          <el-col :span="6">
            <el-date-picker v-model="dateSelected" type="datetimerange" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
          </el-col>
          <el-col :span="4">
            <el-input v-model="searchParams.call" clearable placeholder="接口"></el-input>
          </el-col>
          <el-col :span="4">
            <el-form-item prop="mobileNo">
              <el-input v-model="searchParams.mobileNo" clearable placeholder="手机号" maxlength="11"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="3">
            <el-input v-model="searchParams.uuid" clearable placeholder="UUID"></el-input>
          </el-col>
          <el-col :span="3">
            <el-input v-model="searchParams.customerId" clearable placeholder="customerId"></el-input>
          </el-col>
          <el-col :span="2">
            <button class="btn search-btn" @click.prevent="searchAction">搜索</button>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div class="result-panel">
      <div class="result-panel-toolbar">
        <h3 class="result-panel-title">日志 共{{logRecord.length}}条</h3>
        <!-- <div class="result-panel-action">
          <span @click="toggleLogItemType"><i class="fa" :class="[toggleLogItemVisibleClass.type]" aria-hidden="true" text="是否显示多个"></i></span>
          <span @click="toggleLogItemVisible"><i class="fa" :class="[toggleLogItemVisibleClass.visible]" aria-hidden="true"></i></span>
        </div> -->
      </div>
      <el-collapse v-if="logRecord.length > 0" v-model="activeLogIndexs" class="result-pannel-inner" :accordion="toggleLogItemVisibleClass.type === 'fa-window-minimize'">
        <el-collapse-item v-for="(log, index) in logRecord" :key="index" :name="index" @hover="addActiveNamesAction(index)">
          <template slot="title">
            <span class="text-label text-label-blue">{{log.dateTime | dateTimeFormatter}}</span>
            <span class="text-label">{{log.call}}（{{interfaceMap61[log.call]}}）</span>
            <span class="text-right">{{log.mobileNo}}</span>
          </template>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-row class="text-center">
                <el-col>客户端与麦广服务器</el-col>
              </el-row>
              <el-row :gutter="5">
                <el-col :span="12">
                  <p class="text-center">请求</p>
                  <div v-html="log.app.request" class="pre"></div>
                </el-col>
                <el-col :span="12">
                  <p class="text-center">响应</p>
                  <div v-html="log.app.response" class="pre"></div>
                </el-col>
              </el-row>
            </el-col>
            <el-col :span="12">
              <el-row class="text-center">
                <el-col>麦广服务器与合作方服务器</el-col>
              </el-row>
              <el-row :gutter="5">
                <el-col :span="12">
                  <p class="text-center">请求</p>
                  <!-- <div v-if="index <= 10" v-html="log.partner.request" class="pre"></div> -->
                  <div v-html="log.partner.request" class="pre"></div>
                  <!-- <div class="pre">1</div> -->
                </el-col>
                <el-col :span="12">
                  <p class="text-center">响应</p>
                  <!-- <div v-html="log.partner.response" class="pre"></div> -->
                  <div v-html="log.partner.response" class="pre"></div>
                  <!-- <div class="pre">2</div> -->
                </el-col>
              </el-row>
            </el-col>
          </el-row>
        </el-collapse-item>
      </el-collapse>
    </div>
  </div>
</template>

<script>
import { getLogDataReg } from 'config/api.js'
import { dateFormatter, validateMobileNo } from 'config/com.js'
import { interfaceMap61 } from 'config/map.js'

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
      logRecord: [],
      allLogIndexs: [],
      activeLogIndexs: [],
      toggleLogItemVisibleClass: {
        visible: 'fa-expand',
        type: 'fa-bars'
      },
      dateSelected: '',
      searchParams: {
        // project: 'lyd',
        minDate: '',
        maxDate: '',
        call: '',
        mobileNo: '',
        uuid: '',
        customerId: ''
      },
      // 中文接口名
      // interfaceCN: {},
      interfaceMap61: interfaceMap61,
      logSearchRules: {
        mobileNo: [{ trigger: 'change', validator: validatorMobileNo }, { trigger: 'blur', validator: validatorMobileNo }]
      }
    }
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
          } else {
            this.searchParams.minDate = ''
            this.searchParams.maxDate = ''
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
      // function obj (value) {
      //   for (var key in value) {
      //     let val = value[key]
      //     val = JSON.stringify(val)
      //     if (val && val.length > 0) {
      //       let first = val[0]
      //       let last = val[val.length - 1]
      //       if ((first === '{' && last === '}') || (first === '[' && last === ']')) {
      //         obj(value[key])
      //       }
      //       if (val.length > 1) {
      //         let second = val[1]
      //         let secondLast = val[val.length - 2]
      //         if ((second === '{' && secondLast === '}') || (second === '[' && secondLast === ']')) {
      //           obj(JSON.parse(value[key]))
      //         }
      //       }
      //     }
      //   }
      // }
      // obj(value)

      value = JSON.stringify(value, null, 2)
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
          app: {
            request: {},
            response: {}
          },
          partner: {
            request: {},
            response: {}
          }
        }

        arrNew[i].dateTime = arr[i].app.request.baseRequest.timeStamp
        arrNew[i].call = arr[i].app.request.baseRequest.call
        arrNew[i].mobileNo = (arr[i].app.request.baseRequest.args.head || {}).mobileNo

        arrNew[i].app.response = arr[i].app.response
        arrNew[i].partner = arr[i].partner

        if (arr[i].app && arr[i].app.request) {
          arrNew[i].app.request = this.formatter(arr[i].app.request)
        }
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
          app: {
            request: {},
            response: {}
          },
          partner: {
            request: {},
            response: {}
          }
        }

        arrNew[i].dateTime = arr[i].dateTime
        arrNew[i].call = arr[i].call
        arrNew[i].mobileNo = arr[i].mobileNo

        arrNew[i].app.request = arr[i].app.request
        arrNew[i].partner = arr[i].partner

        if (arr[i].app && arr[i].app.response) {
          arrNew[i].app.response = this.formatter(arr[i].app.response)
        }
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
          app: {
            request: {},
            response: {}
          },
          partner: {
            request: {},
            response: {}
          }
        }

        arrNew[i].dateTime = arr[i].dateTime
        arrNew[i].call = arr[i].call
        arrNew[i].mobileNo = arr[i].mobileNo

        arrNew[i].app = arr[i].app

        if (arr[i].partner) {
          if (arr[i].partner.request) {
            arrNew[i].partner.request = this.formatter(arr[i].partner.request)
          }
          if (arr[i].partner.response) {
            arrNew[i].partner.response = arr[i].partner.response
          }
        }

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
          app: {
            request: {},
            response: {}
          },
          partner: {
            request: {},
            response: {}
          }
        }

        arrNew[i].dateTime = arr[i].dateTime
        arrNew[i].call = arr[i].call
        arrNew[i].mobileNo = arr[i].mobileNo

        arrNew[i].app = arr[i].app
        if (arr[i].partner) {
          if (arr[i].partner.request) {
            arrNew[i].partner.request = arr[i].partner.request
          }
          if (arr[i].partner.response) {
            arrNew[i].partner.response = this.formatter(arr[i].partner.response)
          }
        }

        if (i === arr.length - 1) {
          return arrNew
        }
      }
    },
    getLogData (params) {
      this.logRecord = []
      // this.interfaceCN = interfaceMap[this.searchParams.project]
      /**
       * @description 请求日志记录
       */
      if (!params) {
        params = {
          minDate: '',
          maxDate: '',
          call: '',
          mobileNo: '',
          uuid: ''
        }
      }
      // params = {
      //   minDate: '2018-11-22 20:00:00',
      //   maxDate: '2018-11-23 00:00:00',
      //   call: 'Protocol.queryAcctInfo',
      //   mobileNo: '',
      //   uuid: ''
      // }
      getLogDataReg(params).then(res => {
        var data = res.data
        // console.log(data)
        // console.log(JSON.parse(JSON.stringify(res.data)))

        if (data.returnCode === '000000') {
          // data.list.forEach((item, index, arr) => {
          //   arr.sort((a, b) => {
          //     return b.app.request.baseRequest.timeStamp - a.app.request.baseRequest.timeStamp
          //   })
          // })

          this.logRecord = data.list
          // 客户端与麦广服务器
          this.logRecord = this.jsonFormatterAppReq(this.logRecord)
          this.logRecord = this.jsonFormatterAppRes(this.logRecord)
          // 麦广服务器与合作方服务器
          this.logRecord = this.jsonFormatterPartnerReq(this.logRecord)
          this.logRecord = this.jsonFormatterPartnerRes(this.logRecord)
        } else {
          this.$message({
            message: data.returnMsg,
            type: 'warning',
            showClose: true
          })
        }
      }).catch(err => {
        console.error('请求日志记录报错', err)
        console.error('请求日志记录报错', err.message)
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
    },
    dateTimeFormatter (val) {
      function zeroPadding (num) {
        num = parseInt(num)
        if (num < 10) {
          return '0' + num
        } else {
          return num
        }
      }
      let time = new Date(val)
      let year = time.getFullYear()
      let month = time.getMonth() + 1
      let date = time.getDate()
      let hour = time.getHours()
      let minute = time.getMinutes()
      let second = time.getSeconds()
      return year + '-' + zeroPadding(month) + '-' + zeroPadding(date) + ' ' + hour + ':' + zeroPadding(minute) + ':' + zeroPadding(second)
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
.pre { max-height: 600px; padding: 5px; line-height: 1.2; overflow: auto; color: #fff; outline: 1px solid #ccc; background: #23241F;}
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

.el-collapse-item__header {
  position: relative;
}
.el-collapse-item__arrow {
  position: absolute;
  top: 0;
  right: 8px;
}
.text-right {
  position: absolute;
  top: 0;
  right: 35px;
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

::-webkit-scrollbar { /*滚动条整体样式*/
  width: 8px; /*高宽分别对应横竖滚动条的尺寸*/
  height: 8px;
}
::-webkit-scrollbar-thumb { /*滚动条里面小方块*/
  border-radius: 4px;
  -webkit-box-shadow: inset 0 0 5px rgba(243, 11, 11, 0.2);
  background: #535353;
}
::-webkit-scrollbar-track { /*滚动条里面轨道*/
  -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
  /* border-radius: 10px; */
  background: #EDEDED;
}
</style>
