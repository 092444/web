window.addEventListener('load', function () {
    //    获取元素
    var arrow_l = document.querySelector('.arrow-l');
    var arrow_r = document.querySelector('.arrow-r');
    var lun = document.querySelector('.lun');
    var lunWidth = lun.offsetWidth;

    lun.addEventListener('mouseenter', function () {
        arrow_l.style.display = 'block';
        arrow_r.style.display = 'block';
        clearInterval(timer);
        timer = null;
    })
    lun.addEventListener('mouseleave', function () {
        arrow_l.style.display = 'none';
        arrow_r.style.display = 'none';
         timer = setInterval(function () {
            //手动调用右侧点击事件
             arrow_r.click();
         }, 1000);
    })
    // 动态生成小圆点
    var ul = lun.querySelector('ul');
    var ol = lun.querySelector('.circle');
    //console.log(ul.children.length);
    for (var i = 0; i < ul.children.length; i++) {
        // 创建li
        var li = this.document.createElement('li');
        //记录当前小圆圈索引号
        li.setAttribute('index', i);
        // 把小li放到ol
        ol.append(li);
        // 小圆圈排他思想
        li.addEventListener('click', function () {
            for (var i = 0; i < ol.children.length; i++) {
                ol.children[i].className = '';
            }
            this.className = 'current';
            //点击移动图片 ul的移动距离，小圆点索引号x图片的高度
            // 点击某个li 得到小圆点的索引号
            var index = this.getAttribute('index');

            // var lunWidth = lun.offsetWidth;
            // console.log(lunWidth);
            // console.log(index);
            //把li的index给num
            num = index;
            //把li的index给circle
            circle = index;
            animate(ul, -index * lunWidth);
        })
    }
    // 当前小圆圈
    ol.children[0].className = 'current';

    //点击右侧按钮，图片滚动
    //克隆第一张图片放到ul 最后面
    var first = ul.children[0].cloneNode(true);
    ul.appendChild(first);
    //点击右侧按钮，图片滚动一次
    var num = 0;
    //circle 控制小圆圈的播放
    var circle = 0;
    //flag节流阀
    var flag = true;
    arrow_r.addEventListener('click', function () {
        if (flag) {
            flag = false;
            //如果走到最后一次复制的一张图片， ul 要快速复原 left 改为 0
            if (num == ul.children.length - 1) {
                ul.style.left = 0;
                num = 0;
            }
            num++;
            animate(ul, -num * lunWidth, function () {
                flag = true;
            });
            //点击右侧按钮，小圆圈随之一起变化
            circle++;
            //circle==4说明图片到最后一张我们克隆的图片
            if (circle == ol.children.length) {
                circle = 0;
            }
            circleChange();
        }

    });
    //左侧按钮
    arrow_l.addEventListener('click', function () {
        if (flag) {
            flag = false;
            //如果走到最后一次复制的一张图片， ul 要快速复原 left 改为 0
            if (num == 0) {
                num = ul.children.length - 1;
                ul.style.left = -num * lunWidth + 'px';

            }
            num--;
            animate(ul, -num * lunWidth, function () {
                flag = true;
            });
            //点击右侧按钮，小圆圈随之一起变化
            circle--;
            //circle<0说明图片第一张，则小圆圈改为第四个小圆圈
            if (circle < 0) {
                circle = ol.children.length - 1;
            }
            circleChange();
        }

    });
    function circleChange() {
        //先清除其他小圆圈的current
        for (var i = 0; i < ol.children.length; i++) {
            ol.children[i].className = '';
        }
        //留下当前的小圆圈的current类名
        ol.children[circle].className = 'current';
    }
    //自动播放轮播图
     var timer = this.setInterval(function(){
        //手动调用右侧点击事件
         arrow_r.click();
     },1000);
})
