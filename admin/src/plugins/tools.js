//是否是闰年
function isLeapYear(year) {
    if (year % 4 == 0 && year % 100 != 0) {
        return true;
    } else if (year % 400 == 0) {
        return true;
    } else {
        return false;
    }
}

//根据年月得到天数
export function getDayNumByYearMonth(year, month) {
    console.log(month)
    switch (month) {
        case 1:
        case 3:
        case 5:
        case 7:
        case 8:
        case 10:
        case 12:
            return 31;
        case 4:
        case 6:
        case 9:
        case 11:
            return 30;
        case 2:
            return isLeapYear(year) ? 29 : 28;
    }
}

//判断是否为正整数
export function isNumber(str) {
    const reg = /^[1-9]\d*$/
    if (reg.test(str)) {
        return true
    } else {
        return false
    }
}

export function delArrVal(arr, val) {
    const key = arguments[2]
    if (key) {
        for (let i = arr.length - 1; i >= 0; i--) {
            if (arr[i][key] === val) {
                arr.splice(i, 1)
            }
        }
    } else {
        for (let i = arr.length - 1; i >= 0; i--) {
            if (arr[i] === val) {
                arr.splice(i, 1)
            }
        }
    }

}

//格式化年月日
export function formatYMD(ik, ib, year, month, day) {
    const IK = ik ? '不详' : ''
    const IB = ib ? '公元' : '公元前'
    const MON = month ? `${month}月` : ''
    const DAY = day ? `${day}日` : ''
    return IK + IB + year + '年' + MON + DAY
}