<template>
  <div class="slider" ref="slider" @touchstart="_onTouchStart">
    <div class="slider-wrap" ref="sliderWrap"
         :style="{'transform': 'translate3d(' + translateX + 'px, 0, 0)','transition-duration': transitionDuration + 'ms'}"
         @transitionend="_onTransitionEnd">
      <slot></slot>
    </div>
    <div class="slider-pagination">
      <span class="item" :class="{'active':index===currentIndex}" v-for="(item,index) in sliderItems"
            :key="index"></span>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'slider',
    data() {
      return {
        currentIndex: 0,
        translateX: 0,
        transitionDuration: 0,
        sliderItems: []
      }
    },
    created: function (){
      this.sliderWidth = 0
      this.startTranslate = 0
      this.delta = 0
      this.dragging = false
      this.startPos = null
    },
    props: {
      loop: {
        type: Boolean,
        default: true
      },
      autoPlay: {
        type: Boolean,
        default: true
      },
      interval: {
        type: Number,
        default: 4000
      },
      speed: {
        type: Number,
        default: 500
      }
    },
    mounted: function (){
      setTimeout(() => {
        this._initSlider()
        if (this.autoPlay && this.loop) {
          this._autoPlay()
        }
      }, 20)

      window.addEventListener('resize', () => {
        this.resizeTimer = setTimeout(() => {
          if (!this.sliderItems) {
            return
          }
          let width = 0
          if (this.$refs.slider) {
            this.sliderWidth = this.$refs.slider.clientWidth
          }
          let childs = this.$refs.sliderWrap.children
          for (let i = 0; i < childs.length; i++) {
            let child = childs[i]
            child.style.width = this.sliderWidth + 'px'
            width += this.sliderWidth
          }

          if (this.loop) {
            width += this.sliderWidth * 2
            this.slide(this.currentIndex, true)
          }

          this.$refs.sliderWrap.style.width = width + 'px'
        }, 300)
      })
    },
    activated() {
      if (this.autoPlay && this.loop) {
        this._autoPlay()
      }
    },
    deactivated() {
      clearTimeout(this.timer)
    },
    beforeDestroy() {
      clearTimeout(this.timer)
    },
    methods: {
      _initSlider() {
        let sliderWrap = this.$refs.sliderWrap
        this.sliderItems = [].map.call(sliderWrap.children, el => el)
        let width = 0
        this.sliderWidth = this.$refs.slider.clientWidth
        for (let i = 0; i < this.sliderItems.length; i++) {
          let child = this.sliderItems[i]
          this._addClass(child, 'slider-item')
          child.style.width = this.sliderWidth + 'px'
          width += this.sliderWidth
        }

        if (this.loop) {
          let duplicateFirstChild = sliderWrap.firstElementChild.cloneNode(true)
          let duplicateLastChild = sliderWrap.lastElementChild.cloneNode(true)
          sliderWrap.insertBefore(duplicateLastChild, sliderWrap.firstElementChild)
          sliderWrap.appendChild(duplicateFirstChild)
          width += 2 * this.sliderWidth
          this.slide(this.currentIndex, true)
        }
        sliderWrap.style.width = width + 'px'
      },
      _onTouchStart(e) {
        clearTimeout(this.timer)
        this.startPos = this._getTouchPos(e)
        this.delta = 0
        this.startTime = new Date().getTime()
        this.transitionDuration = 0
        this.dragging = true
        this.startTranslate = this._getTranslateOffSet(this.currentIndex)
        document.addEventListener('touchmove', this._onTouchMove)
        document.addEventListener('touchend', this._onTouchEnd)
        e.preventDefault()
      },
      _onTouchMove(e) {
        this.delta = this._getTouchPos(e) - this.startPos
        this.translateX = this.startTranslate + this.delta
      },
      _onTouchEnd(e) {
        this.dragging = false
        let isAbnormalSlide = new Date().getTime() - this.startTime < 1000
        console
        if (this.delta < -100 || (isAbnormalSlide && this.delta < -15)) {
          this.next()
        }
        if (this.delta > 100 || (isAbnormalSlide && this.delta > 15)) {
          this.prev()
        }
        if (Math.abs(this.delta) < 15) {
          let target = e.target.parentElement
          if (target.tagName.toUpperCase() === 'A') {
            target.click()
          }
        }
        document.removeEventListener('touchmove', this._onTouchMove)
        document.removeEventListener('touchend', this._onTouchEnd)
      },
      _getTouchPos(e) {
        return e.changedTouches ? e.changedTouches[0].pageX : e.pageX
      },
      _getTranslateOffSet(index) {
        if (this.loop) {
          index += 1
        }
        return -1 * index * this.sliderWidth
      },
      _revert() {
        this.slide(this.currentIndex)
      },
      _autoPlay() {
        this.timer = setTimeout(() => {
          this.next()
        }, this.interval)
      },
      _onTransitionEnd() {
        clearTimeout(this.timer)
        if (!this.dragging && this.autoPlay) {
          if (this.currentIndex === 0) {
            this.transitionDuration = 0
            this.translateX = this._getTranslateOffSet(this.currentIndex)
          }
          if (this.currentIndex === this.sliderItems.length - 1) {
            this.transitionDuration = 0
            this.translateX = this._getTranslateOffSet(this.currentIndex)
          }
          if (this.loop) {
            this._autoPlay()
          }
        }
      },
      _addClass(el, className) {
        if (this._hasClass(el, className)) {
          return
        }
        let newClass = el.className.split(' ')
        newClass.push(className)
        el.className = newClass.join(' ')
      },
      _hasClass(el, className) {
        let reg = new RegExp('(^|\\s)' + className + '(\\s|$)')
        return reg.test(el.className)
      },
      slide(index, noAnimation) {
        this.currentIndex = index
        if (this.currentIndex === -1) {
          this.currentIndex = this.sliderItems.length - 1
        }
        if (this.currentIndex === this.sliderItems.length) {
          this.currentIndex = 0
        }
        if (noAnimation) {
          this.transitionDuration = 0
        } else {
          this.transitionDuration = this.speed
        }
        this.translateX = this._getTranslateOffSet(index)
      },
      prev() {
        let index = this.currentIndex
        if (index > 0 || this.loop) {
          this.slide(index - 1)
        } else {
          this._revert()
        }
      },
      next() {
        let index = this.currentIndex
        if (index < this.sliderItems.length - 1 || this.loop) {
          this.slide(index + 1)
        } else {
          this._revert()
        }
      }
    }

  }
</script>
<style scoped>
  * {
    margin: 0;
    padding: 0
  }

  .slider {
    position: relative;
    min-height: 1px
  }

  .slider .slider-wrap {
    position: relative;
    overflow: hidden;
    white-space: nowrap
  }

  .slider .slider-wrap .slider-item {
    float: left;
    box-sizing: border-box;
    overflow: hidden;
    text-align: center
  }

  .slider .slider-wrap .slider-item a{
    display: block;
    width: 100%;
    overflow: hidden;
    text-decoration: none
  }

  .slider .slider-wrap .slider-item img {
    display: block;
    width: 100%
  }

  .slider .slider-pagination {
    position: absolute;
    right: 0;
    left: 0;
    bottom: 7px;
    text-align: center;
    font-size: 0
  }

  .slider .slider-pagination .item {
    display: inline-block;
    margin: 0 4px;
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: hsla(0, 0%, 100%, .5)
  }

  .slider .slider-pagination .item.active{

    border-radius: 6px;
    background: hsla(0, 0%, 100%, .8);
    background-color: #fb4e90;
  }

</style>

