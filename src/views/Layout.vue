<template>
<div class="layout">
  <header class="py-3 pl-4">
    <a href="logo">
      <img src="./../assets/images/logo-hexschool.svg" alt="hexschool-logo" />
    </a>
  </header>
  <router-view></router-view>
  <footer class="bg-light py-3">
    <div class="container d-flex flex-column flex-md-row justify-content-md-between">
      <small class="mb-0 font-weight-normal">
        <a href="mailto:service@hexschool.com">聯絡我們</a>
      </small>
      <small class="mb-0 font-weight-normal">
        Copyright © 2020 HexSchool.All rights reserved.
      </small>
    </div>
  </footer>
</div>
</template>

<script>
export default {
  name: 'Layout',
};
</script>

<style>
</style>
