<template>
    <section class="main-content hero is-fullheight-with-navbar">This is content</section>
</template>

<script>
export default {

};
</script>

<style lang="scss" scoped>
.main-content {
    max-height: calc(100vh - 3.25rem);
    overflow: auto;

    background-repeat: no-repeat;
    background-position: center center;
    background-size: cover;
    background-image: url("~@/assets/images/PC-COMPS/index/PC-com-index-bg.png");

    @media screen and (max-width: 414px) {
        background-image: url("~@/assets/images/mobile-COMPS/index/MOBILE-index-bg.png");
    }
}
</style>