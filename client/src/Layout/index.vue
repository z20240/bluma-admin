<template>
    <section>
        <nav-bar />
        <aside-menu />
        <router-view />
        <footer-bar />
    </section>
</template>

<script>
import '@/scss/main.scss';
import NavBar from '@/components/NavBar';
import AsideMenu from '@/components/AsideMenu';
import FooterBar from '@/components/FooterBar';
export default {
    name: 'Layout',
    components: {
        NavBar,
        AsideMenu,
        FooterBar
    }
};
</script>
