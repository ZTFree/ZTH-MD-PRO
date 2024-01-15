import {
    getRandomColor,
    getRandomNum,
    setStyleProperties,
    getRandomId
} from '../common/common.js'
//  依赖导入

// 动画曲线枚举
export const animTimeFn = {
    linear: "linear",
    ease: "ease"
}
// 动画次数枚举
export const animCount = {
    infinite: 'infinite'
}
// 动画结束状态枚举
export const animFillMode = {
    backwards: 'backwards',
    forwards: 'forwards'
}
// 动画执行方向枚举
export const animDirection = {
    alternate: 'alternate',
    normal: 'normal'
}

// 嵌入style标签
export const styleDom = document.createElement('style')
document.documentElement.appendChild(styleDom)

// 创建内部选择器样式字符串
function createStyleStr(el = '', opt = {}, tab = 0) {
    const arr = []
    arr.push('\t'.repeat(tab), el, ' {\n')
    tab += 1

    if (Array.isArray(opt)) {
        opt.forEach(item => {
            arr.push(createStyleStr(item.el, item.opt, tab))
        })
    } else if (typeof opt == 'object') {
        for (const key in opt) {
            arr.push('\t'.repeat(tab))
            arr.push(`${key}:${opt[key]}`)
            arr.push(';\n')
        }
    } else if (typeof opt == 'string') {
        arr.push(opt)
        arr.push('\n')
    }

    arr.push('\t'.repeat(tab - 1), '}\n')
    return arr.join('')
}

// 设置元素行内样式
function setElementAnimStyle(element, name, time, opt = {}) {
    //     animation-name
    //     animation-duration
    //     animation-timing-function
    //     animation-delay
    //     animation-iteration-count
    //     animation-direction
    //     animation-fill-mode
    const str = `${name} ${time}ms ${opt.timeFn || animTimeFn.ease} ${opt.delay || 0}ms ${opt.count || animCount.infinite} ${opt.direct || animDirection.normal} ${opt.fillMode || animFillMode.forwards} `
    element.style.animation = str
}

// 创建keyframs字符串
function createKeyframsStr(animName = '', fromOpt = {}, toOpt = {}) {

    return createStyleStr(`@keyframes ${animName}`, [{
        el: 'from',
        opt: fromOpt
    }, {
        el: 'to',
        opt: toOpt
    }, ])
}

// 创建原点围绕动画
export function createOriginAnim(opts) {

    let {
        el,
        parent,
        animName,
        fromAnim,
        toAnim,
        loop,
        time,
        startX,
        startY,
        originAngle,
        offset,
        bgColor,
        pmo,
        timeFn,
        direction,
        cb
    } = opts

    // 元素
    if (!el) return

    // 动画时长
    time = time || 8000

    // 元素坐标偏移量
    offset = offset || 0

    // 元素坐标
    const x = getRandomNum(startX - offset, startX + offset),
        y = getRandomNum(startY - offset, startY + offset)

    // 元素尺寸
    const [defW, defH] = [30, 30]
    const w = el.clientWidth ? el.clientWidth : defW,
        h = el.clientHeight ? el.clientHeight : defH

    // transform原点偏移量，无parent则以html标签中心为原点
    const originX = (parent ? parent.clientWidth : innerWidth) / 2 - x,
        originY = (parent ? parent.clientHeight : innerHeight) / 2 - y

    // 设置定位父亲元素
    parent = parent ? parent : document.documentElement


    // 设置元素行内样式
    setStyleProperties(el, {
        width: `${w}px`,
        height: `${h}px`,
        left: `${x}px`,
        top: `${y}px`,
        backgroundColor: bgColor || 'transparent',
        transformOrigin: pmo ? `${originX}px ${originY}px` : '0 0',
        rotate: `${originAngle || 0}deg`
    })

    // 添加帧动画

    // 目前只对from和to作设置,百分比后期再加

    animName = animName ? animName : `anim${getRandomId(8)}`
    const keyframsStr = createKeyframsStr(animName, fromAnim || {}, toAnim || {})
    if (fromAnim || toAnim) {
        styleDom.innerHTML += keyframsStr
    }


    // 设置元素动画样式
    setElementAnimStyle(el, animName, time, {
        timeFn: timeFn || animTimeFn.linear,
        direct: direction || animDirection.normal,
        count: loop ? animCount.infinite : 1
    })


    // css3动画结束时触发
    if (!loop) {
        el.onanimationend = () => {

            // 元素保持结束状态并移除anim样式
            setStyleProperties(el, toAnim || {})
            el.style.animation = ''

            // 移除keyframes
            styleDom.innerHTML = styleDom.innerHTML.replace(keyframsStr, '')

            // 执行回调
            cb()
        }
    }
    parent.appendChild(el)
}


// 非工具API 
// 默认小球样式
const ballStyle = createStyleStr('.ball', {
    'position': 'absolute',
    'width': '50px',
    'height': '50px',
    'background-color': 'hotpink',
    'border-radius': '50%'
})

// 创建一个默认小球
function creatBall() {

    if (styleDom.innerHTML.indexOf(ballStyle) === -1) {
        styleDom.innerHTML += ballStyle
    }
    const id = parseInt(Math.random() * Math.pow(10, 8))
    const ball = document.createElement('div')
    ball.id = id
    ball.classList.add('ball')
    return ball
}

// 创建银河动画
export function createFullMilkyWay() {

    // 添加银河帧动画及样式
    const bg = createStyleStr('html', {
        'background-color': 'black',
        'overflow': 'hidden'
    })

    styleDom.innerHTML += bg


    // 浏览器窗口四个角
    const startArr = [{
            x: 0,
            y: 0
        },
        {
            x: innerWidth,
            y: 0
        },
        {
            x: 0,
            y: innerHeight
        },
        {
            x: innerWidth,
            y: innerHeight
        },
    ]

    for (let i = 0; i < 100; i++) {
        setTimeout(() => {
            for (let d = 0; d < startArr.length; d++) {
                createOriginAnim({
                    startX: startArr[d].x,
                    startY: startArr[d].y,
                    el: creatBall(),
                    loop: true,
                    pmo: true,
                    animName: 'anim' + getRandomId(8),
                    fromAnim: {
                        'background-color': getRandomColor(),
                    },
                    toAnim: {
                        'background-color': 'white',
                        rotate: '360deg',
                        scale: 0
                    },
                })
            }
        }, i * 100);

    }
}