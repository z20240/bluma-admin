
<script language="javascript">
import CardComponent from "@/components/CardComponent";
import TitleBar from "@/components/TitleBar";

import data from "./questions.json";

const CONST = {
    EDIT_TYPES: {
        CREATE: "create",
        EDIT: "edit",
    },
    EDIT_TYPES_MSG: {
        create: '新增',
        edit: '編輯'
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

            collapseIsOpen: true,

            editType: CONST.EDIT_TYPES.CREATE,

            dataForm: {
                "id": 0,
                "question": "",
                "answers": [],
                "correct": 0
            }
        };
    }
};
</script>

<template>
    <section class="section">
        <title-bar>題庫</title-bar>

        <b-collapse aria-id="question-form-collaspe" animation="slide" :open.sync="collapseIsOpen">
            <div slot="trigger" class="panel-heading" role="button" aria-controls="question-form-collaspe">
                <strong>{{ CONST.EDIT_TYPES_MSG[editType] }}題庫</strong>
            </div>

            <div class="panel-block">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                <br />Nulla accumsan, metus ultrices eleifend gravida, nulla nunc varius lectus, nec rutrum justo nibh eu lectus.
                <br />Ut vulputate semper dui. Fusce erat odio, sollicitudin vel erat vel, interdum mattis neque.
            </div>
        </b-collapse>

        <card-component title="題庫列表" icon="table">
            <b-field grouped group-multiline>
                <b-select v-model="perPage" :disabled="!isPaginated">
                    <option v-for="pl in pagelist" :key="pl" :value="pl">{{pl}}筆 / 頁</option>
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