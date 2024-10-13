<template>
  <div class="layout">
    <header class="container py-3 mb-3">
      <router-link to="/">
        <img src="./../assets/images/logo-hexschool.svg" alt="hexschool-logo" />
      </router-link>
    </header>
    <router-view></router-view>
    <footer
      class="bg-light pt-3 pb-3 mt-5"
      :class="{ 'pb-6': deadline.countStatus }"
    >
      <div
        class="
          container
          d-flex
          flex-column flex-md-row
          justify-content-md-between
        "
      >
        <small class="mb-0 font-weight-normal">
          <a href="mailto:service@hexschool.com">聯絡我們</a>
        </small>
        <small class="mb-0 font-weight-normal">
          Copyright © 2023 HexSchool.All rights reserved.
        </small>
      </div>
    </footer>
    <nav
      class="
        navbar-fixed-bottom
        text-center text-white
        fixed-bottom
        bg-danger
        py-2
      "
      v-if="deadline.countStatus"
    >
      <div class="container">
        <div
          class="
            d-flex
            align-items-center
            justify-content-md-center justify-content-between
            w-100
          "
        >
          <div
            class="
              d-flex
              flex-md-row flex-column
              text-white
              justify-content-md-end
              pr-md-3 pr-0
            "
          >
            <span class="mr-md-5 font-weight-bold text-left"
              >最後報名機會 已破 330 人報名<br class="d-md-none d-block" />｜2024 切版直播班</span
            >

            <div class="d-flex justify-content-start text-white text-nowrap">
              <span class="font-weight-bold"
                >{{ deadline.days }} 天 {{ deadline.hours }} 時
                {{ deadline.minutes }} 分 {{ deadline.seconds }} 秒</span
              >
            </div>
          </div>
          <div
            class="
              d-flex
              justify-content-md-start justify-content-end
              pl-md-3 pl-0
            "
          >
            <a
              href="https://www.hexschool.com/courses/web-layout-training-1st.html"
              target="_blank"
              class="btn btn-dark btn-sm rounded-0"
            >
            晚鳥 66 折
              <i class="fa fa-arrow-right" aria-hidden="true"></i>
            </a>
          </div>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  name: 'Layout',
  data() {
    return {
      deadline: {
        countStatus: false,
        seconds: 0,
        minutes: 0,
        hours: 0,
        days: 0,
      },
    };
  },
  methods: {
    countDown() {
      const countDownDate = new Date('Jun 30 2024 23:59:59').getTime();

      setInterval((x) => {
        const now = new Date().getTime();
        const distance = countDownDate - now;

        this.deadline.days = Math.floor(distance / (1000 * 60 * 60 * 24));
        this.deadline.hours = Math.floor(
          (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
        );
        this.deadline.minutes = Math.floor(
          (distance % (1000 * 60 * 60)) / (1000 * 60),
        );
        this.deadline.seconds = Math.floor((distance % (1000 * 60)) / 1000);
        if (distance < 0) {
          clearInterval(x);
          this.deadline.countStatus = false;
        } else {
          this.deadline.countStatus = true;
        }
      }, 1000);
    },
  },
  mounted() {
    this.countDown();
  },
};
</script>

<style>
</style>
