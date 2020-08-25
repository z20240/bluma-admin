<template>
    <section class="main-content hero is-fullheight-with-navbar">
        <div v-if="loading === true">Loading...</div>
        <div v-else>
            <div class="logo" v-if="device.device.type !== 'desktop'">
                <img src="@/assets/images/MOBILE-test-logo.png" alt />
            </div>
            <div class="question_wrapper">
                <div class="question_bg">
                    <img
                        src="@/assets/images/PC-com-frame.png"
                        alt="question"
                        v-if="device.device.type === 'desktop'"
                    />
                    <img src="@/assets/images/MOBILE-test-frame.png" alt="question" v-else />
                </div>
                <div class="text_layer">
                    <div class="question_text">123</div>

                    <div class="answers">
                        <div class="row">
                            <div class="yes answer_btn" :click="handleClickAnswer(0)">
                                <img src="@/assets/images/PC-com-a.png" alt="question" />
                            </div>
                            <span>{{questions[current_no].answers[0]}}</span>
                        </div>
                        <div class="row">
                            <div class="no answer_btn" :click="handleClickAnswer(1)">
                                <img src="@/assets/images/PC-com-b.png" alt="question" />
                            </div>
                            <span>{{questions[current_no].answers[1]}}</span>
                            >
                        </div>
                    </div>
                </div>
            </div>
            <div class="doctor">
                <img src="@/assets/images/PC-com-doctor ask.png" alt="pr.logo" />
            </div>
        </div>
    </section>
</template>

<script>
import DeviceDetector from 'device-detector-js';
import { computed } from '@vue/composition-api';
import { apiGetExams } from '@/api';

export default {
    name: 'MainContent',
    setup() {
        const deviceDetector = new DeviceDetector();
        const device = computed(() =>
            deviceDetector.parse(navigator.userAgent)
        );
        console.log(`setup -> device`, device);
        return {
            device
        };
    },
    data() {
        return {
            questions: [],
            current_no: 0,
            loading: true
        };
    },
    async mounted() {
        this.getExams();
    },
    methods: {
        async getExams() {
            try {
                const { Data } = await apiGetExams();
                this.questions = Data;
                console.log("getExams -> this.questions", this.questions);
                console.log('getQuestion -> Data', Data);
            } catch (err) {
                console.error(err);
            }
        },
        handleClickAnswer () {
            console.log('click');
        }
    }
};
</script>
<style lang="scss" scoped>
.main-content {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-flow: row nowrap;

    @media screen and (min-width: 769px) {
        min-height: calc(100vh - 3.25rem - 52px);
        overflow: hidden;
    }
    height: calc(100vh - 2 * 1rem);
    overflow: auto;
    background-repeat: no-repeat;
    background-position: center center;
    background-size: cover;
    background-image: url("~@/assets/images/PC-com-bg.png");
    padding: 10px;

    @media screen and (max-width: 768px) {
        background-image: url("~@/assets/images/MOBILE-testpgae-bg.png");

        flex-flow: column nowrap;
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

    .doctor {
        margin-top: -65px;
    }

    .question_wrapper {
        position: relative;
    }

    .text_layer {
        text-align: center;
        position: absolute;
        top: 45%;
        left: 50%;
        transform: translateX(-50%);
    }

    .answers {
        display: flex;
        flex-flow: column nowrap;

        .row {
            display: flex;
            justify-content: center;
            align-items: center;
        }

        .answer_btn {
            max-width: 80px;
            max-height: 70px;
        }
    }
}
</style>
