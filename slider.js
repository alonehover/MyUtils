(function() {
    var TFFSlider = function(dom, opt) {
        if(!(this instanceof TFFSlider)) return new TFFSlider(dom, opt);

        var opt = opt || {};
        var option = {
            offsetLeft: opt.offsetLeft || 0, // 滑动左偏移量
            margin: opt.margin || 0, // slider之间的右间距
            touchMove: opt.touchMove || 60 // 触发翻页的滑动距离
        };

        var scroll_data = {
            start: { x: 0, y: 0 },
            move: { x: 0, y: 0 },
            scroll_x: 1 // 是否横向滚动
        };

        var container = document.querySelector(dom)
        var wrapper = container.querySelector(".swiper-wrapper")
        var slider = container.querySelectorAll(".swiper-slide")

        var ts = this;

        ts.sliderCount = slider.length;
        ts.index = 0;

        var events = {
            handleEvent: function(event) {
                var _this = this; // this指events对象

                if(event.type == 'touchstart') {
                    _this.start(event);
                }else if(event.type == 'touchmove') {
                    _this.move(event);
                }else if(event.type == 'touchend') {
                    _this.end(event);
                }
            },
            start: function(e) {
                var touch = e.targetTouches[0]

                scroll_data.start = {
                    x: touch.pageX,
                    y: touch.pageY,
                    time: +new Date
                }

                scroll_data.move = {
                    x: 0,
                    y: 0,
                }

                scroll_data.scroll_x = 1

                wrapper.addEventListener("touchmove", this, false)
                wrapper.addEventListener("touchend", this, false)
            },
            move: function(e) {
                if(e.targetTouches.length > 1 || e.scale && e.scale !== 1) return;

                var touch = e.targetTouches[0]

                scroll_data.move = {
                    x: touch.pageX - scroll_data.start.x,
                    y: touch.pageY - scroll_data.start.y,
                    time: +new Date
                }

                scroll_data.scroll_x = Math.abs(scroll_data.move.x) > Math.abs(scroll_data.move.y) ? 1 : 0;

                if(scroll_data.scroll_x) {
                    e.preventDefault()
                    var offset_x = scroll_data.move.x - (ts.sliderWidth * ts.index)
                    ts.transform(offset_x, 0)
                }
            },
            end: function(e) {
                var duration = +new Date - scroll_data.start.time;

                if(scroll_data.scroll_x) {
                    if(Number(duration) > 10) {
                        if(scroll_data.move.x > option.touchMove) {
                            if(ts.index !== 0) ts.index -= 1;
                        }else if(scroll_data.move.x < -option.touchMove){
                            if(ts.index !== ts.sliderCount-1) ts.index += 1;
                        }
                    }
                }

                var offset_x = -(ts.sliderWidth * ts.index)

                ts.transform(offset_x, 300)

                wrapper.removeEventListener('touchmove', this, false);
                wrapper.removeEventListener('touchend', this, false);
            }
        }

        ts.transform = function(width, time) {
            var move_x = width + option.offsetLeft - (option.margin * ts.index)
            var move_time = time || 0
            var timer

            wrapper.style.transform = "translate3d("+ move_x +"px, 0, 0)"
            wrapper.style.transitionDuration = move_time + "ms"

            if(move_time) {
                clearTimeout(timer)
                timer = setTimeout(function() {
                    wrapper.style.transitionDuration = "0ms"
                }, move_time)
            }
        }

        ts.init = function() {
            if(!!ts.canTouch()) {
                ts.resize();
                wrapper.addEventListener('touchstart', events, false);
                window.addEventListener('resize', ts.resize, false);
            }
        }

        ts.resize = function() {
            ts.sliderWidth = window.innerWidth - option.offsetLeft * 2;
            if(option.margin) {
                for(var i = 0; i < ts.sliderCount; i ++) {
                    slider[i].style.marginRight = option.margin + "px";
                    slider[i].style.width = ts.sliderWidth + "px";
                }
            }
            var offset_x = -(ts.sliderWidth * ts.index)
            ts.transform(offset_x)
        }

        ts.init()

        return ts
    }

    TFFSlider.prototype = {
        canTouch: function() {
            return ('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch
        }
    }

    window.TFFSlider = TFFSlider
})()
