<template>
<div class="col-md-4" v-if="cards.is_display === '是'">

  <div class="card" @click="emitCard(cards)"
    :style="{ backgroundImage: `url(${cards.img_url})` }">
    <div class="card-body d-flex justify-content-between align-items-end">
      <h2 class="h6 card-title mb-0 text-white">{{ cards.title }}</h2>
      <a :href="cards.url" class="card-link text-white" target="_blank">
        作品連結
        <i class="fas fa-external-link-alt"></i>
      </a>
    </div>
  </div>

</div>
</template>

<script>
export default {
  name: 'Card',
  props: {
    cards: Object,
  },
  methods: {
    emitCard(item) {
      this.$emit('openModal', item);
    },
  },
};
</script>

<style lang="scss">
.card {
  overflow: hidden;
  cursor: pointer;
  background-size: cover;
  background-position: center center;
  height: 250px;
  transition: box-shadow .35s;
  &:hover {
    box-shadow: 0px 3px 15px #00000045;
  }
}
.card-body {
  background-image: linear-gradient(360deg, rgba(0, 0, 0, .6) 60%, transparent);
  background-size: 100% 60px;
  background-position-y: bottom;
  background-repeat: no-repeat;
}
</style>
