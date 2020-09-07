<template>
    <div :class="isLoading ? 'rootWrapper' : ''">
        <div class="main-content" v-if="isLoading">
            Loading
            <b-icon icon="dots-horizontal" size="is-large" />
        </div>
        <div v-else>
            <section class="main-content hero is-fullheight-with-navbar">
                <div class="container">
                    <div class="logo" v-if="device.device.type !== 'desktop'">
                        <img src="@/assets/images/test-logo.png" alt />
                    </div>
                    <div
                        :class="[
                            'question_wrapper',
                            device.device.type === 'desktop' ? 'desktop' : ''
                        ]"
                    >
                        <div class="logo" v-if="device.device.type === 'desktop'">
                            <img src="@/assets/images/test-logo.png" alt />
                        </div>
                        <div class="question_bg">
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
                                            questions[current_no].answers[0]
                                            .option
                                            }}
                                        </span>
                                    </div>
                                    <div class="row">
                                        <div class="no answer_btn" @click="handleClickAnswer(2)">
                                            <img src="@/assets/images/PC-com-b.png" alt="question" />
                                        </div>
                                        <span>
                                            {{
                                            questions[this.current_no]
                                            .answers[1].option
                                            }}
                                        </span>
                                    </div>
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

        <div class="mask_bg" v-if="showResultButton">
            <div class="pc_wrapper" v-if="showResult">
                <div class="logo" v-if="device.device.type !== 'desktop'">
                    <img src="@/assets/images/test-logo.png" alt />
                </div>
                <div class="resultWrapper">
                    <div class="frame_bg">
                        <div class="logo" v-if="device.device.type === 'desktop'">
                            <img src="@/assets/images/test-logo.png" alt />
                        </div>
                        <div class="content">
                            <div class="doctor_gif">
                                <img :src="showGIF" alt />
                            </div>
                            <div class="scoreWrapper">
                                <div class="score">
                                    <img src="@/assets/images/result_score.png" alt />
                                </div>
                                <div class="score_hr" v-if="device.device.type !== 'desktop'"></div>
                                <div class="score_number">
                                    <img :src="showScore" alt />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="resultBtn" v-else @click="showResult = true">
                <img src="@/assets/images/PC-com-result.png" alt="go to see the result" />
            </div>
        </div>
    </div>
</template>

<script>
import DeviceDetector from 'device-detector-js';
import { apiGetExams, apiGetResult } from '@/api';
import axios from 'axios';
const deviceDetector = new DeviceDetector();

