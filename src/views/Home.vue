<template>
  <div class="main">
    <div class="container">
      <nav class="mb-4">
        <ul
          class="
            nav
            row
            .justify-content-start
            justify-content-md-center
            align-items-center
            flex-nowrap
            overflow-auto
            scrollBar
          "
        >
          <li
            v-for="(item, id) in navigatorList"
            :key="id"
            class="nav-item col-2"
            @click="tagClicked(item.name, item.description)"
          >
            <div class="card bg-dark text-white">
              <img :src="item.bg" class="card-img" :alt="item.name" />
              <div
                class="
                  card-img-overlay
                  d-flex
                  justify-content-center
                  align-items-center
                "
                :class="item.course_tag"
              >
                <h5 class="card-title text-center mb-0">{{ item.name }}</h5>
              </div>
            </div>
          </li>
        </ul>
      </nav>
      <h3 class="text-center">{{ courseName }}</h3>
      <p class="text-center mb-4">
        {{ courseDescription }}
      </p>

      <form class="row justify-content-center align-items-center mb-6">
        <div class="col-md-4 mb-2 mb-md-0">
          <input
            class="form-control rounded-pill"
            v-model="searchText"
            type="search"
            placeholder="搜尋此標籤下的作品"
            aria-label="Search"
          />
        </div>
        <div class="col-md-2 mb-2 mb-md-0">
          <select class="form-select rounded-pill" v-model="tagSelectText">
            <option disabled selected>選擇此標籤課程</option>
            <option value="">全部</option>
            <option v-for="(item, id) in tagsSelect" :key="id" :value="item">
              {{ item }}
            </option>
          </select>
        </div>
      </form>

      <div class="row g-4">
        <Card
          :cards="item"
          v-for="item in filter[currentPage]"
          :key="item.id"
        />
      </div>

      <!-- <Pagination
        class="mt-4"
        :current-page="currentPage"
        :total-page="totalPage"
        @update-page="updatePage"
      /> -->
      <div class="d-flex justify-content-center">
        <paginate
          :page-count="totalPage"
          :click-handler="updatePage"
          :prev-text="'&laquo;'"
          :next-text="'&raquo;'"
          :container-class="'pagination'" :page-class="'page-item'"
          :page-link-class="'page-link'"
          :prev-link-class="'page-link'"
          :next-link-class="'page-link'">
        </paginate>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable global-require */
import Card from '@/components/Card.vue';
// import Pagination from '@/components/Pagination.vue';

