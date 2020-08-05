<template>
    <div class="main">
        <nav class="navbar">
            <div class="navbar-brand">
                <a class="navbar-item" href="https://bulma.io">
                    <img src="https://bulma.io/images/bulma-logo.png" width="112" height="28">
                </a>

                <a role="button" class="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                </a>
            </div>
        </nav>

        <section class="main-content hero is-fullheight-with-navbar">
            This is content
        </section>

        <footer class="footer">
            <div class="content has-text-centered">
                <p>
                    <strong>Bulma</strong> by <a href="https://jgthms.com">Jeremy Thomas</a>. The source code is licensed
                    <a href="http://opensource.org/licenses/mit-license.php">MIT</a>. The website content
                    is licensed <a href="http://creativecommons.org/licenses/by-nc-sa/4.0/">CC BY NC SA 4.0</a>.
                </p>
            </div>
        </footer>

    </div>
</template>

<script>
import { onMounted } from '@vue/composition-api';

const themeClassList = [
    'has-aside-left',
    'has-aside-mobile-transition',
    'has-navbar-fixed-top'
];

export default {
    name: 'Questionnaire',
    setup() {
        onMounted(() => {
            document.documentElement.classList.remove(...themeClassList);
        });

        return {};
    }
};
</script>

<style lang="scss" scoped>
.main {
    .main-content {
        max-height: calc(100vh - 3.25rem);
        overflow: auto;
    }

    footer {
        position: fixed;
        bottom: 0;
        width: 100%;
    }
}
</style>
