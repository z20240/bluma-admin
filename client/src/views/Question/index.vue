
<script language="javascript">
import CardComponent from "@/components/CardComponent";
import TitleBar from "@/components/TitleBar";

import data from "./questions.json";

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
            data,
            isPaginated: true,
            isPaginationSimple: true,
            isLoading: false,
            showDetailIcon: true,
            paginationPosition: "bottom",
            defaultSortDirection: "asc",
            sortIcon: "arrow-up",
            currentPage: 1,
            perPage: 20,
            pagelist: [10, 20, 50, 90],

            collaspeIsOpen: true,
            editType: CONST.EDIT_TYPES.CREATE,

            dataForm: {
                id: 0,
                question: "",
                answer: [{ id: 1, option: "" }],
                correct: 1
            }
        };
    },
    methods: {
        focusOn(refName, idx = null) {
            if (idx >= 0) this.$refs[refName][idx].focus();
        },
        newAnswerField() {
            const answerObj = {
                id: this.dataForm.answer.length + 1,
                option: ""
            };

            this.dataForm = {
                ...this.dataForm,
                answer: [...this.dataForm.answer, answerObj]
            };
        }
    }
};
</script>

<template>
    <section class="section">
        <title-bar>題庫</title-bar>

        <b-collapse class="card" animation="slide" aria-id="contentIdForA11y3">
            <div
                slot="trigger"
                slot-scope="props"
                class="card-header"
                role="button"
                aria-controls="contentIdForA11y3"
            >
                <p class="card-header-title">{{ CONST.EDIT_TYPES_MSG[ editType ] }}題庫</p>
                <a class="card-header-icon">
                    <b-icon :icon="props.open ? 'menu-down' : 'menu-up'" />
                </a>
            </div>
            <div class="card-content">
                <div class="content">
                    <b-field label="題目" style="width: 100%;">
                        <b-input
                            ref="questionInput"
                            type="text"
                            v-model="dataForm.question"
                            @keyup.enter.native="focusOn('answerInput', 0)"
                        />
                    </b-field>
                    <div style="width: 100%;">
                        <label class="label">選項</label>
                        <div v-for="(answer, indx) in dataForm.answer" :key="indx" class="columns">
                            <b-radio
                                class="column is-1"
                                v-model="dataForm.correct"
                                name="name"
                                :native-value="answer.id"
                            >{{answer.id}}.</b-radio>
                            <b-input
                                :ref="`answerInput`"
                                class="column"
                                type="text"
                                v-model="answer.question"
                                @keyup.enter.native="newAnswerField('answerInput', 0)"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </b-collapse>

        <card-component title="題庫列表" icon="table">
            <b-field grouped group-multiline>
                <b-select v-model="perPage" :disabled="!isPaginated">
                    <option
                        v-for="page_number in pagelist"
                        :key="page_number"
                        :value="page_number"
                    >{{page_number}}筆 / 頁</option>
                </b-select>
            </b-field>

            <b-table
                :data="data"
                :paginated="isPaginated"
                :per-page="perPage"
                :current-page.sync="currentPage"
                :pagination-simple="isPaginationSimple"
                :pagination-position="paginationPosition"
                :default-sort-direction="defaultSortDirection"
                :show-detail-icon="showDetailIcon"
                :sort-icon="`chevron-up`"
                :sort-icon-size="`is-small`"
                :loading="isLoading"
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
                    <b-table-column field="id" label="ID" width="40" sortable>{{ props.row.id }}</b-table-column>
                    <b-table-column field="question" label="題目" sortable>{{ props.row.question }}</b-table-column>
                    <b-table-column label="操作">這是操作欄</b-table-column>
                </template>

                <template slot="empty">
                    <section class="section">
                        <div class="content has-text-grey has-text-centered">
                            <p>
                                <b-icon icon="emoticon-sad" size="is-large"></b-icon>
                            </p>
                            <p>Nothing here.</p>
                        </div>
                    </section>
                </template>

                <template slot="detail" slot-scope="props">
                    <b-table
                        :data="props.row.answers"
                        :sort-icon="`chevron-up`"
                        :sort-icon-size="`is-small`"
                        striped
                        hoverable
                    >
                        <template slot-scope="answers">
                            <b-table-column field="id" label="ID" sortable>{{ answers.row.id }}</b-table-column>
                            <b-table-column
                                field="option"
                                label="選項"
                                sortable
                            >{{ answers.row.option }}</b-table-column>
                        </template>
                    </b-table>
                </template>
            </b-table>
        </card-component>
    </section>
</template>


<style>
</style>