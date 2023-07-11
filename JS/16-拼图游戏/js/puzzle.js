const box = document.querySelector('.box')

// 地图信息 1代表该地图已经有元素
const map = []
// 储存图片单元盒子的索引和坐标信息
const flags = []

// 初始渲染
window.addEventListener('load',() => {
    makeFragments(4,4)
    // 生成地图信息
    for(let i = 0; i < 4; i++){
        for(let j = 0; j < 4; j++){
            if(i === 3 && j === 3){
                map.push(0)
                break
            } 
            map.push(1)
        }
    }
    // console.log(map,flags)
})

// 打乱盒子位置，产生随机拼图
function random(){

}


// 窗口变化盒子大小变化
window.addEventListener('resize',() => {
    // 获取所有图片单元格
    const divs = document.querySelectorAll('.box div')
    // 获取改变后父级盒子的大小
    const w = +getComputedStyle(box).width.replace('px','') 
    const h = +getComputedStyle(box).height.replace('px','') 
    for(let i = 0; i < divs.length; i++){
        // 获取窗口未改变的前的背景图片大小
        const x = +divs[i].style.backgroundSize.split(' ')[0].replace('px','')
        const y = +divs[i].style.backgroundSize.split(' ')[1].replace('px','')
        // 获取窗口未改变前的背景图片位置
        const x1 = +divs[i].style.backgroundPosition.split(' ')[0].replace('px','')
        const y1 = +divs[i].style.backgroundPosition.split(' ')[1].replace('px','')
        // 改变后的图片单元格的大小
        divs[i].style.width = w / 4 + 'px'
        divs[i].style.height = h / 4 + 'px'
        // 改变后的图片位置
        const x2 = w  * x1 / x
        const y2 = h * y1  / y
        divs[i].style.backgroundPosition = -x2.toFixed(3) + 'px' + ' ' + -y2.toFixed(3) + 'px'
        // 改变后的图片大小
        divs[i].style.backgroundSize = `${w}px ${h}px`
        // 改变前的单元格的位置
        const left = +divs[i].style.left.replace('px','')
        const top = +divs[i].style.top.replace('px','')
        // 改变后单元格位置
        divs[i].style.left = left * w  / x + 'px'
        divs[i].style.top = top * h  / y + 'px'
    }
})

// box.addEventListener('mousemove', e => {
//     console.dir(e.target)
// })

// 点击盒子进行移动
box.addEventListener('click', e => {
    if(!e.target.dataset.id) return
    // 每个盒子的宽高
    const w = +getComputedStyle(box).width.replace('px','') / 4
    const h = +getComputedStyle(box).height.replace('px','') / 4
    // 每个盒子未移动前的位置信息
    let x = +e.target.style.left.replace('px','')
    let y = +e.target.style.top.replace('px','')
    // 找到点击的那个盒子
    let i = find(e.target.dataset.id)
    // 获取点击的盒子的地图信息
    const mapArr = flags[i].map.split('')
    // 将地图信息转换为map地图数组的下标
    const my = mapArr[0]*4 + +mapArr[1]
    const top = mapArr[0]-1 >= 0 ? (+mapArr[0]-1)*4 + +mapArr[1] : -1
    const bottom = +mapArr[0]+1 <= 3 ? (+mapArr[0]+1)*4 + +mapArr[1] : -1
    const left = mapArr[1]-1 >= 0 ? (+mapArr[0])*4 + +mapArr[1]-1 : -1
    const right = +mapArr[1]+1 <= 3 ? (+mapArr[0])*4 + +mapArr[1]+1 : -1
    // console.log(my,top,bottom,left,right,map,x,y,flags)

    // 判断是否有上下左右是否有可以移动的地图
    if(top !== -1 && map[top] === 0) {
        map[top] = 1
        map[my] = 0
        e.target.style.top = y - h + 'px'
        flags[i].map = (+mapArr[0]-1) + '' + mapArr[1]
        return
    }
    if(bottom !== -1 && map[bottom] === 0) {
        map[bottom] = 1
        map[my] = 0
        e.target.style.top = y + h + 'px'
        flags[i].map = (+mapArr[0]+1) + '' + mapArr[1]
        return
    }
    if(left !== -1 && map[left] === 0) {
        map[left] = 1
        map[my] = 0
        e.target.style.left = x - w + 'px'
        flags[i].map = +mapArr[0] + '' + (+mapArr[1]-1)
        return
    }
    if(right !== -1 && map[right] === 0) {
        map[right] = 1
        map[my] = 0
        e.target.style.left = x + w + 'px'
        flags[i].map = +mapArr[0] + '' + (+mapArr[1]+1)
        return
    }
})

// 生成图片单元格
function makeFragments(m,n){

    // 清空内容
    box.innerHTML = ''

    //设置每个盒子的宽高
    const w = +getComputedStyle(box).width.replace('px','') / m
    const h = +getComputedStyle(box).height.replace('px','') / n
    for(let i = 0; i < m; i++){
        for(let j = 0; j < n; j++){
            if(i === m-1 && j === n-1) break
            const div = document.createElement('div')
            div.style.width = w + 'px'
            div.style.height = h + 'px'
            div.style.left = (w*j) + 'px'
            div.style.top = (h*i) + 'px'
            let id = '' + i + j
            div.dataset.id = id
            box.append(div)
            flags.push({
                id: `${id}`,
                // flag:false,
                map: `${id}`
            })
        }
    }
    addImage(m,n)
}

// 绘制背景
function addImage(m,n){
    // 图片大小
    const bgw = +getComputedStyle(box).width.replace('px','')
    const bgh = +getComputedStyle(box).height.replace('px','')
    // 对每个盒子背景图片进行定制
    for(let i = 0; i < m; i++){
        for(let j = 0; j < n; j++){
            if(i === m-1 && j === n-1) break
            const div = document.querySelector(`[data-id='${i}${j}']`)
            div.style.background = 'url(./images/bg.jpg) no-repeat scroll'
            div.style.backgroundSize = `${bgw}px ${bgh}px`
            div.style.backgroundPosition = -(j*(bgw/m))+ "px" + ' ' + -(i*(bgh/n)) + "px"
            // 添加监听事件
            // div.addEventListener('mousedown',e => {
            //     find(e.target.dataset.id,true)
            // })
            // div.addEventListener('mouseup',e => {
            //     find(e.target.dataset.id,false)
            // })
        }
    }
}

// 找到元素
function find(id,bool){
    for(let i in flags){
        if(flags[i].id == id){
            // flags[i].flag = bool
            return i
        }
    }
}