let d = document
let links = [...d.querySelectorAll("[id^='link']")]
let boxs = [...d.querySelectorAll("[id^='box']")]
let mids = [...d.querySelectorAll("[class*='s-mid']")]
let lefts = [...d.querySelectorAll("[class*='s-left']")]
let rights = [...d.querySelectorAll("[class*='s-right']")]

let myName = d.querySelector("#myName")

let audio_tag = d.querySelector("#music_box audio")
let src_tag = d.querySelector("#music_box source")
let songs = ["summer.mp3", "gog_cut.mp3", "mjMin_cut.mp3", "dddd_cut.mp3", "onepunch_cut.mp3", "mmsdMax_cut.mp3", "goodday.mp3"]
let floder_str = "./audio/"

let str_fadeInDownBig = "fadeInDownBig"
let nameStrs = ["lightSpeedInRight", "lightSpeedInLeft", "fadeInTopLeft", "fadeInTopRight", "fadeInBottomLeft", "fadeInBottomRight", "flip", "rubberBand"]

// fadeInTopLeft
// fadeInTopRight
// fadeInBottomLeft
// fadeInBottomRight

function setSong(src_tag, floder_str, song_str) {
    audio_tag.pause()
    src_tag.src = floder_str + song_str
    audio_tag.load()
    audio_tag.play()
}

// 页面切换+切歌
function showPage(num) {
    for (let i = 0; i < boxs.length; i++) {
        if (i === num) {
            boxs[i].style.display = "block"
        } else {
            boxs[i].style.display = "none"
        }
    }

    // 我的名字

    if (num === 1) {
        let d = 2000
        for (let i = 0; i < nameStrs.length; i++) {
            setTimeout(() => {
                myName.className += " " + "animate__" + nameStrs[i]
                myName.style.animationName = nameStrs[i]
            }, d * i);
        }
    }
}
showPage(0)
for (let i = 0; i < links.length; i++) {
    links[i].addEventListener("click", e => {
        e.preventDefault()
        showPage(i)

        // 切歌
        setSong(src_tag, floder_str, songs[i])
    })
}
setTimeout(() => {
    setSong(src_tag, floder_str, songs[0])
}, 0);
// 文字动画
function addAnim(arr, str) {
    for (let i = 0; i < arr.length; i++) {

        if (arr[i].className.indexOf('animate__animated') === -1) {
            arr[i].className += " " + "animate__animated"
        }
        arr[i].className += " " + "animate__" + str
        arr[i].style.animationName = str
    }
}


// 右刹车：lightSpeedInRight
// 左刹车：lightSpeedInLeft
// 转两圈：flip
// 弹弹弹：rubberBand
addAnim(mids, str_fadeInDownBig)
addAnim(lefts, str_fadeInDownBig)
addAnim(rights, str_fadeInDownBig)