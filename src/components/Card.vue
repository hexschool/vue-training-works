<template>
<div class="col-md-4" v-if="cards.is_display === '是'">

  <div class="card mb-5" @click="emitCard(cards)">
    <img class="card-img-top" :src="cards.img_url" :alt="cards.title" />
    <div class="card-body border-top d-flex justify-content-between align-items-end">
      <h2 href="#" class="h6 card-title mb-0">{{ cards.title }}</h2>
      <a :href="cards.url" class="card-link" target="_blank">
        作品連結
        <img src="./../assets/images/link.svg" />
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
  box-shadow: 0px 3px 6px #00000029;
  overflow: hidden;
  cursor: pointer;

  &:hover .card-img-top {
    transform: scale(1.1, 1.1);
  }

  &-img-top {
    transform: scale(1, 1);
    transition: all 0.5s ease-out;
    height: 180px;
    object-fit: cover;
  }
}

.card-img-top {
  transform: scale(1, 1);
  transition: all 1s ease-out;
}
</style>
