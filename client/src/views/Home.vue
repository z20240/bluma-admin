<template>
    <section class="section">
        {{ correctRateByEachQuestions }}
        {{ Array.from(new Set(logs.flatMap(log => log.details).map(m => m.id))) }}
        <title-bar>歡迎, {{ userName }}!</title-bar>
        <tiles>
            <card-widget
                class="tile is-child"
                type="is-primary"
                icon="frequently-asked-questions"
                :number="logs.length"
                label="總答題數"
            />
            <card-widget
                class="tile is-child"
                type="is-info"
                icon="percent-outline"
                :number="avgCorrectRate"
                suffix="%"
                label="答題正確率"
            />
        </tiles>

        <card-component title="各題目答對率" icon="finance">
            <div v-if="defaultChart.chartData" class="chart-area">
                <bar-chart
                    style="height: 100%"
                    ref="bigBarChart"
                    chart-id="big-bar-chart"
                    :chart-data="barChartDataSets"
                    :extra-options="barChartOptions"
                ></bar-chart>
            </div>
        </card-component>

        <card-component
            title="Performance"
            @header-icon-click="fillChartData"
            icon="finance"
            header-icon="reload"
        >
            <div v-if="defaultChart.chartData" class="chart-area">
                <line-chart
                    style="height: 100%"
                    ref="bigChart"
                    chart-id="big-line-chart"
                    :chart-data="defaultChart.chartData"
                    :extra-options="defaultChart.extraOptions"
                ></line-chart>
            </div>
        </card-component>

        <card-component title="Clients" class="has-table">
            <clients-table-sample
                :data-url="`${$router.options.base}data-sources/clients.json`"
                :checkable="true"
            />
        </card-component>
    </section>
</template>

<script>
// @ is an alias to /src
import moment from 'moment';
import { mapGetters } from 'vuex';
import { apiGetHistory, apiGetAllQuestion } from '@/api';
import * as chartConfig from '@/components/Charts/chart.config';
import CardComponent from '@/components/CardComponent';
import Tiles from '@/components/Tiles';
import CardWidget from '@/components/CardWidget';
import BarChart from '@/components/Charts/BarChart';
import LineChart from '@/components/Charts/LineChart';
import ClientsTableSample from '@/components/ClientsTableSample';
import TitleBar from '@/components/TitleBar';

