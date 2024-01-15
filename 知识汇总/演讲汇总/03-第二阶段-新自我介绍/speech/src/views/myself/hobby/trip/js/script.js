let imgRootURL = './images/'
let cardsNames = ['wts.jpg', 'sand.jpg', 'sun.jpg', 'hk.jpg', 'crowd.jpg']
let cardTitles = ['登顶梧桐山', '杨梅坑沙滩', '鹿嘴山庄日出', '香港太平山夜景', '香港墓园']
let cbox = document.querySelector("#cbox")

// 已经展开的卡
let expandCard = cbox.firstElementChild
// 所有卡
let cards = cbox.children

// 初始化
function inIt(cards) {
    for (let i = 0; i < cards.length; i++) {
        if (i === 0) {
            cards[i].classList.add('expanding-card')
        } else {
            cards[i].classList.add('closing-card')
        }
        // 因为实际为行内式，故图片url为相对与index.html的
        cards[i].style.backgroundImage = `url(${imgRootURL}/${cardsNames[i]})`
        cards[i].firstElementChild.innerText = cardTitles[i]
    }
}

// 展开与关闭卡片+文字的显示与隐藏
function expandAndClose(ecard, cards) {
    // ecard为正要展开的卡
    if (ecard === expandCard) return
    for (let i = 0; i < cards.length; i++) {
        let c = cards[i]

        // 使用toggle简化代码
        if (c === ecard || c === expandCard) {
            c.style.width = c.clientWidth + 'px'
            c.classList.toggle('closing-card')
            c.classList.toggle('expanding-card')
            c.firstElementChild.classList.toggle('block-words')
        }


    }
    expandCard = ecard
}

// 使用冒泡触发，避免为每个card盒子绑定事件
cbox.addEventListener('click', function (e) {
    if (e.target !== this) {
        expandAndClose(e.target, cards)
    }
}, false)

inIt(cards)