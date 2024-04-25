<template>
  <div>
    <div class="choose_word__and__time" v-if="!this.countDownStart">
      <div class="type__words">
        <div @click="this.WordOrSentences = false" :class="!this.WordOrSentences ? 'activ_type_word' : ''">Words</div>
        <div @click="this.WordOrSentences = true"  :class="this.WordOrSentences ? 'activ_type_word' : ''">Sentences</div>
      </div>
      <div class="time">
        <div @click="countDownFirst" :class="this.countDown === 15 ? 'active__time' : ''">15</div>
        <div @click="countDownTwo"   :class="this.countDown === 30 ? 'active__time' : ''">30</div>
        <div @click="countDownThree" :class="this.countDown === 45 ? 'active__time' : ''">45</div>
        <div @click="countDownFour"  :class="this.countDown === 60 ? 'active__time' : ''">60</div>
      </div>
    </div>
    <div v-if="this.countDownStart">
      {{ countDown }}
    </div>
    <div class="type">
      <div v-if="!this.WordOrSentences" class="type__word">
        <p v-for="(word, i) in joinWords" key="i" :class="i < this.index ? 'passed' : 'notpassed'">
        <span>
          {{ word }}
        </span>
        </p>
      </div>
      <div v-if="this.WordOrSentences">
        <p v-for="(word, i) in sentences" key="i" :class="i < this.index ? 'passed' : 'notpassed'">
        <span>
          {{ word }}
        </span>
        </p>
      </div>
    </div>
    <div v-if="this.result">
      Your WPM{{resultWPM}}
      </div>
  </div>
</template>
<script>
import enWord from "../../enWord";
import enText from "../../enText";

export default {
  name: 'HomeView',
  data() {
    return {
      sentences: [...enText[Math.floor(Math.random() * enText.length.toFixed())]],
      words: [],
      joinWords: null,
      index: 0,
      indexErrors: 0,
      countDown: 15,
      resultWPM: 0,
      result: false,
      countDownStart: false,
      WordOrSentences: false,
      timeInMinute: null,
    }
  },
  methods: {
    countDownFirst (){
      this.countDown = 15
      this.timeInMinute = 0.25
    },
    countDownTwo (){
      this.countDown = 30
      this.timeInMinute = 0.50
    },
    countDownThree (){
      this.countDown = 45
      this.timeInMinute = 0.75
    },
    countDownFour (){
      this.countDown = 60
      this.timeInMinute = 1
    },
    randomWords() {
      for (let i = 0; i < 100; i++) {
        let idx = Math.floor(Math.random() * enWord.length.toFixed());
        this.words.push(enWord[idx]);
        enWord.splice(idx, 1);
      }
      this.joinWords = this.words.join(" ")
    },
    once(fn, context) {
      let result;
      return function () {
        if (fn) {
          result = fn.apply(context || this, arguments);
          fn = null;
        }
        return result;
      };
    },
    countDownTimer() {
      if (this.countDown > 0) {
        setTimeout(() => {
          this.countDown -= 1
          this.countDownTimer()
        }, 1000)
      }
      if(this.countDown === 0) {
        this.resultOfType()
      }
    },
    keyDownWindow() {
      let countOnce = this.once(this.countDownTimer)

      window.addEventListener("keydown", (e) => {
        if (e.key.length === 1) {
          this.countDownStart = true
          if (!this.WordOrSentences) {
            if (e.key === this.joinWords[this.index]) {
              countOnce()
              this.index = this.index + 1
              console.log(this.index)
            } else {
              this.indexErrors = this.indexErrors + 1
              console.log(`This is your errors dude ${this.indexErrors}`)
            }
          } else {
            if (e.key === this.sentences[this.index]) {
              countOnce()
              this.index = this.index + 1
              console.log(this.index)
            } else {
              this.indexErrors = this.indexErrors + 1
              console.log(`This is your errors dude ${this.indexErrors}`)
            }
          }

        }
      })
    },
    resultOfType() {
        this.result = true
        this.resultWPM = ((this.index / 5) / this.timeInMinute).toFixed()
        // if(this.time.countDownFirs) {
        //   this.timeInMinute = 0.25
        //   console.log(this.timeInMinute);
        // } else if (this.time.countDownTw) {
        //   console.log(this.timeInMinute);
        //   this.timeInMinute = 0.50
        // }else if (this.time.countDownThre) {
        //   console.log(this.timeInMinute);
        //   this.timeInMinute = 0.75
        // } else if(this.time.countDownFou) {
        //   console.log(this.timeInMinute);
        //   this.timeInMinute = 1
        // } else {
        //   console.log("Ohshamadi bolam");
        // }
    },
    removeKeyDownWindow() {
      window.removeEventListener('keydown', this.keyDownWindow)
    },
  },
  mounted() {
    this.keyDownWindow()
    this.randomWords()
      
  },
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Roboto+Mono:ital,wght@0,400;0,600;1,300;1,400;1,600&display=swap');

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

.type div {
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
}

.type span {
  font-size: 18px;
  letter-spacing: 2px;
  line-height: 30px;
  width: 12px;
  display: flex;
  font-family: 'Roboto Mono', monospace;
}

.time {
  display: flex;
  padding: 20px;
}

.time div {
  cursor: pointer;
  padding: 20px;
  font-family: 'Roboto Mono', monospace;
}

.type__words {
  display: flex;
}

.type__words div {
  cursor: pointer;
  font-family: 'Roboto Mono', monospace;
  padding: 20px;
}
.choose_word__and__time {
  display: flex;
  justify-content: center;
  align-items: center;
}
.activ_type_word {
  font-weight: 700;
}
.active__time {
  font-weight: 700;
}
.type__word{
  height: 400px;
  overflow: hidden;
}
</style>