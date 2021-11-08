<template>
  <nav class="pagination mb-6" aria-label="Page navigation example">
    <ul class="pagination mx-auto">
      <li class="page-item" :class="{ disabled: currentPage === 0 }">
        <a class="page-link" href="#" aria-label="Previous"
          @click.prevent="updatePage(currentPage - 1)">
          <span aria-hidden="true">&laquo;</span>
        </a>
      </li>
      <li class="page-item" :class="{active: i - 1 === currentPage }"
        v-for="i in totalPage" :key="i">
        <a class="page-link" href="#"
          @click.prevent="updatePage(i - 1)">{{ i }}</a>
      </li>
      <li class="page-item" :class="{ disabled: currentPage+1 === totalPage }">
        <a class="page-link" href="#" aria-label="Next"
          @click.prevent="updatePage(currentPage + 1)">
          <span aria-hidden="true">&raquo;</span>
        </a>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: 'Pagination',
  props: {
    totalPage: {
      type: Number,
      default: 0,
    },
    currentPage: {
      type: Number,
      default: 0,
    },
  },
  methods: {
    updatePage(page) {
      this.$emit('update-page', page);
    },
  },
};
</script>

<style>
</style>
