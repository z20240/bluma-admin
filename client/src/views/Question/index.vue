
<script language="javascript">
import CardComponent from "@/components/CardComponent";
import TitleBar from "@/components/TitleBar";

import data from "./questions.json";

export default {
    name: "Question",
    components: { TitleBar, CardComponent },
    data() {
        return {
            data,
            isPaginated: true,
            isPaginationSimple: true,
            isLoading: false,
            showDetailIcon: true,
            paginationPosition: "bottom",
            defaultSortDirection: "asc",
            sortIcon: "arrow-up",
            currentPage: 1,
            perPage: 20
        };
    }
};
</script>

<template>
    <section class="section">
        <title-bar>題庫</title-bar>

        <card-component title="Questions" icon="table">
            <b-field grouped group-multiline>
                <b-select v-model="perPage" :disabled="!isPaginated">
                    <option :value="10">10筆 / 頁</option>
                    <option :value="20">20筆 / 頁</option>
                    <option :value="50">50筆 / 頁</option>
                    <option :value="90">90筆 / 頁</option>
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