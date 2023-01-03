<template>
  <div class="about">

    {{ countDown }}
    <div>
      <span :class="i < this.index ? 'passed' : 'notpassed'" v-for="(letter, i) in texts"
            key="letter.id">{{ letter }}</span>
    </div>
    {{resultWPM}}
  </div>
</template>
<script>
import enText from "../../enText";

export default {
  name: 'AboutView',
  data() {
    return {
      texts: [...enText[Math.floor(Math.random() * enText.length.toFixed())]],
      index: 0,
      indexErrors: 0,
      countDown: 10,
      resultWPM: 0
    }
  },
  methods: {

    once(fn, context) {
      var result;
      return function () {
        if (fn) {
          result = fn.apply(context || this, arguments);
          fn = null;
        }
        return result;
      };
    },
    resultOfType() {
      let result = ((this.index / 5) / 0.16).toFixed()
      result = this.resultWPM
      console.log(result)
    },
    removeKeyDownWindow() {
      window.removeEventListener('keydown', this.keyDownWindow)
    },
    countDownTimer() {
      if (this.countDown > 0) {
        setTimeout(() => {
          this.countDown -= 1
          this.countDownTimer()
          this.startCountDownTimer = true
        }, 1000)
      }
      if (this.countDown <= 0) {
        this.resultOfType()
        this.removeKeyDownWindow()
      }
    },
    keyDownWindow() {
      var countOnce = this.once(this.countDownTimer)

      window.addEventListener("keydown", (e) => {
        countOnce()
        if (e.key.length === 1) {
          if (e.key === this.texts[this.index]) {
            this.index = this.index + 1
          } else {
            this.indexErrors = this.indexErrors + 1
            console.log(`This is your errors dude ${this.indexErrors}`)
          }
        }
      })
    },

  },
  mounted() {
    this.keyDownWindow(this.resultOfType)
    // setTimeout(() => {
    //   this.removeKeyDownWindow()
    //   this.resultOfType()
    // }, 10000)

  }
}
</script>

<style>
.passed {
  color: #fff;
  background-color: #333;
}

.notpassed {
  color: #000;
}

.df {
  display: flex;
}

.df div {
  margin-right: 20px;
}

.about div {
  border: 2px solid #1ea9d5;
  padding: 20px;
}

.about span {
  font-size: 18px;
  letter-spacing: 2px;
  line-height: 30px;
}
</style>