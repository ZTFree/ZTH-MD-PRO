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

/**
 * description
 * @return {} String - 返回16位颜色
 */
export function getRandomColor() {
    const strArr = ['#']
    while (strArr.length < 4) {
        strArr.push(getRandomNum(0, 15).toString('16'))
    }
    const color = strArr.join('')
    return color
}

export function getRandomNum(num1, num2) {
    return Math.floor(Math.random() * (Math.abs(num1 - num2) + 1) + Math.min(num1, num2))
}

export function setStyleProperties(obj, options) {
    for (const p in options) {
        obj.style[p] = options[p]
    }
}