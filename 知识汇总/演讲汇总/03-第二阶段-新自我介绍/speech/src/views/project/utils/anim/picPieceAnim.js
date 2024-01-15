import {
    setStyleProperties
} from '../common/common.js'
import {
    styleDom,
    createOriginAnim
} from './animAbout.js'
//  依赖导入

export class PicPieceAnim {
    constructor(selector, url) {
        this.root = document.querySelector(selector)
        const defURL = 'https://img0.baidu.com/it/u=370464892,4203847282&fm=253&fmt=auto&app=120&f=JPEG?w=800&h=500'
        this.url = url || defURL
        this.pic = null
        this.picW = 0
        this.picH = 0
        this.preAnim = null
        this.init()
    }

    // 组件UI初始化
    uiInit() {
        this.main = document.createElement('div')
        this.finp = document.createElement('input')
        this.btn = document.createElement('button')
        this.box = document.createElement('div')

        this.main.classList.add('main')
        this.finp.classList.add('finp')
        this.btn.classList.add('btn')
        this.box.classList.add('box')

        this.finp.type = 'file'
        this.btn.innerText = '选择图片'

        styleDom.innerHTML += `        
        .main {
            display: inline-block;
        }
        .box {
            position: relative;
            display: inline-block;
            border: 5px double black;
            box-sizing: border-box;
        }
        .box img {
            display: block;
            visibility: hidden;
            width: 300px;
        }
        .box * {
            background-size: 300px;
        }
        .finp {
            display: none;
        }
        .btn {
            display: block;
            width: 100%;
            font-size: 50px;
            margin-bottom: 20px;
        }`

        this.btn.onclick = () => {
            this.finp.click()
        }

        this.finp.onchange = () => {
            const file = this.finp.files[0]
            const reader = new FileReader()
            reader.readAsDataURL(file)
            reader.onload = () => {
                this.setURL(reader.result)

                // 打印
                console.log(reader.result);
            }
        }

        this.main.appendChild(this.finp)
        this.main.appendChild(this.btn)
        this.main.appendChild(this.box)
        this.root.appendChild(this.main)

    }

    // img标签初始化
    picInit() {

        !this.pic || this.pic.remove()
        this.pic = document.createElement('img')
        setStyleProperties(this.pic, {
            visibility: 'hidden'
        })

        this.pic.src = this.url
        this.box.appendChild(this.pic)


        // 异步行为，如何解决？
        this.pic.onload = () => {
            this.picW = this.pic.clientWidth
            this.picH = this.pic.clientHeight
        }
    }

    init() {
        this.uiInit()
        this.picInit()
    }

    // 图片碎片数组生成
    imgSplit(row = 2, col = 2, url = this.url) {
        const pieceArr = []
        const pieceH = this.picH / row,
            pieceW = this.picW / col

        for (let r = 0; r < row; r++) {
            pieceArr.push([])
            for (let c = 0; c < col; c++) {
                const el = document.createElement('div')
                el.classList.add('piece')
                setStyleProperties(el, {
                    position: 'absolute',
                    width: pieceW + 'px',
                    height: pieceH + 'px',
                    left: pieceW * c + 'px',
                    top: pieceH * r + 'px',
                    backgroundPosition: `-${pieceW * c}px -${pieceH * r}px`,
                    backgroundImage: `url(${url})`,
                    backgroundRepeat: 'no-repeat',
                    border: '1px solid black'
                })

                pieceArr[r].push({
                    el,
                    left: pieceW * c + 'px',
                    top: pieceH * r + 'px',
                })
            }
        }
        return pieceArr
    }

    // 图片碎片合并
    mergePiece(row = 2, col = 2, opts = {
        from: {},
        to: {},
        other: {}
    }) {
        const arr = this.imgSplit(row, col)
        const rNum = arr.length,
            cNum = arr[0].length

        let count = rNum * cNum
        // 碎片间隔时长
        const step = opts.other.step || 50


        for (let r = 0; r < rNum; r++) {
            for (let c = 0; c < cNum; c++) {
                setTimeout(() => {
                    const item = arr[r][c]
                    this.box.appendChild(item.el)
                    createOriginAnim({
                        startX: 0,
                        startY: 0,
                        originAngle: 0,
                        el: item.el,
                        parent: this.box,
                        loop: false,
                        // 动画时常
                        time: 1800,
                        animName: `anim-${r}-${c}`,
                        fromAnim: {
                            // 自定义from
                            ...opts.from
                        },
                        toAnim: {
                            scale: 1,
                            left: item.left,
                            top: item.top,
                            // 自定义to
                            ...opts.to
                        },
                        // 自定义other
                        ...opts.other,
                        cb: () => {
                            count--

                            if (count == 0) {
                                for (let r = 0; r < rNum; r++) {
                                    for (let c = 0; c < cNum; c++) {
                                        arr[r][c].el.remove()
                                    }
                                }

                                this.pic.style.visibility = 'visible'
                                this.btn.disabled = false
                            }
                        }
                    })

                }, (r * cNum + c) * step)
            }
        }

    }

    merge(row = 2, col = 2, opts = {
        from: {},
        to: {},
        other: {}
    }) {
        this.preAnimOpts = [
            row,
            col,
            opts
        ]
        this.btn.disabled = true
        this.do(this.mergePiece, row, col, opts)
    }

    // 重新设置img的src
    setURL(url) {
        // const thisArg = this
        this.do(() => {
            this.url = url
            this.picInit()
            // 重新设置url后执行最后一个动画
            this.do(this.merge, ...this.preAnimOpts)
        }, url)
    }

    // 解决图片异步load方案
    do(fn, ...arg) {
        console.log(this);
        const thisArg = this
        // 重新设置this指向
        setTimeout(() => fn.call(thisArg, ...arg), 10);
    }
}