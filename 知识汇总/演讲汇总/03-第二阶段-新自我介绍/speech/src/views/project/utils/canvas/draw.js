// 绘制红旗
export function redFlag(context, canvas) {

    flagBackground(context)
    const smallSize = 60
    star(context, {
        x: 150,
        y: 80,
        len: 200,
        angle: 35
    })
    star(context, {
        x: 290,
        y: 290,
        len: smallSize,
        angle: -20
    })
    star(context, {
        x: 360,
        y: 225,
        len: smallSize
    })
    star(context, {
        x: 365,
        y: 135,
        len: smallSize,
        angle: 10
    })
    star(context, {
        x: 290,
        y: 70,
        len: smallSize,
        angle: -20
    })

    canvas && (canvas.name = "五星红旗")

}

// 画红旗背景
export function flagBackground(context) {
    context.lineWidth = '1'
    context.fillStyle = 'rgb(249, 53, 53)'
    context.fillRect(0, 0, 1000, 600);
}

// 画五角星
export function star(context, {
    x = 0,
    y = 0,
    len = 100,
    angle = 0
}) {
    let start = [
        x,
        y
    ]
    context.fillStyle = 'gold'
    context.lineWidth = "1"
    context.beginPath()
    context.moveTo(...start)
    for (let i = 0; i < 5; i++) {
        start = ray(context, {
            x: start[0],
            y: start[1],
            len,
            angle: 36 + 144 * i + angle
        })
    }
    context.fill()

    // context.stroke()
}

// 绘制射线
export function ray(context, {
    x = 0,
    y = 0,
    len = 0,
    angle = 0,
    sColor = 'black',
    width = '1'
}) {

    setPenOptions(context, {
        sColor,
        width
    })

    const [endX, endY] = getLineEnd(x, y, len, angle)

    context.lineTo(endX, endY)
    // context.stroke()
    return [
        endX,
        endY
    ]
}

// 获取射线终点坐标
export function getLineEnd(x, y, len, angle) {
    const radian = angleToRadian(angle)

    const endX = Math.round(x + Math.cos(radian) * len)
    const endY = Math.round(y + Math.sin(radian) * len)
    return [endX, endY]
}

// 角度转弧度
export function angleToRadian(angle) {
    return angle / 180 * Math.PI
}

// canvas图像转64位字符串到img标签src中
export function drawToImg() {
    let imgURI = canvas.toDataURL("image/png")

    let img = document.createElement('img')
    img.src = imgURI
    document.body.appendChild(img)
}

// a链接下载图片
export function downloadCanvasImage(canvas, selector, name = "图片") {
    const imgURI = canvas.toDataURL("image/png")
    let link = document.querySelector(selector) || {}
    link.download = canvas.name || name
    link.href = imgURI
}

// 设置画笔、填充参数
export function setPenOptions(context, {
    sColor,
    fColor,
    width
}) {
    if (sColor) context.strokeStyle = sColor;
    if (fColor) context.fillStyle = fColor;
    if (width) context.lineWidth = width
}

export function resetPenOptions(context) {
    context.strokeStyle = 'black';
    context.fillStyle = 'black';
    context.lineWidth = 1
}