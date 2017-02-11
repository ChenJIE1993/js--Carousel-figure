/**
 * Created by Administrator on 2017/2/11.
 */

var carousel = document.getElementById('carousel');
console.log(carousel);
//获取相框宽度
var cWidth = carousel.clientWidth;
console.log(cWidth);
//获得所有图片，根据图片的索引设置每张图片的位置。
var imgs = $('img');
console.log(imgs);
for (let i = 0; i < imgs.length; i++) {
    imgs[i].style.left = i * cWidth + 'px';
}

//定义一个变量，用于记录当前显示的是第几页。
var page = 0;
//开启定时器，每隔1秒，让所有图片向左移动640像素(图大小)。
var timer = setInterval(moveLeft, 3000);
//向左移动函数
function moveLeft() {
    page++;
    if (page > imgs.length - 1) {
        page = imgs.length - 1;
    }
    move()
}
//向右移动函数
function moveRight() {
    page--;
    if (page < 0) {
        page = 0
    }
    move()
}

//轮播图移动函数
function move() {
    for (var i = 0; i < imgs.length; i++) {
        //根据当前显示页数，计算出每张图片的位置
        imgs[i].style.left = (i - page) * cWidth + 'px';
    }
    setTimeout(function () {
        //一秒之后，动画结束，首先判断这是不是最后一张，
        //如果是最后一张，则瞬间回到第0页（不带动画），
        //并把page设置为0.
        if (page == imgs.length - 1) {
            page = 0;
            //先把所有的imgs 的过渡取消(回到第一张不需要动画)
            for (var j = 0; j < imgs.length; j++) {
                imgs[j].style.transition = 'none';
            }
            //把所有的图片回归初始位置
            for (var j = 0; j < imgs.length; j++) {
                imgs[j].style.left = (j - page) * cWidth + 'px';
            }
            //3s之后，再把所有imgs的过渡添加上，如果不写3s的延迟
            //那么在下次ui刷新之前imgs的过渡就已经添加了，会导致imgs回归
            //原位置时还是带动画。
            setTimeout(function () {
                for (var j = 0; j < imgs.length; j++) {
                    imgs[j].style.transition = "left 0.7s ease-in-out";
                }
            }, 100)
        }
        //然后，不管是不是最后一张，都需要改变小白点的位置
        pageC.setPage(page);
    }, 700);
}

//~~~~~~~~~~~~~~~设置小白点~~~~~~~~~~~~~
var cHeight = carousel.clientHeight;
//设置白点的位置
var pageC = document.querySelectorAll('.pageControl');
console.log(pageC);
for (var i = 0; i < pageC.length; i++) {
    //给每一个小圆点div设置一个索引，这样当小圆点点击时，
    //我们就可以通过事件的target确定时哪个小圆点被点击，
    //再通过小圆点的索引就能知道第几个被点击。
    pageC[i].index = i;
    pageC[i].style.top = '90%';
    pageC[i].style.left = (cWidth / 2 + i * 20) - (pageC.length * 10 + (pageC.length - 1) * 10) / 2 + "px";
    pageC[i].onclick = function (e) {
        //当某个小圆点被点击时，就把当前页数设置为小圆点的索引
        page = e.target.index;
        //执行移动函数
        move();
        //为了保证每次通过小圆点手动翻页后不立刻执行定时器
        //翻页，先把定时器关闭，再打开，这样定时器就会
        //重新计时。
        clearInterval(timer);
        timer = setInterval(moveLeft, 3000);
    }
}
//为pageC对象添加一个函数，用于设置当前的页数（哪个小白点变白）
pageC.setPage = function (p) {
    //先把所有小白点都变透明
    for (var i = 0; i < this.length; i++) {
        this[i].style.backgroundColor = "";
    }
    //再把当前页的小白点变白。
    this[p].style.backgroundColor = "black";
};
pageC.setPage(0);

//~~~~~~~~~~~~~~~设置左右箭头~~~~~~~~~~~~~~~~
var leftArrow = document.createElement('div');
leftArrow.classList.add("arrow");
leftArrow.innerHTML = "&lt;&lt;";
carousel.appendChild(leftArrow);
leftArrow.style.background = "linear-gradient(to right,rgba(0,0,0,0.5),rgba(0,0,0,0))";

var rightArrow = document.createElement('div');
rightArrow.classList.add("arrow");
rightArrow.innerHTML = "&gt;&gt;";
carousel.appendChild(rightArrow);
rightArrow.style.right = "0";
rightArrow.style.background = "linear-gradient(to left,rgba(0,0,0,0.5),rgba(0,0,0,0))";

leftArrow.onclick = function () {
    clearInterval(timer);
    timer = setInterval(moveLeft, 3000);
    moveRight();
};
rightArrow.onclick = function () {
    clearInterval(timer);
    timer = setInterval(moveLeft, 3000);
    moveLeft();
};






















