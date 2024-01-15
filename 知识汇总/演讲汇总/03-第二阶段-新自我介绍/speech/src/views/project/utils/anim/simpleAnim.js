// 导入依赖
import {
    createOriginAnim
} from './animAbout.js'
import {
    getRandomColor,
    getRandomId
} from '../common/common.js'

export function simpleAnim(opts) {
    const {
        x,
        y,
        el,
        parent,
        time,
        animName,
        from,
        to,
        other,
        cb,
        loop,
        step
    } = opts
    setTimeout(() => {
        parent.appendChild(el)
        createOriginAnim({
            startX: x,
            startY: y,
            // originAngle: 0,
            el,
            parent,
            loop: loop || false,
            // 动画时常
            time: time || 800,
            animName: animName || 'anim' + getRandomId(8),
            fromAnim: {
                // 自定义from
                ...(from || {})
            },
            toAnim: {
                // 自定义to
                ...(to || {})
            },
            // 自定义other
            ...(other || {}),
            cb: cb || function () {}
        })
    }, step || 100)
}