const mongoose = require('mongoose')

const schema   = new mongoose.Schema({

    name:            { type: String  },          //姓名
    alias:           { type: String  },          //别名
    styleName:       { type: String  },          //字
    pseudonym:       { type: String  },          //号  
    nation:          { type: String  },          //民族
    birthplace:      { type: String  },          //出生地
    birthplaceToday: { type: String  },          //相当于今天的地址

    bornIsKnown:     { type: Boolean },          //出生日期有记载
    bornIsBC:        { type: Boolean },          //公元前
    bornYear:        { type: String  },          //出生年份
    bornMonth:       { type: Number  },          //出生月份
    bornDay:         { type: Number  },          //出生日

    dieIsKnown:      { type: Boolean },          //逝世日期有记载
    dieIsBC:         { type: Boolean },          //公元前
    dieYear:         { type: String  },          //逝世年份
    dieMonth:        { type: Number  },          //逝世月份
    dieDay:          { type: Number  },          //逝世日

    templeName:      { type: String  },          //庙号
    posthumousTitle: { type: String  },          //谥号  
    yearNumber:      { type: String  },          //年号
    mausoleum:       { type: String  },          //陵寝
    
    introduce:       { type: String  },          //简介
    pictures:        { type: [{
        url:         { type: String  }           //照片地址
    }]},

    things:          { type: [{
        title:       { type: String  },          //事件标题
        content:     { type: String  }           //事件内容
    }]},
    publisher:       { type: String  },          //发布者
}) 

module.exports = mongoose.model('Dynasty', schema)