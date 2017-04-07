<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <title>Swiper demo</title>
    <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1">

    <!-- Link Swiper's CSS -->
    <link rel="stylesheet" href="../dist/css/swiper.min.css">

    <!-- Demo styles -->
    <style>
    body {
        background: #eee;
        font-family: Helvetica Neue, Helvetica, Arial, sans-serif;
        font-size: 14px;
        color:#000;
        margin: 0;
        padding: 0;
    }
    .swiper-container {
        width: 100%;
        height: 300px;
        margin: 20px auto;
    }
    .swiper-slide {
        text-align: center;
        font-size: 18px;
        background: #fff;
        width: 80%;
        margin-right: 10px;

        /* Center slide text vertically */
        display: -webkit-box;
        display: -ms-flexbox;
        display: -webkit-flex;
        display: flex;
        -webkit-box-pack: center;
        -ms-flex-pack: center;
        -webkit-justify-content: center;
        justify-content: center;
        -webkit-box-align: center;
        -ms-flex-align: center;
        -webkit-align-items: center;
        align-items: center;
    }
    </style>
</head>
<body>
    <!-- Swiper -->
    <div class="swiper-container">
        <div class="swiper-wrapper">
            <div class="swiper-slide">Slide 1</div>
            <div class="swiper-slide">Slide 2</div>
            <div class="swiper-slide">Slide 3</div>
            <div class="swiper-slide">Slide 4</div>
            <div class="swiper-slide">Slide 5</div>
            <div class="swiper-slide">Slide 6</div>
            <div class="swiper-slide">Slide 7</div>
            <div class="swiper-slide">Slide 8</div>
            <div class="swiper-slide">Slide 9</div>
            <div class="swiper-slide">Slide 10</div>
        </div>
        <!-- Add Pagination -->
        <div class="swiper-pagination"></div>
    </div>

    <!-- Initialize Swiper -->
    <script>
    	var container = document.querySelector(".swiper-container .swiper-wrapper")
    	var slider = {
    		canTouch: function() {
    			return ('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch
    		},
    		events: {
    			index: 1,
    			count: document.querySelectorAll(".swiper-slide").length,
    			data: {
    				start: {},
    				end: {},
    				scroll_x: 1
    			},
    			container: container,
    			handleEvent: function(event) {
		            var self = this; //this指events对象

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

		       		self.data.scroll_x = 1
		       		container.addEventListener("touchmove", this, false)
		       		container.addEventListener("touchend", this, false)
		        },
		        move: function(e) {
		        	if(e.targetTouches.length > 1 || e.scale && e.scale !== 1) return;

		        	var self = this;
		        	var touch = e.targetTouches[0]

		        	self.data.end = {
		        		x: touch.pageX - self.data.start.x,
		        		y: touch.pageY - self.data.start.y,
		        		time: +new Date
		        	}

		        	self.data.scroll_x = Math.abs(self.data.end.x) > Math.abs(self.data.end.y) ? 1 : 0;

		        	if(self.data.scroll_x) {
		        		e.preventDefault()
		        		console.log("translate3d("+ self.data.end.x +"px, 0, 0)")
		        		container.style.transform = "translate3d("+ self.data.end.x +"px, 0, 0)"
		        	}
		        },
		        end: function(e) {
		        	var self = this;
		        	var duration = +new Date - self.data.start.time;

		        	if(self.data.scroll_x) {
		        		if(Number(duration) > 10) {
		        			if(self.data.end.x > 10) {
		        				if(self.index !== 0) self.index -= 1;
		        			}else {
		        				if(this.index !== this.count-1) this.index += 1;
		        			}
		        		}
		        	}

		        	console.log(this)
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
    	slider.init();
    </script>
</body>
</html>
