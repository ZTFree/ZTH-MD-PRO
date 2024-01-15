/**
 * 匀速运动函数
 * @param {el} Object - 移动的dom元素
 * @param {options} Object - 移动方位与之
 * @param {time} Number - 运动时间
 * @param {cb} Function - 运动结束回调
 */
export function elMove(el, options, time, cb = () => {}) {
    let count = 0
    const tlen = 10
    for (const type in options) {
        // 初始值、运动方向
        const originV = parseInt(window.getComputedStyle(el)[type]),
            targetV = options[type]
        if (targetV == 0) continue
        const direction = targetV > 0 ? 1 : -1

        count++

        let len = 0,
            stepLen = Math.abs(targetV) / (time / tlen)

        const timer = setInterval(() => {

            len += stepLen
            el.style[type] = originV + direction * len + 'px'

            if ((direction == -1 && -1 * len <= targetV) || (direction == 1 && len >= targetV)) {
                clearInterval(timer)
                el.style[type] = originV + targetV + 'px'
                count--
                // 定时器完成后再执行
                if (!count) cb()
            }

        }, tlen)
    }
}

// 返回随机16进制颜色
export function getRandomColor() {
    const strArr = ['#']
    while (strArr.length < 4) {
        strArr.push(getRandomNum(0, 15).toString('16'))
    }
    const color = strArr.join('')
    return color
}

// 获取范围随机数
export function getRandomNum(num1 = 1, num2 = 0, canZero = true) {
    const res = Math.floor(Math.random() * (Math.abs(num1 - num2) + 1) + Math.min(num1, num2))
    if (!canZero && !res) {
        return getRandomNum(num1, num2, canZero)
    }

    return res
}

// 设置对象属性
export function setStyleProperties(obj, options) {
    for (const p in options) {
        obj.style[p] = options[p]
    }
}

// 模拟事件触发 
export function simulateEventTriggle(target, eventType, options = {}) {
    const event = new Event(eventType)
    setStyleProperties(event, options)
    target.dispatchEvent(event)
}


export function getRandomId(len = 0) {
    return (new Array(len)).fill(0).reduce(prev => prev + getRandomNum(9), '')
}