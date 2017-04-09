var slider = function(opt) {
    console.log(opt);
}

var container = document.querySelector(".swiper-container .swiper-wrapper")
slider.prototype = {
    canTouch: function() {
        return ('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch
    },
    events: {
        count: document.querySelectorAll(".swiper-slide").length,
        data: {
            start: { x: 0, y: 0 },
            move: { x: 0, y: 0 },
            end: { x: 0, y: 0 },
            scroll_x: 1,
            index: 0
        },
        container: container,
        handleEvent: function(event) {
            var self = this; // this指events对象

            if(event.type == 'touchstart') {
                self.start(event);
            }else if(event.type == 'touchmove') {
                self.move(event);
            }else if(event.type == 'touchend') {
                self.end(event);
            }
        },
        start: function(e) {
            var self = this
            var touch = e.targetTouches[0]

            self.data.start = {
                x: touch.pageX,
                y: touch.pageY,
                time: +new Date
            }

            self.data.move = {
                x: 0,
                y: 0,
            }

            self.data.scroll_x = 1
            container.addEventListener("touchmove", this, false)
            container.addEventListener("touchend", this, false)
        },
        move: function(e) {
            if(e.targetTouches.length > 1 || e.scale && e.scale !== 1) return;

            var self = this;
            var touch = e.targetTouches[0]

            self.data.move = {
                x: touch.pageX - self.data.start.x,
                y: touch.pageY - self.data.start.y,
                time: +new Date
            }

            self.data.scroll_x = Math.abs(self.data.move.x) > Math.abs(self.data.move.y) ? 1 : 0;

            if(self.data.scroll_x) {
                e.preventDefault()
                var offset_x = self.data.move.x - (window.innerWidth * self.data.index)
                console.log("translate3d("+ self.data.move.x +"px, 0, 0)")
                container.style.transform = "translate3d("+ offset_x +"px, 0, 0)"
            }
        },
        end: function(e) {
            var self = this;
            var duration = +new Date - self.data.start.time;

            if(self.data.scroll_x) {
                if(Number(duration) > 10) {
                    console.log(self.data.move.x);
                    if(self.data.move.x > 10) {
                        if(self.data.index !== 0) self.data.index -= 1;
                    }else if(self.data.move.x < 0){
                        if(this.data.index !== this.count-1) this.data.index += 1;
                    }
                }
            }

            var offset_x = -(window.innerWidth * self.data.index)
            console.log(offset_x)

            container.style.transform = "translate3d("+ offset_x +"px, 0, 0)"

            container.removeEventListener('touchmove', this, false);
            container.removeEventListener('touchend', this, false);
        }
    },
    init: function() {
        var self = this;
        if(!!self.canTouch()) {
            container.addEventListener('touchstart', self.events, false);
        }
    }
}
