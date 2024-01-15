const d = document
let items = d.querySelectorAll('.item')
let widthValues = d.querySelectorAll('.width-value')
let flexValues = d.querySelectorAll('.flex-value')
let flexSum = d.querySelector('.flex-sum')

for (let i = 0; i < flexValues.length; i++) {
    flexValues[i].addEventListener('change', (e) => {
        items[i].style.flex = e.currentTarget.value
        // items[i].style.flexGrow = e.currentTarget.value
        // items[i].style.flexShrink = e.currentTarget.value
        // items[i].style.flexBasis = e.currentTarget.value

        setTimeout(() => {
            for (let i = 0; i < widthValues.length; i++) {
                widthValues[i].innerText = items[i].clientWidth + 'px'
            }
        }, 0)
    })
}

function init() {
    // flexSum.innerText = 0
    for (let i = 0; i < widthValues.length; i++) {
        flexValues[i].value = 0
        items[i].style.flex = 0
    }
    setTimeout(() => {
        for (let i = 0; i < widthValues.length; i++) {
            widthValues[i].innerText = items[i].clientWidth + 'px'
            // flexValues[i].value = 0
        }
    }, 0)
}
init()