<template>
    <div class="main">
        <Header />
        <MainContent />
        <Footer />
    </div>
</template>

<script>
import { onMounted } from '@vue/composition-api';
import Header from './Header';
import MainContent from './MainContent';
import Footer from './Footer';
// import LogoImg from '@/assets/images/logo.png';

const themeClassList = [
    'has-aside-left',
    'has-aside-mobile-transition',
    'has-navbar-fixed-top'
];

export default {
    name: 'Questionnaire',
    components: {
        Header,
        MainContent,
        Footer
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
}
</style>
