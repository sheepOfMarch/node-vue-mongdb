const mongoose = require('mongoose')

const schema = new mongoose.Schema({

    dynastyName:       { type: String  },          //朝代名

    establishIsKnown:  { type: Boolean },          //建立日期有记载
    establishIsBC:     { type: Boolean },          //公元前
    establishYear:     { type: String  },          //建立年份
    establishMonth:    { type: String  },          //建立月份
    establishDay:      { type: String  },          //建立日

    destroyedIsKnown:  { type: Boolean },          //灭亡日期有记载
    destroyedIsBC:     { type: Boolean },          //公元前
    destroyedYear:     { type: String  },          //灭亡年份
    destroyedMonth:    { type: String  },          //灭亡月份
    destroyedDay:      { type: String  },          //灭亡日

    establish:         { type: String  },          //
    destroyed:         { type: String  },          //
    
    introduce:         { type: String  },          //简介
    maps:              { type: [  {
       name:           { type: String  },          //照片名称
        url:           { type: String  }           //照片地址
    }]},
    publisher:         { type: String  },          //发布者

})

module.exports = mongoose.model('Dynasty', schema)