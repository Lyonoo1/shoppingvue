const fs = require('fs')
//提纯数据
fs.readFile('./database/data_json/goods.json','utf8',function(err,data){
         let newData = JSON.parse(data)//parse 将json包装成字符串的形式
         let pushData = []
         let i = 0
         newData.RECORDS.map(function(value,index){
             if(value.IMAGE1!=null){
                 pushData.push(value)
                 console.log(value.NAME)
                 i++
             }

         })
         console.log(i)
         //console.log(pushData)
         fs.writeFile('./database/data_json/newGoods.json',JSON.stringify(pushData),function(err){
            if(err) console.log('写入文件失败')
            else console.log('写入文件成功')
        })
})

