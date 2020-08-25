<template>
    <div class="main">
        <Header />
        <MainContent />
        <Footer />
    </div>
</template>

<script>
import { onMounted } from '@vue/composition-api';
import Header from '../Header';
import MainContent from './MainContent/index';
import Footer from '../Footer';

// import LogoImg from '@/assets/images/logo.png';

const themeClassList = [
    'has-aside-left',
    'has-aside-mobile-transition',
    'has-navbar-fixed-top'
];

export default {
    name: 'Exam',
    components: {
        Header,
        MainContent,
        Footer
    },
    data() {

    },
    setup() {
        onMounted(async () => {
            document.documentElement.classList.remove(...themeClassList);
        });

        return {};
    }
};
</script>

<style lang="scss" scoped>
html {
    @media screen and (max-width: 769px) {
        overflow-y: hidden;
    }
}
.main {
    width: 100%;
    min-height: 100vh;
    overflow: hidden;
    position: relative;
    box-sizing: border-box;
}
</style>
