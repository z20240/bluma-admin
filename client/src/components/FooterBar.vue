<template>
    <footer v-show="isFooterBarVisible" class="footer">
        <div class="container-fluid">
            <div class="level">
                <div class="level-left">
                    <div class="level-item">
                        <div>
                            這是頁腳
                            <b>{{ year }}, JustBoil.me</b> &mdash; Admin Two Demo
                            <span class="tag">v1.1.7</span>
                        </div>
                    </div>
                </div>
                <div class="level-right">
                    <div class="level-item">
                        <div class="logo">
                            <a href="https://justboil.me">
                                <img src="../assets/justboil-logo.svg" alt="JustBoil.me" />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </footer>
</template>

<script>
import moment from "moment";
import { mapGetters } from "vuex";

export default {
    name: "FooterBar",
    computed: {
        year() {
            return moment().year();
        },
        ...mapGetters("app", ["isFooterBarVisible"])
    }
};
</script>
