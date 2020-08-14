<template>
    <div class="main">
        <nav class="navbar">
            <div class="navbar-brand">
                <img class="navbar-item" src="@/assets/images/logo.png" width="300" />
            </div>

            <div class="navbar-menu">
                <div class="navbar-end">
                    <span class="navbar-item">『防治藥物濫用中心．關心您!』</span>
                </div>
            </div>
        </nav>

        <section class="main-content hero is-fullheight-with-navbar">This is content</section>

        <footer class="footer">
            <div class="content has-text-centered">
                <p>指導單位 | 教育部學生事務教育司．承辦單位 | 中正大學犯罪研究中心．反毒專線 | 0800-770885(請請您，幫幫我)</p>
                <hr class="footer-hr" />
                <p>Copyright © 2020防治藥物濫用教育中心NCC all righrs teserved.</p>

                <!-- <strong>Bulma</strong> by
                    <a href="https://jgthms.com">Jeremy Thomas</a>. The source code is licensed
                    <a
                        href="http://opensource.org/licenses/mit-license.php"
                    >MIT</a>. The website content
                    is licensed
                    <a
                        href="http://creativecommons.org/licenses/by-nc-sa/4.0/"
                    >CC BY NC SA 4.0</a>.
                </p>-->
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
        position: relative;
        background-color: orange;
        padding-right: 0;
        height: 3.25rem;

        .navbar-brand {
            position: relative;
            background-color: white;

            @media screen and (min-width: 1024px) {
                // width: 50%;
                &::after {
                    position: absolute;
                    right: -3.25rem;
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

            @media screen and (max-width: 1023px) {
                display: flex;
                justify-content: center;
                background-color: orange;
            }
        }

        .navbar-menu {
            .navbar-end {
                .navbar-item {
                    color: white;
                    font-weight: 700;
                }
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

        .content {
            p {
                margin: 0;
            }
            .footer-hr {
                margin: 0;
            }
        }
    }
}
</style>
