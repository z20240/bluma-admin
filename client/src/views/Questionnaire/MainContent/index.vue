<template>
  <section class="main-content hero is-fullheight-with-navbar">
    <div class="pc" v-if="device.device.type === 'desktop'">
      <div class="left">
        <div class="doctor">
          <img src="@/assets/images/PC-com-kv-doctor.png" alt="doctor" />
        </div>
        <div class="right">
          <div class="logo">
            <img src="@/assets/images/PC-com_index_logo.png" alt="logo" />
          </div>
          <div class="goTest">
            <a src>
              <img src="@/assets/images/PC-com-go-button.png" alt="logo" />
            </a>
          </div>
        </div>
      </div>
    </div>
    <div class="mobile" v-if="device.device.type === 'smartphone'">
      <div class="logo">
        <img
          v-if="device.device.type === 'smartphone'"
          src="@/assets/images/MOBILE-index-logo.png"
          alt="logo"
        />
      </div>
      <div class="doctor">
        <img
          v-if="device.device.type === 'smartphone'"
          src="@/assets/images/MOBILE-index-doctor.png"
          alt="doctor"
        />
      </div>

      <div class="goTest">
        <a src>
          <img
            v-if="device.device.type === 'smartphone'"
            src="@/assets/images/MOBILE-com-go-button.png"
            alt="logo"
          />
        </a>
      </div>
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
  justify-content: center;
  align-items: center;
  flex-flow: row nowrap;

  @media screen and (min-width: 769px) {
    height: calc(100vh - 100px);
    overflow: hidden;
  }

  height: 100vh;
  overflow: auto;

  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
  background-image: url("~@/assets/images/PC-com-index-bg.png");
  padding-left: calc(50% - 430px);
  padding-right: calc(50% - 430px);

  @media screen and (min-width: 768px) {
    background-image: url("~@/assets/images/MOBILE-index-bg.png");
  }

  .pc {
    height: 100%;

    .left {
      display: flex;
      flex-flow: row nowrap;
      position: relative;
      width: 100%;
      height: 100%;
    }

    .doctor {
      img {
        height: 100%;
      }
    }

    .right {
      max-width: 500px;
      position: absolute;
      right: 0;
      top: 50px;

      display: flex;
      flex-flow: column nowrap;
    }

    .goTest {
      width: 60%;
      margin: auto;
    }
  }

  .mobile {
    display: flex;
    height: 100%;
    overflow: hidden;
    flex-direction: column;

    .logo {
      z-index: 2;
      position: relative;
      max-width: 750px;
      max-height: 450px;
      min-width: 100%;
      width: 100%;
      height: 100%;
      flex: 0 1 auto;
    }

    .goTest {
      z-index: 2;
      position: absolute;
      bottom: 0;
    }

    .doctor {
      z-index: 1;
      max-width: 700px;
      position: relative;
      bottom: -10px;
      max-width: 562px;
      min-width: 100%;
      -webkit-box-flex: 0;
      -ms-flex: 0 1 auto;
      flex: 0 1 auto;
    }
  }
}
</style>