export default {
    name: 'MainContent',
    data() {
        return {
            questions: [],
            answers: {},
            current_no: 0,
            score: 0,
            isLoading: true,
            showResultButton: false,
            showResult: false
        };
    },
    computed: {
        device() {
            return deviceDetector.parse(navigator.userAgent);
        },
        showGIF() {
            if (this.score === 0) return require(`@/assets/images/gif/0.gif`);
            if (this.score <= 30) return require(`@/assets/images/gif/30.gif`);
            if (this.score <= 60) return require(`@/assets/images/gif/60.gif`);
            if (this.score <= 90) return require(`@/assets/images/gif/90.gif`);
            return require(`@/assets/images/gif/100.gif`);
        },
        showScore() {
            return require(`@/assets/images/number/${this.score}.png`);
        }
    },
    mounted() {
        this.getExams();
        this.getIP();
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
        async getIP() {
            axios
                .get('http://api.ipify.org/?format=json')
                .then(({data}) => {
                    this.ip = data.ip;
                })
                .catch(function(error) {
                    // 请求失败处理
                    console.error(error);
                });
        },
        async handleSubmit() {
            try {
                this.isLoading = true;
                const { data } = await apiGetResult({
                    ip: this.ip,
                    answers: this.answers
                });
                this.isLoading = false;
                this.score = data.Score;
            } catch (err) {
                console.error(err);
            }
        },
        handleClickAnswer(answer) {
            this.answers[this.questions[this.current_no].id] = answer;
            if (this.current_no === 9) {
                this.showResultButton = true;
                this.handleSubmit();
            } else {
                this.current_no += 1;
            }
        }
    }
};
</script>
<style lang="scss" scoped>
.rootWrapper {
    display: flex;
    height: 100vh;
}
.main-content {
    flex: 1 0 auto;
    font-family: Aria;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-flow: row nowrap;
    overflow: auto;
    background-repeat: no-repeat;
    background-position: center center;
    background-size: cover;
    background-image: url('~@/assets/images/PC-com-bg.png');
    padding: 10px;

    @media screen and (min-width: 769px) {
        background-image: url('~@/assets/images/MOBILE-testpgae-bg.png');
    }

    .container {
        width: 700px;
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
        width: 100%;

        .question_text {
            font-size: 28px;
        }

        .logo {
            position: absolute;
            z-index: 1;
            left: 50%;
            transform: translate(-50%, -60%);
            @media screen and (max-width: 768px) {
                max-width: 500px;
            }
        }
        .question_bg {
            min-width: 400px;
            min-height: 300px;
            position: relative;
            box-sizing: border-box;
            padding: 20px;
            background-image: url('~@/assets/images/PC-test-frame.png');
            background-position: center center;
            background-size: 100% 100%;
            background-repeat: no-repeat;
            @media screen and (max-width: 768px) {
                background-image: url('~@/assets/images/MOBILE-test-frame.png');
                padding: 10px;
                min-width: 0;
            }
        }
    }

    .text_layer {
        position: relative;
        padding: 50px;

        text-align: left;

        color: white;
        font-size: 20px;
        font-weight: bold;
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
            min-width: 50px;
            max-width: 50px;
            max-height: 50px;
            margin-right: 5px;
            cursor: pointer;
        }
    }

    .doctor {
        max-width: 300px;
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
.mask_bg {
    z-index: 2;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgb(0, 0, 0, 0.8);
    padding-top: 52px;

    @media screen and (max-width: 768px) {
        padding-top: 60px;
    }

    .pc_wrapper {
        width: 80%;
        height: 100%;
        display: flex;
        align-items: center;
        @media screen and (max-width: 768px) {
            flex-flow: column nowrap;
        }
    }

    .resultBtn {
        cursor: pointer;
        position: absolute;
        bottom: 50px;
        left: 50%;
        transform: translateX(-50%);
        @media screen and (max-width: 768px) {
            width: 90%;
            bottom: 40%;
            & > img {
                min-width: 250px;
            }
        }
    }

    .resultWrapper {
        width: 100%;
    }

    .logo {
        position: absolute;
        top: -76px;
        left: 50%;
        transform: translateX(-50%);
        min-width: 400px;

        @media screen and (max-width: 768px) {
            position: relative;
            top: 0;
            left: 0;
            transform: none;
            min-width: 250px;
        }
    }

    .frame_bg {
        position: relative;
        height: 500px;
        margin: 0 auto;
        background-image: url('~@/assets/images/PC-result_frame.png'); //replace new image for pc
        background-position: center center;
        background-size: 100% 100%;
        background-repeat: no-repeat;

        .logo {
            img {
                max-height: 152px;
            }
        }

        & > img {
            height: 100%;
            width: 100%;
        }
        @media screen and (max-width: 768px) {
            background-image: url('~@/assets/images/result_frame.png');
            min-width: 250px;
        }
    }

    .content {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        display: flex;
        flex-flow: column nowrap;
        justify-content: center;
        align-items: center;
        padding: 30px;

        @media screen and (max-width: 768px) {
            justify-content: flex-start;
        }

        .doctor_gif {
            height: 300px;
            & > img {
                height: 100%;
            }
            @media screen and (max-width: 768px) {
                min-width: 250px;
                height: 250px;
            }
        }
        .scoreWrapper {
            display: flex;
            border: 5px solid black;
            border-radius: 50px;
            padding: 10px 50px;

            @media screen and (max-width: 768px) {
                width: 100%;
                height: 100%;
                border: none;
                border-radius: 0;
                flex-flow: column nowrap;
                padding: 10px 0;
                align-items: center;
                justify-content: space-around;
            }
        }

        .score {
            max-width: 180px;
            display: flex;
            align-items: center;
        }

        .score_hr {
            height: 3px;
            width: 100%;
            background: #4ae3f2;
            border-radius: 50px;
        }

        .score_number {
            display: inline-flex;
            align-items: center;
            height: 50px;
            margin-left: 5px;

            @media screen and (max-width: 768px) {
                max-width: 180px;
                height: 100px;
                padding-top: 20px;
            }

            & > img {
                height: 130px;
                @media screen and (max-width: 768px) {
                    height: 100%;
                }
            }
        }
    }
}
</style>
