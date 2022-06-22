$(function () {
    /***
     * 音乐控制器：点击控制音乐播放暂停
     * 思路：
     *     1.获取音乐--音频视频标签---操作原生js  DOM元素获取内容
     *     2.点击按钮--判断当前的音乐是否是暂停的  如果暂停-true  否则false 
     *     3.当前的点击的音乐是暂停---让音乐播放 同时图片修改  否则反之
     *     4.当前音乐开始播放的时候---获取当前播放的时间  总时间
     *     5.当前音乐播放后 获取音乐的进度条的比例：=当前的播放时间/总时间 *100 +'%'
     *     6.设置进度条的宽度 
     *     7.音乐播放完毕---播放的按钮图片修改
     */
    //注意：音频 视频 JS提供 API是一样的
    //1.获取音频
    var audio = document.getElementById('audio');  //jquery获取---转DOM 
    //备注：想实现---进入页面就获取-----获取当前的总时长
    // console.log(audio.duration);//NaN 直接获取获取不到   jquery入口函数：加载完DOM 直接js代码 注意：此时src资源没有加载完毕
    //oncanplay	在用户可以开始播放视频/音频（audio/video）时触发 可以获取总时间
    audio.oncanplay = function () {
        // console.log(audio.duration);
        $(".duration").html(times(audio.duration));
        //当视频或者音频 获取网上资源的时候--不能进入页面就立马点击，有可能数据资源没有获取，点击可能导致没有播放
        //在oncanplay触发 点击播放事件 
        //2.点击按钮--判断当前的音乐是否是暂停的
        $(".play img").click(function () {
            //3.判断当前的音乐是否是暂停的  paused		暂停状态  暂停 true  false播放
            if (audio.paused) {//true-暂停
                //音乐播放
                audio.play();
                $(".play img").attr('src', 'images/pause.png');

            } else {
                //音乐暂停
                audio.pause();		//暂停
                $(".play img").attr('src', 'images/play-btn_03.png');
            }
        })

    }
    //4.当前音乐开始播放的时候---获取当前播放的时间  总时间
    //方法1：可以用计时器 监听音乐播放  ---获取时间 ---
    //方法2：音频里面有个事件--监听音乐或者是视频是否播放：---ontimeupdate	当前音频/视频播放时间发生改变时触发
    audio.ontimeupdate = function () {
        // console.log('当前的播放时间:',audio.currentTime);//currentTime	返回当前音频/视频的播放时间 秒
        // console.log('音频的总的时间:',audio.duration);//duration 返回当前音频/视频的总时长  秒
        //获取当前的播放的时间  ---处理时间--秒为单位增
        $(".current").html(times(audio.currentTime));
        //5.获取音乐的进度条的比例：=当前的播放时间/总时间 *100 +'%'
        var pre = audio.currentTime / audio.duration * 100 + '%';
        // console.log(pre);
        //设置进度条的宽度
        $(".innerProgress").css('width', pre);

        //6.播放完毕---按钮图片切换----ended 返回当前音频/视频是否播放结束 true结束
        if (audio.ended) {
            audio.pause();
            $(".play img").attr('src', 'images/play-btn_03.png');
        }
    }

    //时间函数---秒 
    //函数功能：给我一个秒的单位数值 转成多少分多少秒 00:00 时间
    function times(num) {//num秒 例子：num=325秒   num/60得分 num%60得秒
        var m = parseInt(num / 60);
        var s = parseInt(num % 60);
        m = m > 9 ? m : '0' + m;
        s = s > 9 ? s : '0' + s;

        return m + ':' + s;
    }



    //动态获取音频数据------------------


    


























})