<template>
  <div class="main">
    <div class="py-5 bg-secondary">
      <h1 class="container mb-0 text-center text-md-left">六角作品牆</h1>
    </div>
    <div class="container">
      <div class="row">
        <div class="col-12">
          <form>
            <div class="row py-5 justify-content-between">
              <div class="col-12 col-md-6 mb-2 mb-md-0">
                <label for="exampleFormControlSelect1" class="sr-only"
                  >課程分類</label
                >
                <select
                  class="form-control"
                  id="exampleFormControlSelect1"
                  v-model="selectText"
                  @change="selectData"
                >
                  <option disabled value="">請選擇課程分類</option>
                  <option v-for="(item, id) in select" :key="id" :value="item">
                    {{ item }}
                  </option>
                </select>
              </div>

              <div class="col-12 col-md-6">
                <input
                  class="form-control"
                  v-model="searchText"
                  type="search"
                  placeholder="搜尋作品"
                  aria-label="Search"
                />
              </div>
            </div>
          </form>
        </div>

        <Card
          @openModal="openModal"
          :cards="item"
          v-for="item in filter"
          :key="item.id"
        ></Card>
        <!--
      <div class="col-12">
        <Pagination></Pagination>
      </div>
      --></div>
    </div>
    <Modal :work="work" />
  </div>
</template>

<script>
import $ from 'jquery';
import Modal from '@/components/Modal.vue';
import Card from '@/components/Card.vue';
// import Pagination from '@/components/Pagination.vue';

export default {
  name: 'Home',
  components: {
    Card,
    // Pagination,
    Modal,
  },
  data() {
    return {
      searchText: '',
      work: {},
      isSearch: false,
      sourceData: [],
      select: [],
      selectText: '',
      cacheData: [],
    };
  },
  methods: {
    async getData() {
      await this.axios.get(process.env.VUE_APP_PATH).then((res) => {
        this.sourceData = res.data;
        this.cacheData = this.sourceData;
        this.select = this.selectFilter();
      });
    },
    search() {
      this.isSearch = !this.isSearch;
    },
    openModal(item) {
      this.work = item;
      // 雖然可以使用 this.$router.push(`?id=${item.id}`)
      // 但是若第二次點擊是會出現錯誤的，所以使用 location.hash 最保險
      window.location.hash = `?id=${item.id}`;
      $('#vueModal').modal('show');

      $('#vueModal').on('hide.bs.modal', () => {
        window.location.hash = '';
      });
    },
    hashModal(id) {
      this.sourceData.forEach((item) => {
        if (String(item.id) === id) {
          this.work = item;
        }
      });
      $('#vueModal').modal('show');

      $('#vueModal').on('hide.bs.modal', () => {
        window.location.hash = '';
      });
    },
    selectFilter() {
      const cacheArr = this.sourceData.map((item) => item.coures);
      const set = new Set(cacheArr);
      return set;
    },
    selectData() {
      this.cacheData = this.sourceData.filter((item) => item.coures.match(this.selectText));
    },
  },
  computed: {
    filter() {
      const reg = new RegExp(this.searchText, 'i');
      return this.cacheData.filter((item) => item.title.match(reg));
    },
  },
  async created() {
    await this.getData();

    if (this.$route.query.id) {
      this.hashModal(this.$route.query.id);
    }
  },
};
</script>

<style lang="scss" scoped>
.main {
  min-height: calc(100vh - 120px);
}
</style>
