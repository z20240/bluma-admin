
<script language="javascript">
import { mapGetters, mapActions } from "vuex";
import CardComponent from "@/components/CardComponent";
import TitleBar from "@/components/TitleBar";

const CONST = {
    EDIT_TYPES: {
        CREATE: "create",
        EDIT: "edit"
    },
    EDIT_TYPES_MSG: {
        create: "新增",
        edit: "編輯"
    }
};

export default {
    name: "Question",
    components: { TitleBar, CardComponent },
    data() {
        return {
            CONST,
            isPaginated: true,
            isPaginationSimple: true,
            showDetailIcon: true,
            paginationPosition: "bottom",
            defaultSortDirection: "asc",
            sortIcon: "arrow-up",
            currentPage: 1,
            perPage: 20,
            pagelist: [10, 20, 50, 90],

            collaspeIsOpen: true,

            /** @type {import('../../interface/IQuestion').IQuestion} */
            dataForm: {
                id: 0,
                question: "",
                answers: [{ id: 1, option: "" }],
                correct: 1
            }
        };
    },
    computed: {
        ...mapGetters("question", ["questions", "isloading"]),
        editType() {
            return !this.dataForm.id
                ? CONST.EDIT_TYPES.CREATE
                : CONST.EDIT_TYPES.EDIT;
        }
    },
    mounted() {
        this.getQuestions();
    },
    methods: {
        ...mapActions("question", [
            "createQuestion",
            "getQuestions",
            "updateQuestion",
            "deleteQuestion"
        ]),
        reset() {
            this.$data.dataForm = this.$options.data().dataForm;
        },
        newOption(dataForm) {
            const lastIdx = dataForm.answers.length;

            const answerObj = {
                id: lastIdx + 1,
                option: ""
            };

            return {
                ...dataForm,
                answers: [...dataForm.answers, answerObj]
            };
        },
        focusOn(refName, idx = null) {
            if (idx >= 0) this.$refs[refName][idx].focus();
        },
        focusToOption() {
            if (!this.dataForm.answers.length) this.dataForm = this.newOption(this.dataForm);

            this.$nextTick(() => this.focusOn('answerInput', 0));
        },
        newAnswerField(refName) {
            const lastIdx = this.dataForm.answers.length;

            this.dataForm = this.newOption(this.dataForm);

            this.$nextTick(() => this.focusOn(refName, lastIdx));
        },
        cancel() {
            this.reset();
        },
        modifyHandler() {
            const filterOutEmptyOption = dataform => ({
                ...dataform,
                answers: dataform.answers.filter(opt => opt.option)
            });

            const isOptionEmpty = opt => !opt.option;

            const actionMap = {
                [this.CONST.EDIT_TYPES.CREATE]: this.createQuestion,
                [this.CONST.EDIT_TYPES.EDIT]: this.updateQuestion
            };

            // TODO: validations
            if (this.dataForm.answers.every(isOptionEmpty)) return this.$buefy.toast.open({
                message: `Error: 需要至少一項選項`,
                type: 'is-danger'
            });

            this.dataForm = filterOutEmptyOption(this.dataForm);

            actionMap[this.editType](this.dataForm);

            this.reset();
        },
        loadUpdateForm(row) {
            this.dataForm = JSON.parse(JSON.stringify(row));
        },
        deleteHandler(row) {

            this.$buefy.dialog.confirm({
                message: '確定刪除此筆資料嗎?',
                onConfirm: () => this.deleteQuestion(row)
            });
        }
    }
};
</script>

