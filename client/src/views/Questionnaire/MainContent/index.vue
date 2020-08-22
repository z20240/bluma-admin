<template>
    <section class="main-content hero is-fullheight-with-navbar">
        <div v-if="device.value.device.type === 'smartphone'"></div>
        <img class="logo" src="@/assets/images/mobile-COMPS/index/MOBILE-index-logo.png" alt="logo" />
        <img class="doctor" src="@/assets/images/mobile-COMPS/index/MOBILE-index-doctor.png" alt="doctor" />
        <a class="gotest">
            <img src="@/assets/images/mobile-COMPS/index/MOBILE-index-gotest-button.png" alt="doctor" />
        </a>
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
        console.log(`setup -> device`, device);
        return {
            device
        };
    }

};
</script>

<style lang="scss" scoped>
.main-content {
    position: relative;
    display: flex;

    max-height: calc(100vh - 3.25rem);
    overflow: auto;

    background-repeat: no-repeat;
    background-position: center center;
    background-size: cover;

    background-image: url('~@/assets/images/PC-COMPS/index/PC-com-index-bg.png');

    @media screen and (max-width: 450px) {
        flex-direction: column;

        background-image: url('~@/assets/images/mobile-COMPS/index/MOBILE-index-bg.png');

        .logo {
            height: 20vh;
        }

        .doctor {
            height: 70vh;
        }

        .gotest {
            position: absolute;
            bottom: 15%;
        }
    }
}
</style>