export default {
  name: 'Home',
  components: {
    Card,
    // Pagination,
  },
  data() {
    return {
      navigatorList: [
        {
          name: '全部',
          course_tag: 'All',
          bg: require('@/assets/images/all.png'),
          description:
            '六角學員作品牆，學員們依據自己的創意完成一屬於個人獨一無二的作品。',
        },
        {
          name: 'Vue',
          course_tag: 'Vue',
          bg: require('../assets/images/vue.png'),
          description:
            '最受歡迎的前端框架，六角學員們透過此框架完成屬於個人的獨一無二作品。',
        },
        {
          name: 'Bootstrap',
          course_tag: 'Bootstrap',
          bg: require('../assets/images/bootstrap.png'),
          description:
            '使用 Bootstrap 快速完成切版版型，從設計稿到可觀賞網頁的不二選擇！',
        },
        {
          name: 'UI',
          course_tag: 'UI',
          bg: require('../assets/images/ui.png'),
          description: '好的設計讓網站品質大加分！',
        },
      ],
      courseName: '',
      courseDescription: '',
      searchText: '', // 搜尋文字
      tagSelectText: '', // 標籤下拉文字
      tagsSelect: [], // 標籤下拉
      sourceData: [], // res 的資料
      cacheData: [],
      categoryText: '', // 分類文字
      totalPage: 0,
      currentPage: 0,
      courseList: [
        {
          title: 'Vue 作品實戰班 - 2022 即將開班',
          name: '六角學院',
          course_tag: 'Vue',
          course: '課程介紹',
          description:
            '看了學長姐作品，是否也想做一個呢？ 點擊觀看完整課程資訊',
          thumbnail_small: require('@/assets/images/vue_course.png'),
          thumbnail: require('@/assets/images/vue_course.png'),
          url: 'https://www.hexschool.com/courses/vue-training.html',
          year: '2021',
          is_display: '是',
        },
        {
          title: 'Bootstrap 5 網頁切版整合術',
          name: '六角學院',
          course_tag: 'Bootstrap',
          course: '課程介紹',
          description:
            '看了學長姐作品，是否也想做一個呢？ 點擊觀看完整課程資訊',
          thumbnail_small: require('@/assets/images/bootstrap_course.png'),
          thumbnail: require('@/assets/images/bootstrap_course.png'),
          url: 'https://www.hexschool.com/courses/bootstrap5.html',
          year: '2021',
          is_display: '是',
        },
        {
          title: 'UI 設計入門 - 2021 即將開班',
          name: '六角學院',
          course_tag: 'UI',
          course: '課程介紹',
          description:
            '看了學長姐作品，是否也想做一個呢？ 點擊觀看完整課程資訊',
          thumbnail_small: require('@/assets/images/ui_course.png'),
          thumbnail: require('@/assets/images/ui_course.png'),
          url: 'https://www.hexschool.com/courses/ui-training.html',
          year: '2021',
          is_display: '是',
        },
      ],
    };
  },
  methods: {
    async getData() {
      const res = await this.axios.get(process.env.VUE_APP_PATH);
      this.sourceData = res.data;
      this.cacheData = this.sourceData;

      this.categoryData();
    },
    tagClicked(name, description) {
      if (name) {
        // 透過點擊上方分類進來
        if (name === '全部') {
          this.categoryText = '';
          this.$router.push('/');
        } else {
          this.categoryText = name;
          this.$router.push(`/?tag=${name}`);
        }
        this.courseName = name;
        this.courseDescription = description;
      } else {
        // 透過網址分類進來
        this.categoryText = this.$route.query.tag;
        this.navigatorList.forEach((item) => {
          if (!this.categoryText) {
            this.courseName = '全部';
            this.courseDescription = '六角學員作品牆，學員們依據自己的創意完成一屬於個人獨一無二的作品。';
          } else if (item.course_tag === this.categoryText) {
            this.courseName = item.name;
            this.courseDescription = item.description;
          }
        });
      }

      this.tagSelectText = ''; // 切換時課程改為預設全部

      this.categoryData();
    },
    categoryData() {
      // 根據 course_tag 篩選 Card
      this.cacheData = this.sourceData.filter((item) => item.course_tag.match(this.categoryText));

      // 放入課程卡片
      this.courseList.forEach((item) => {
        if (this.categoryText === item.course_tag) {
          this.cacheData.splice(3, 0, item);
        }
      });
    },
    selectFilter() {
      // 篩出下拉選單的項目
      const cacheArr = this.sourceData
        .filter((item) => item.course_tag === this.categoryText)
        .map((item) => item.course);
      const set = [...new Set(cacheArr)];
      return set;
    },
    updatePage(page) {
      this.currentPage = page - 1;
    },
  },
  computed: {
    filter() {
      let cacheData = [];
      if (!this.searchText && !this.tagSelectText) {
        cacheData = this.cacheData;
      }
      const reg = new RegExp(this.searchText, 'i');

      if (this.searchText) {
        cacheData = this.cacheData.filter((item) => item.title.match(reg));
      }

      if (this.tagSelectText) {
        cacheData = this.cacheData.filter((item) => item.course.match(this.tagSelectText));
      }

      if (this.tagSelectText && this.searchText) {
        cacheData = this.cacheData
          .filter((item) => item.title.match(reg))
          .filter((item) => item.course.match(this.tagSelectText));
      }

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
    categoryText() {
      this.tagsSelect = this.selectFilter();
    },
    $route() {
      this.tagClicked();
    },
  },
  async created() {
    this.tagClicked();
    await this.getData();
  },
};
</script>

<style lang="scss" scoped>
.main {
  min-height: calc(100vh - 120px);
}
.banner {
  min-height: 200px;
  background-image: url("../assets/images/banner1920.png");
}
@media (max-width: 767px) {
  .banner {
    background-image: url("../assets/images/banner1200.png");
  }
}
.nav-item {
  cursor: pointer;
  min-width: 150px;
}
.card-img {
  position: relative;
  opacity: 0.8;
  min-height: 65px;
}
.All:hover {
  background: #000000;
}
.Vue:hover {
  background: #3eaf7c;
}
.Bootstrap:hover {
  background: #7952b3;
}
.UI:hover {
  background: #2962ff;
}
</style>
