<template>
  <div class="main-content" v-if="isLoading">
    <b-icon icon="dots-horizontal" size="is-large" />
    <div>Loading...</div>
  </div>
  <div v-else>
    <section class="main-content hero is-fullheight-with-navbar">
      <div class="container">
        <div class="logo" v-if="device.device.type !== 'desktop'">
          <img src="@/assets/images/test-logo.png" alt />
        </div>
        <div class="question_wrapper">
          <div class="logo" v-if="device.device.type === 'desktop'">
            <img src="@/assets/images/test-logo.png" alt />
          </div>
          <div class="question_bg">
            <img
              src="@/assets/images/PC-test-frame.png"
              alt="question"
              v-if="device.device.type === 'desktop'"
            />
            <img src="@/assets/images/MOBILE-test-frame.png" alt="question" v-else />
          </div>
          <div class="text_layer">
            <div class="question_text">
              Q{{ current_no + 1 }}:
              {{ questions[current_no].question }}
            </div>

            <div class="answers">
              <div class="row">
                <div class="yes answer_btn" @click="handleClickAnswer(1)">
                  <img src="@/assets/images/PC-com-a.png" alt="question" />
                </div>
                <span>
                  {{
                  questions[current_no].answers[0].option
                  }}
                </span>
              </div>
              <div class="row">
                <div class="no answer_btn" @click="handleClickAnswer(2)">
                  <img src="@/assets/images/PC-com-b.png" alt="question" />
                </div>
                <span>
                  {{
                  questions[this.current_no].answers[1]
                  .option
                  }}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div class="doctor">
          <img src="@/assets/images/PC-com-doctor ask.png" alt="pr.logo" />
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import DeviceDetector from 'device-detector-js';
import IP from 'ip';
import { apiGetExams, apiGetResult } from '@/api';

const deviceDetector = new DeviceDetector();
const ip =  IP.address();

export default {
    name: 'MainContent',
    data() {
        return {
            questions: [],
            answers: {},
            current_no: 0,
            isLoading: true
        };
    },
    computed: {
        device() {
            return deviceDetector.parse(navigator.userAgent);
        }
    },
    mounted() {
        this.getExams();
    },
    methods: {
        async getExams() {
            try {
                this.isLoading = true;
                const { data } = await apiGetExams();
                this.questions = data.Data;
                this.isLoading = false;
            } catch (err) {
                console.error(err);
            }
        },
        async handleSubmit() {
            try {
                this.isLoading = true;
                const { data } = await apiGetResult({
                    ip,
                    answers: this.answers
                });
                console.log("handleSubmit -> data", data);
            } catch (err) {
                console.error(err);
            }
        },
        handleClickAnswer(answer) {
            this.answers[this.questions[this.current_no].id] = answer;
            if (this.current_no === 9) {
                this.handleSubmit();
            } else {
                this.current_no += 1;
            }
        }
    }
};
</script>
<style lang="scss" scoped>
.main-content {
  font-family: Aria;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-flow: row nowrap;
  // height: calc(100vh - 2 * 1rem);
  overflow: auto;
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
  background-image: url("~@/assets/images/PC-com-bg.png");
  padding: 10px;

  @media screen and (min-width: 769px) {
    background-image: url("~@/assets/images/MOBILE-testpgae-bg.png");
  }

  .container {
    display: flex;
    justify-content: center;
    align-items: flex-start;
    @media screen and (max-width: 768px) {
      flex-flow: column nowrap;
      align-items: center;
    }
  }

  .question_wrapper {
    position: relative;
    background-repeat: no-repeat;
    background-position: center center;
    background-size: cover;
    background-image: url("~@/assets/images/PC-test-frame.png");
    @media screen and (max-width: 768px) {
      background-image: url("~@/assets/images/MOBILE-test-frame.png");
    }

    .question_text {
      font-size: 28px;
      @media screen and (max-width: 500px) {
        font-size: 20px;
      }
    }

    .logo {
      position: absolute;
      left: 50%;
      transform: translate(-50%, -50%);
      @media screen and (max-width: 768px) {
        max-width: 500px;
      }
    }
    .question_bg > img {
      opacity: 0;
    }
  }

  .text_layer {
    text-align: left;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: white;
    font-size: 20px;
    font-weight: bold;

    @media screen and (max-width: 500px) {
      padding: 20px;
      top: 0%;
      left: 0%;
      transform: translate(0%, 0%);
    }
  }

  .answers {
    padding-top: 5px;
    display: flex;
    flex-flow: column nowrap;

    .row {
      display: flex;
      justify-content: flex-start;
      align-items: center;

      &:nth-child(1) {
        margin-bottom: 10px;
      }
    }

    .answer_btn {
      max-width: 50px;
      max-height: 50px;
      margin-right: 5px;
      cursor: pointer;
    }
  }

  .doctor {
    @media screen and (max-width: 768px) {
      max-width: 300px;
    }
  }

  @media screen and (max-width: 768px) {
    .logo {
      order: 1;
    }
    .question_wrapper {
      order: 3;
    }
    .doctor {
      order: 2;
    }
  }
}
</style>
