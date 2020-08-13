<template>
    <div class="main">
        <nav class="navbar">
            <!-- <div class="navbar-right">
                <a class="navbar-item" href="https://bulma.io">
                    <img src="@/assets/images/logo.png" width="112" height="100%" />
                </a>
            </div>

            <div class="navbar-left navbar-slogan">
                『防治藥物濫用中心．關心您!』
            </div>-->
        </nav>

        <section class="main-content hero is-fullheight-with-navbar">This is content</section>

        <footer class="footer">
            <div class="content has-text-centered">
                <p>
                    <strong>Bulma</strong> by
                    <a href="https://jgthms.com">Jeremy Thomas</a>. The source code is licensed
                    <a
                        href="http://opensource.org/licenses/mit-license.php"
                    >MIT</a>. The website content
                    is licensed
                    <a
                        href="http://creativecommons.org/licenses/by-nc-sa/4.0/"
                    >CC BY NC SA 4.0</a>.
                </p>
            </div>
        </footer>
    </div>
</template>

<script>
import { onMounted } from '@vue/composition-api';
// import LogoImg from '@/assets/images/logo.png';

const themeClassList = [
    'has-aside-left',
    'has-aside-mobile-transition',
    'has-navbar-fixed-top'
];

export default {
    name: 'Questionnaire',
    components: {
        // LogoImg
    },
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
    .navbar {
        background: url("~@/assets/images/logo.png") no-repeat center center
            fixed;
        background-size: cover;

        position: relative;
        background-color: orange;
        display: flex;
        justify-content: space-between;

        .navbar-right {
            position: relative;
            width: 50%;
            @media screen and (min-width: 414px) {
                width: 40%;
            }

            background-color: white;

            .navbar-item {
                position: relative;
                box-sizing: border-box;
                width: 100%;
                z-index: 1;
                &::after {
                    position: absolute;
                    right: -1px;
                    top: 0;
                    z-index: -1;
                    content: " ";
                    height: 100%;
                    width: 0px;
                    border-color: transparent orange white transparent;
                    border-style: solid solid solid solid;
                    border-width: 0px 52px 52px 0px;
                }
            }
        }

        .navbar-left {
            &.navbar-slogan {
                display: flex;
                justify-content: flex-end;
                align-items: center;

                color: white;
                font-weight: 600;

                font-size: 1rem;
            }
        }
    }

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
