$(function(){
    //1.轮播图
      //new Swiper('给哪个元素加轮播',{配置内容})
      //只有swiper容器里面有数据 有swiper-slide容器 才能有页码 轮播点
     //必须等页面插入完毕后 再调用轮播图swiper的js 
     function bannerSwiper(){
        var mySwiper = new Swiper('#bannerSwiper', {
            loop: true, // 循环模式选项
            // 如果需要分页器
            pagination: {
                el: '.swiper-pagination',
            },
            // 如果需要前进后退按钮
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            // autoplay:true,// 
            autoplay: {
                delay: 3000,//轮播切换的时间间隔 3000毫秒 3秒
                stopOnLastSlide: false,//如果设置为true，当切换到最后一个slide时停止自动切换。（loop模式下无效）。
                disableOnInteraction: false,//用户操作swiper之后，是否禁止autoplay。默认为true：停止
            },
            parallax : true,//开启视差效果
    
    
        })  
     }      

    //2.动态获取轮播数据
    //图片错误地址：http://www.wwtliu.com/sxtstu/blueberrypai/indexImg/banner1.jpg
    //图片正确地址：http://iwenwiki.com/api/blueberrypai/indexImg/banner1.jpg
    $.ajax({
        type:'get',
        url:'http://iwenwiki.com/api/blueberrypai/getIndexBanner.php',
        success:function(res){
            // console.log(res); 
            var arr=res.banner;
            console.log(arr);
            var str='';
            for(var i=0;i<arr.length;i++){
                //更改图片路径  方法：正则 replace(/替换的旧内容/g,'新的内容')
                // console.log(arr[i].img);             
                var newImg=arr[i].img.replace(/www.wwtliu.com\/sxtstu/g,'iwenwiki.com/api');
               
                str+=`<div class="swiper-slide">
                        <img src="${newImg}" alt="">
                        <div class="wrapper" data-swiper-parallax="-1600" data-swiper-parallax-duration="1000">
                            <h3>${arr[i].title}</h3>
                            <p>${arr[i].content}</p>
                        </div>
                    </div>`;
            }
            //for循环结束 str里面包含了所有的内容---插入页面
            $(".banner .swiper-wrapper").html(str);//插入swiper数据
            //只有swiper容器里面有数据 有swiper-slide容器 才能有页码 轮播点
            //必须等页面插入完毕后 再调用轮播图swiper的js 
            bannerSwiper();//调用轮播的js 执行轮播swiper 
                     
        }
    })


    //3.乐章的js轮播
    //首页除了轮播---下面的js动画都是一样的  只是调用的当前的swiper不同
    function lunbo(swiperName){
        new Swiper (swiperName, {
            // direction: 'vertical', // 垂直切换选项
            loop: true, // 循环模式选项
            
            // 如果需要分页器
            pagination: {
            el: '.swiper-pagination',
            },
        })  
    }
      
    //4.乐章动态数据获取
    $.ajax({
        type:'get',
        url:'http://iwenwiki.com/api/blueberrypai/getIndexMovement.php',
        success:function(res){
            // console.log('乐章',res);
            var arr=res.movement;//数据---16条 ----------------------------------
            console.log(arr);
            //获取多个屏数据swiper-slide 
            var max=Math.ceil(arr.length/4);
            //创建一个变量 ---控制循环数组数据 arr--数据--0---16 
            var n=0;
            //1.遍历获取swiper-slide容器的个数  2.创建swiper-slide之后里面创建4个li   3.创建的4个li添加swiper-slide 4.最加页面
            for(var i=0;i<max;i++){
                var swiperSlide=$('<div class="swiper-slide"></div>');//var div='<div></div>';  var div='$('<div></div>')';
                //2.创建4个li  
                var str='';
                for(var j=0;j<4;j++){
                    //图片路径处理iwen.wiki/sxtstu 
                    var newImg=arr[n].img.replace(/iwen.wiki\/sxtstu/g,'iwenwiki.com/api');
                    str+=` <li>
                            <img src="${newImg}" alt="">
                            <div class='content'>
                                <div class='name'>${arr[n].title}</div>
                                <div class='info'>${arr[n].content}</div>                                 
                            </div>
                        </li>`;
                    n++;
                }
                //for结束把创建str添加到swiperSlide
                swiperSlide.html(`<ul class="list">${str}</ul>`);
                //swiper-slide容器已经包含了4个li 追加到页面
                $(".movementSwiper .swiper-wrapper").append(swiperSlide);
            }  
            //两个for循环都结束--表示 数据追加完毕
            //调用轮播图----
            // lunbo();
            lunbo('.movementSwiper');
        }
    })


    //5.乐趣动态数据---------------------
    //lunbo(乐趣)
    

})