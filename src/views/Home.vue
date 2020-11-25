<template>
  <div class="main">
    <div class="bg-cover bg-secondary"></div>
    <div class="container">
      <form class="row py-5 justify-content-between">
        <div class="col-md-6 mb-2 mb-md-0">
          <div class="form-floating">
            <select
              class="form-select"
              id="FormControlSelect1"
              v-model="selectText"
              @change="selectData"
            >
              <option value="">全部</option>
              <option v-for="(item, id) in select" :key="id" :value="item">
                {{ item }}
              </option>
            </select>
            <label for="FormControlSelect1"
              >課程分類</label>
          </div>
        </div>

        <div class="col-md-6">
          <div class="form-floating">
            <input
              class="form-control"
              v-model="searchText"
              type="search"
              placeholder="搜尋作品"
              aria-label="Search"
            />
            <label for="searchText">搜尋作品</label>
          </div>
        </div>
      </form>
      <div class="row g-4">
        <Card
          @openModal="openModal"
          :cards="item"
          v-for="item in filter[currentPage]"
          :key="item.id"
        ></Card>
      </div>
      <Pagination class="mt-4"
        :current-page="currentPage"
        :total-page="totalPage"
        @update-page="updatePage">
      </Pagination>
    </div>
    <WorkModal :work="work" ref="modal"/>
  </div>
</template>

<script>
import { Modal } from 'bootstrap';
import WorkModal from '@/components/Modal.vue';
import Card from '@/components/Card.vue';
import Pagination from '@/components/Pagination.vue';

export default {
  name: 'Home',
  components: {
    Card,
    Pagination,
    WorkModal,
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
      modal: {},
      totalPage: 0,
      currentPage: 0,
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
      // window.location.hash = `?id=${item.id}`;
      this.$router.push(`?id=${item.id}`);
      this.modal.show();
    },
    hashModal(id) {
      this.sourceData.forEach((item) => {
        if (String(item.id) === id) {
          this.work = item;
        }
      });
      this.modal.show();
    },
    selectFilter() {
      const cacheArr = this.sourceData.map((item) => item.coures);
      const set = new Set(cacheArr);
      return set;
    },
    selectData() {
      this.cacheData = this.sourceData.filter((item) => item.coures.match(this.selectText));
    },
    updatePage(page) {
      this.currentPage = page;
    },
  },
  computed: {
    filter() {
      const reg = new RegExp(this.searchText, 'i');
      const cacheData = this.cacheData.filter((item) => item.title.match(reg));

      const newData = [];
      // 分頁製作
      cacheData.forEach((item, i) => {
        if (i % 20 === 0) {
          newData.push([]);
        }
        const page = parseInt(i / 20, 10);
        newData[page].push(item);
      });
      return newData;
    },
  },
  watch: {
    filter() {
      this.totalPage = this.filter.length; // 分頁數量
      this.currentPage = 0;
    },
  },
  async created() {
    await this.getData();

    if (this.$route.query.id) {
      this.hashModal(this.$route.query.id);
    }
  },
  mounted() {
    if (this.$refs.modal) {
      const modalDom = this.$refs.modal.$refs.vueModal;
      this.modal = new Modal(modalDom);

      modalDom.addEventListener('hidden.bs.modal', () => {
        this.$router.push('/');
      });
    }
  },
};
</script>

<style lang="scss" scoped>
.main {
  min-height: calc(100vh - 120px);
}
.bg-cover {
  min-height: 200px;
  background-image: url("../assets/images/banner1920.png");
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
}
@media (max-width: 767px) {
  .bg-cover {
    background-image: url("../assets/images/banner1200.png");
  }
}
</style>
