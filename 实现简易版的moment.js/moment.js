const weeks = [ '日', '一', '二', '三', '四', '五', '六' ]
const seconds = 1498132062000

class Moment {
    constructor(arg = new Date().getTime()) {
        this.date = new Date(arg)
    }

    static unix(timestamp) {
        return new Moment(timestamp * 1000)
    }

    // getTime()返回的是毫秒数，需要转成秒数并取整
    unix() {
        return Math.round(this.date.getTime() / 1000)
    }

    format(formatStr) {
        const date = this.date
        const year = date.getFullYear()
        const month = date.getMonth() + 1
        const day = date.getDate()
        const week = date.getDay()
        const hour = date.getHours()
        const minute = date.getMinutes()
        const second = date.getSeconds()

        return formatStr.replace(/Y{2,4}|M{1,2}|D{1,2}|d{1,4}|H{1,2}|m{1,2}|s{1,2}/g, (match) => {
            switch (match) {
            case 'YY':
                return String(year).slice(-2)
            case 'YYY':
            case 'YYYY':
                return String(year)
            case 'M':
                return String(month)
            case 'MM':
                return String(month).padStart(2, '0')
            case 'D':
                return String(day)
            case 'DD':
                return String(day).padStart(2, '0')
            case 'd':
                return String(week)
            case 'dd':
                return weeks[week]
            case 'ddd':
                return '周' + weeks[week]
            case 'dddd':
                return '星期' + weeks[week]
            case 'H':
                return String(hour)
            case 'HH':
                return String(hour).padStart(2, '0')
            case 'm':
                return String(minute)
            case 'mm':
                return String(minute).padStart(2, '0')
            case 's':
                return String(second)
            case 'ss':
                return String(second).padStart(2, '0')
            default:
                return match
            }
        })
    }
}

new Moment()
// 返回当前的时间对象

new Moment().unix()
// 返回当前时间的秒数

Moment.unix(seconds)
// 传入秒数，返回传入秒数的时间对象

new Moment().format('YYYY-MM-DD dd HH:mm:ss')
// 返回值 2017-06-22 四 19:46:14

Moment.unix(1498132062000).format('YYYY-MM-DD dd HH:mm:ss')
// 返回值 2017-06-22 四 19:46:14