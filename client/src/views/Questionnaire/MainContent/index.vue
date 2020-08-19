<template>
    <section class="main-content hero is-fullheight-with-navbar">
        {{ device }}
        <div class="logo">
            <img src="@/assets/images/mobile-COMPS/index/MOBILE-index-logo.png" alt />
        </div>
        <div class="doctor">
            <img src="@/assets/images/mobile-COMPS/index/MOBILE-index-doctor.png" alt="doctor" />
        </div>
    </section>
</template>

<script>
import DeviceDetector from "device-detector-js";
import { computed } from '@vue/composition-api';
export default {
    name: 'MainContent',
    setup() {

        const deviceDetector = new DeviceDetector();
        const device = computed(() => deviceDetector.parse(navigator.userAgent));
        return {
            device
        };
    }

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