<template>
    <section class="section">
        <title-bar>題庫</title-bar>

        <b-collapse class="card" animation="slide" aria-id="contentIdForA11y3">
            <div slot="trigger" slot-scope="props" class="card-header" role="button" aria-controls="contentIdForA11y3">
                <p class="card-header-title">{{ CONST.EDIT_TYPES_MSG[ editType ] }}題庫</p>
                <a class="card-header-icon">
                    <b-icon :icon="props.open ? 'menu-down' : 'menu-up'" />
                </a>
            </div>
            <div class="card-content">
                <div class="content">
                    <b-field label="題目">
                        <b-input
                            ref="questionInput"
                            type="text"
                            v-model="dataForm.question"
                            placeholder="範例題目..."
                            validation-message="題目不得為空"
                            @keyup.enter.native="focusToOption"
                            required
                        />
                    </b-field>
                    <div>
                        <label class="label">選項</label>
                        <div v-for="(answer, indx) in dataForm.answers" :key="indx" class="columns">
                            <b-radio class="column is-1" v-model="dataForm.correct" name="name" :native-value="answer.id">{{answer.id}}.</b-radio>
                            <b-input
                                :ref="`answerInput`"
                                class="column"
                                type="text"
                                v-model="answer.option"
                                placeholder="範例選項..."
                                @keyup.enter.native="newAnswerField('answerInput')"
                            />
                        </div>
                    </div>

                    <div class="level">
                        <div class="level-left" />

                        <div class="level-right">
                            <b-button class="level-item" type="is-success" outlined @click="modifyHandler">
                                <b-icon icon="check" custom-size="default" />確定
                            </b-button>
                            <b-button class="level-item" type="is-danger" outlined @click="cancel">
                                <b-icon icon="window-close" custom-size="default" />放棄
                            </b-button>
                        </div>
                    </div>
                </div>
            </div>
        </b-collapse>

        <card-component title="題庫列表" icon="table">
            <b-field grouped group-multiline>
                <b-select v-model="perPage" :disabled="!isPaginated">
                    <option v-for="page_number in pagelist" :key="page_number" :value="page_number">{{page_number}}筆 / 頁</option>
                </b-select>
            </b-field>

            <b-table
                :data="questions"
                :paginated="isPaginated"
                :per-page="perPage"
                :current-page.sync="currentPage"
                :pagination-simple="isPaginationSimple"
                :pagination-position="paginationPosition"
                :default-sort-direction="defaultSortDirection"
                :show-detail-icon="showDetailIcon"
                :sort-icon="`chevron-up`"
                :sort-icon-size="`is-small`"
                :loading="isloading"
                detailed
                striped
                hoverable
                default-sort="id"
                aria-next-label="Next page"
                aria-previous-label="Previous page"
                aria-page-label="Page"
                aria-current-label="Current page"
            >
                <template slot-scope="props">
                    <!-- <b-table-column field="id" label="ID" width="40" sortable>{{ props.row.id }}</b-table-column> -->
                    <b-table-column field="question" label="題目" sortable>{{ props.row.question }}</b-table-column>
                    <b-table-column label="操作" width="15rem">
                        <div class="level">
                            <b-button class="level-item" type="is-primary" outlined @click="loadUpdateForm(props.row)">
                                <b-icon icon="square-edit-outline" custom-size="default" />修改
                            </b-button>
                            <b-button class="level-item" type="is-danger" outlined @click="deleteHandler(props.row)">
                                <b-icon icon="delete-empty" custom-size="default" />刪除
                            </b-button>
                        </div>
                    </b-table-column>
                </template>

                <template slot="empty">
                    <section class="section">
                        <div class="content has-text-grey has-text-centered">
                            <p>
                                <b-icon icon="emoticon-sad" size="is-large"></b-icon>
                            </p>
                            <p>Nothing data here.</p>
                        </div>
                    </section>
                </template>

                <template slot="detail" slot-scope="props">
                    <b-table :data="props.row.answers" :sort-icon="`chevron-up`" :sort-icon-size="`is-small`" striped hoverable>
                        <template slot-scope="answers">
                            <!-- <b-table-column field="id" label="ID" sortable>{{ answers.row.id }}</b-table-column> -->
                            <b-table-column field="option" label="選項" sortable>{{ answers.row.option }}</b-table-column>
                        </template>
                    </b-table>
                </template>
            </b-table>
        </card-component>
    </section>
</template>

<style lang="scss" scoped>
.columns:last-child {
    margin-bottom: 0.75rem;
}
</style>