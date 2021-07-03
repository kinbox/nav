/* 初始化 */
const $siteList = $(".siteList")
const $lastLi = $siteList.find('li.last')
const x = localStorage.getItem('x')
const xObject = JSON.parse(x)
const saveLocal = () => {
    const string = JSON.stringify(hashMap)
    localStorage.setItem('x', string)
}
/* 定义hash表 */
const hashMap = xObject || [
    { logo: 'A', url: 'https://www.acfun.cn' },
    { logo: 'B', url: 'https://www.bilibili.com' }
]

/* url简化 */
const simplifyUrl = (url) => {
    return url.toString().replace('https://', '')
        .replace('http://', '')
        .replace('www.', '')
        .replace(/\/.*/, '')//删除‘/’开头的内容到结尾
}

/*定义render {删除已经有的结构，遍历hash，插入元素，保存local} */
const render = () => {
    $siteList.find('li:not(.last)').remove()
    hashMap.forEach((node, index) => {
        const $li = $(`
                    <li>
                    <div class="site">
                        <div class="logo">${node.logo}</div>
                        <div class="link">${simplifyUrl(node.url)}</div>
                        <div class='close'>
                        <svg class="icon">
                            <use xlink:href="#icon-close"></use>
                        </svg>
                        </div>
                    </div>
                    </li>
                    `)
        $li.insertBefore($lastLi)
        saveLocal()
        $li.on('click', () => { window.open(node.url) })
        $li.on('click', '.close', (e) => {
            e.stopPropagation() //阻止冒泡
            hashMap.splice(index, 1)
            render()
        })
    })
}

/* 渲染一次 */
render()

/* 取prompt的值添加到hashMap,更新local，渲染 */
$('.addButton').on('click', () => {
    let url = window.prompt('请问你要添加的网址是什么？')
    if (url.indexOf('http') !== 0) {
        url = 'https://' + url
    }
    hashMap.push({
        logo: simplifyUrl(url)[0].toUpperCase(),
        url: url
    })
    saveLocal()
    render()
})

// window.onbeforeunload = () => {
//     saveLocal()
// }

$(document).on('keypress', (e) => {
    // const key = e.key
    const { key } = e
    for (let i = 0; i < hashMap.length; i++) {
        if (hashMap[i].logo.toLowerCase() === key) {
            window.open(hashMap[i].url)
        }
    }
})

