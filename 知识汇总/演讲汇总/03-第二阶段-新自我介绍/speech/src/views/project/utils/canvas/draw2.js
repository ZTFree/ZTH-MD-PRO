import {
    setPenOptions,
    getLineEnd,
    angleToRadian,
} from './draw.js'

import {
    getRandomColor
} from './utils.js'

const canvas1 = document.querySelector('#canvas1')
const canvas2 = document.querySelector('#canvas2')
const canvasMidX = parseFloat(getComputedStyle(canvas1).width) / 2
const canvasMidY = parseFloat(getComputedStyle(canvas1).height) / 2

let ctx1 = canvas1.getContext('2d')
let ctx2 = canvas2.getContext('2d')

// 匀速绘制射线:匀速绘画函数
function drawLiner(context, {
    x,
    y,
    targetX,
    targetY,
    t = 800,
    sColor,
    width
}, cb = () => {}) {
    setPenOptions(context, {
        sColor,
        width
    })

    const tlen = 10,
        diffX = targetX - x,
        diffY = targetY - y,
        xstep = diffX / (t / tlen),
        ystep = diffY / (t / tlen)
    let xlen = 0,
        ylen = 0
    context.beginPath()
    const timer = setInterval(() => {
        context.moveTo(x, y)
        xlen += Math.abs(xstep)
        ylen += Math.abs(ystep)
        x += xstep
        y += ystep
        context.lineTo(x, y)
        context.stroke()


        if (xlen >= Math.abs(diffX) && ylen >= Math.abs(diffY)) {
            clearInterval(timer)
            cb()
        }
    }, tlen)
}

// 匀速绘制圆弧
function drawRing(context, {
    x,
    y,
    r,
    start = 0,
    angle = 360,
    t = 800,
    sColor,
    width,
    // isFill = false
}, cb = () => {}) {
    setPenOptions(context, {
        sColor,
        width
    })

    const tlen = 10
    const target = angleToRadian(angle)
    const origin = angleToRadian(start)
    let len = 0
    const step = target / (t / tlen)
    context.beginPath()
    const timer = setInterval(() => {

        context.arc(x, y, r, len + origin, len + step + origin)
        context.stroke()
        len += step
        if (Math.abs(len) > Math.abs(target)) {
            clearInterval(timer)
            cb()
        }
    }, tlen)

}

// 绘画流
function drawStream(fn = () => {}, arr = [], orderArr = []) {
    let flag = true
    let index = 0
    let orderIndex = 0
    const timer = setInterval(() => {
        if (!flag) return
        flag = false

        index = orderArr.length ? orderArr[orderIndex] : index

        fn(...arr[index], () => {
            flag = true
            orderArr.length ? orderIndex++ : index++

            if (orderArr.length) {
                if (orderIndex >= orderArr.length) {
                    clearInterval(timer)
                }
            } else {
                if (index >= arr.length) {
                    clearInterval(timer)
                }
            }

        })
    }, 10)
}

// 绘制六芒星
function drawHexagram(context, {
    x,
    y,
    r = 100,
    sColor = 'black',
    width = 1,
    time = 4800,
    imd = false
}) {

    // const origin = [0,0]

    // 六个点位获取
    const dots = []
    for (let i = 0; i < 6; i++) {
        dots[i] = getLineEnd(x, y, r, 90 + 60 * i)
    }

    if (imd) {
        for (let i = 0; i < 6; i++) {
            drawLiner(context, {
                x: dots[i][0],
                y: dots[i][1],
                targetX: dots[(i + 2) % 6][0],
                targetY: dots[(i + 2) % 6][1],
                t: time,
                sColor,
                width
            })
        }
    } else {
        const arr = []
        for (let i = 0; i < 6; i++) {
            arr.push([context, {
                x: dots[i][0],
                y: dots[i][1],
                targetX: dots[(i + 2) % 6][0],
                targetY: dots[(i + 2) % 6][1],
                t: time / 6,
                sColor,
                width
            }])
        }
        drawStream(drawLiner, arr, [0, 2, 4, 1, 3, 5])
    }


}

// 设置canvas原点
ctx1.translate(canvasMidX, canvasMidY);
ctx2.translate(canvasMidX, canvasMidY);

drawHexagram(ctx1, {
    x: 0,
    y: 0,
    r: 100,
    sColor: getRandomColor(),
    width: 20,
    time: 100,
    imd: true
})
setInterval(() => {
    const sColor = getRandomColor()
    drawHexagram(ctx1, {
        x: 0,
        y: 0,
        r: 100,
        sColor,
        width: 20,
        time: 800,
        imd: true
    })
    drawRing(ctx2, {
        x: 0,
        y: 0,
        r: 120,
        start: -90,
        angle: 360,
        sColor,
        width: 20,
        t: 700
    })

}, 1000);