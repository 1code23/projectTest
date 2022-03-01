import { Message } from 'element-ui'
import moment from 'moment'
import XLSX from 'xlsx'
// 导出文件方法
/**
 *
 *  @param {list} 导出数据
 *  @param {tHeader} 导出数据对应的表头数据
 *  @param {filename} 导出文件名
 */
// export default function exportExcel({ tHeader = [], list = [], filename = '导出数据' }) {
//   if (!arguments[0].tHeader || !arguments[0].list) {
//     Message.warning('导出表格传参格式有误')
//     return Promise.reject(false)
//   }
//   return new Promise((resolve, reject) => {
//     const nowTime = moment(new Date()).format('YYYYMMDDHHmmss')
//     // tHeader: ['名称/name', '时间/time']
//     const header = []; const keys = []
//     tHeader.map(t => {
//       const splitArr = t.split('/') || []
//       header.push(splitArr[0])
//       keys.push(splitArr[1])
//     })
//     import('@/vendor/Export2Excel').then(excel => {
//       // 导出表格头部内容（要与下面字段对照）
//       const data = formatJson(list, keys)
//       // 保存excel
//       excel.export_json_to_excel({
//         header: header,
//         data,
//         // 导出的文件名
//         filename: `${filename}-${nowTime}`
//       })
//       resolve(true)
//     }).catch(err => {
//       reject(false)
//     })
//   })
// }
// function formatJson(list, keys) {
//   return list.map(v =>
//     keys.map(j => {
//       return v[j]
//     })
//   )
// }

export function exportExcel({
  tHeader = [],
  list = [],
  filename = '导出数据'
}) {
  if (!arguments[0].tHeader || !arguments[0].list) {
    Message.warning('导出表格传参格式有误')
    return Promise.reject(false)
  }
  return new Promise((resolve, reject) => {
    const nowTime = moment(new Date()).format('YYYYMMDDHHmmss')
    // tHeader: ['名称/name', '时间/time']
    const header = []
    const keys = []
    tHeader.map((t) => {
      //   const splitArr = t.split("/") || [];
      //   header.push(splitArr[0]);
      //   keys.push(splitArr[1]);
      //   const splitArr = t.split("/") || [];
      header.push(t.label) // 封装表格头部的中文
      keys.push(t.slot || t.key) // 封装表格头部的英文
    })
    console.log(header, keys, list)
    import('@/vendor/Export2Excel')
      .then((excel) => {
        // 导出表格头部内容（要与下面字段对照）
        const data = formatJson(list, keys)
        // 保存excel
        excel.export_json_to_excel({
          header: header,
          data,
          // 导出的文件名
          filename: `${filename}-${nowTime}`
        })
        resolve(true)
      })
      .catch((err) => {
        reject(false)
      })
  })
}
function formatJson(list, keys) {
  return list.map((v) =>
    keys.map((j) => {
      return v[j]
    })
  )
}

// 读取文件数据
// 文件选择时
// export function onChange(file) {
//   const fileData = file // 保存当前选择文件
//   return readExcel(fileData, function(outPuts) {
//     return outPuts
//   }) // 调用读取数据的方法
// }
// 导入表格文件
/**
 *
 *  @param {fileList} 导入表格数据
 *  @param [pagedHead] 导入表格表头字段中文
 *  @param [pageHeadE] 导入表格表头字段英文
 *  @param callback 转换后的json数据
 *
 * readExcel(xls文件,[’姓名’，‘年龄’]，['name','age'],function(outPuts) {
        console.log(outPuts)
      })
 */
export function readExcel(fileList, pagedHead, pageHeadE, callback) {
  const files = fileList
  let outputs = []
  if (!files) {
    // 如果没有文件
    return false
  } else if (!/\.(xls|xlsx)$/.test(files.name.toLowerCase())) {
    this.$message.error('上传格式不正确，请上传xls或者xlsx格式')
    return false
  }
  const fileReader = new FileReader()
  fileReader.onload = ev => {
    try {
      const data = ev.target.result
      const workbook = XLSX.read(data, {
        type: 'binary'
      })
      // 导入的文件名称
      console.log(workbook.SheetNames)
      const wsname = workbook.SheetNames[0] // 取第一张表
      const ws = XLSX.utils.sheet_to_json(workbook.Sheets[wsname]) // 生成json表格内容
      outputs = [] // 清空接收数据

      // const pagedHead = ['姓名', '年龄']
      // const pageHeadE = ['name', 'age']

      for (var i = 0; i < ws.length; i++) {
        console.log(ws)
        var sheetData = {
          // 键名为绑定 el 表格的关键字，值则是 ws[i][对应表头名]
          // 此处的字段名对应 上面表格数据的字段名
          // age: ws[i]['年龄'],
          // name: ws[i]['姓名'],
          // adrr: ws[i]['地址']
        }
        pageHeadE.forEach((heade, index) => {
          sheetData[heade] = ws[i][pagedHead[index]]
        })
        outputs.push(sheetData)
      }
      callback(outputs)
      return outputs
    } catch (e) {
      console.log(e)
      return false
    }
  }
  // 如果为原生 input 则应是 files[0]
  fileReader.readAsBinaryString(files.raw)
}