export default {
    name: 'home',
    components: {
        TitleBar,
        ClientsTableSample,
        CardWidget,
        Tiles,
        CardComponent,
        BarChart,
        LineChart
    },
    data() {
        return {
            queryData: {
                startTime: moment().subtract(1, 'months').format('YYYY-MM-DDTHH:mm:ssZ'),
                endTime: moment().format('YYYY-MM-DDTHH:mm:ssZ'),
            },
            /** @type { import('../interface/IHistory').ILog[] } */
            logs: [],
            /** @type { impport('../interface/IQuestion').IQuestion[] } */
            questions: [],
            defaultChart: {
                chartData: null,
                extraOptions: chartConfig.chartOptionsMain
            }
        };
    },
    computed: {
        ...mapGetters('app', [
            'userName'
        ]),
        avgCorrectRate() {
            const rate = this.logs.reduce((pre, cur) => pre + cur.score, 0) / (this.logs.length * 100);
            return Math.round(rate * 10000) / 100;
        },
        questionIDs() {
            return this.questions.map(question => question.id);
        },
        questionMap() {
            return this.questions.reduce((prev, question) => ({
                ...prev,
                [question.id]: question
            }), {});
        },
        correctRateByEachQuestions() {
            const roundTo2 = (x, y) => Math.round(Number(x) / Number(y) * 10000) / 100;

            // 這邊改成只顯示有被答題過的

            const correctQuestionsMap = this.logs
                .flatMap(log => log.details)
                .reduce((prev, {id, correct}) => ({
                    ...prev,
                    [id]: {
                        count: prev[id] ? prev[id].count + 1 : 1,
                        correct: prev[id] ? prev[id].correct + Number(!!correct) : Number(!!correct)
                    },
                }), {});

            return this.questionIDs.map(id => {
                const record = correctQuestionsMap[id];
                return record ? roundTo2(record.correct, record.count) : 0;
            });
        },
        barChartDataSets() {
            return {
                datasets: [
                    {
                        backgroundColor: `rgba(0, 209, 178, 0.1)`,
                        borderColor: `rgba(0, 209, 178, 0.8)`,
                        borderWidth: 1,
                        borderSkipped: 'left',
                        data: this.correctRateByEachQuestions
                    }
                ],
                labels: this.questionIDs // 這邊要跟著動
            };
        },
        barChartOptions() {
            const self = this;
            return {
                maintainAspectRatio: false,
                legend: { display: false },
                responsive: true,
                tooltips: {
                    callbacks: {
                        title: function([tooltipItem]) {
                            return `題 ${tooltipItem.label}：${self.questionMap[tooltipItem.label].question}`;
                        },
                        label: function(tooltipItem, data) {
                            console.log("barChartOptions -> tooltipItem, data", tooltipItem, data);
                            return `答對率：${tooltipItem.value}%`;
                        },
                    },
                    backgroundColor: '#aaa',
                    titleFontColor: '#333',
                    bodyFontColor: '#111',
                    bodySpacing: 4,
                    xPadding: 12,
                    mode: 'nearest',
                    intersect: 0,
                    position: 'nearest'
                },
            };
        }

    },
    mounted() {
        this.getAllQuestions();
        this.getHistory();

        this.fillChartData();

        this.$buefy.snackbar.open({
            message: 'Welcome back',
            queue: false
        });
    },
    methods: {
        async getHistory() {
            try {
                const { data } = await apiGetHistory(this.queryData);
                this.logs = data.Data;
                console.log("getHistory -> data", this.logs);
            } catch (err) {
                console.error("getHistory -> err", err);
                this.$buefy.snackbar.open({
                    message: 'Cannot get history',
                    type: 'is-danger',
                    queue: false
                });
            }
        },
        async getAllQuestions() {
            try {
                const { data } = await apiGetAllQuestion();
                this.questions = data.Data;
                console.log("getAllQuestions -> data", this.questions);
            } catch (err) {
                console.error("getAllQuestions -> err", err);
                this.$buefy.snackbar.open({
                    message: 'Cannot get questions',
                    type: 'is-danger',
                    queue: false
                });
            }
        },
        randomChartData(n) {
            const data = [];

            for (let i = 0; i < n; i++) {
                data.push(Math.round(Math.random() * 200));
            }

            return data;
        },
        fillChartData() {
            this.defaultChart.chartData = {
                datasets: [
                    {
                        fill: false,
                        borderColor: chartConfig.chartColors.default.primary,
                        borderWidth: 2,
                        borderDash: [],
                        borderDashOffset: 0.0,
                        pointBackgroundColor:
                            chartConfig.chartColors.default.primary,
                        pointBorderColor: 'rgba(255,255,255,0)',
                        pointHoverBackgroundColor:
                            chartConfig.chartColors.default.primary,
                        pointBorderWidth: 20,
                        pointHoverRadius: 4,
                        pointHoverBorderWidth: 15,
                        pointRadius: 4,
                        data: this.randomChartData(9)
                    },
                    {
                        fill: false,
                        borderColor: chartConfig.chartColors.default.info,
                        borderWidth: 2,
                        borderDash: [],
                        borderDashOffset: 0.0,
                        pointBackgroundColor:
                            chartConfig.chartColors.default.info,
                        pointBorderColor: 'rgba(255,255,255,0)',
                        pointHoverBackgroundColor:
                            chartConfig.chartColors.default.info,
                        pointBorderWidth: 20,
                        pointHoverRadius: 4,
                        pointHoverBorderWidth: 15,
                        pointRadius: 4,
                        data: this.randomChartData(9)
                    },
                    {
                        fill: false,
                        borderColor: chartConfig.chartColors.default.danger,
                        borderWidth: 2,
                        borderDash: [],
                        borderDashOffset: 0.0,
                        pointBackgroundColor:
                            chartConfig.chartColors.default.danger,
                        pointBorderColor: 'rgba(255,255,255,0)',
                        pointHoverBackgroundColor:
                            chartConfig.chartColors.default.danger,
                        pointBorderWidth: 20,
                        pointHoverRadius: 4,
                        pointHoverBorderWidth: 15,
                        pointRadius: 4,
                        data: this.randomChartData(9)
                    }
                ],
                labels: ['01', '02', '03', '04', '05', '06', '07', '08', '09']
            };
        }
    }
};
</script>
