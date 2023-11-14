<template>
  <div class="main">
    <div class="container">
      <nav class="my-4">
        <ul class="nav nav-pills justify-content-start justify-content-md-center flex-nowrap overflow-auto scrollBar">
          <li v-for="(item, id) in navigatorList" :key="id" class="nav-item ">
            <a href="#" class="nav-link fs-5" :class="{ 'active': item.active }" @click.prevent="tagClicked(item)">
              {{ item.name }}
            </a>
          </li>
        </ul>
      </nav>
      <div class="my-6">
        <h3 class="h4 text-center mb-3">{{ courseName }}</h3>
        <p class="text-center fw-normal mb-4">
          {{ courseDescription }}
        </p>
      </div>

      <form class="row justify-content-center align-items-center mb-6">
        <div class="col-md-4 mb-2 mb-md-0">
          <input class="form-control rounded-pill" v-model="searchText" type="search" placeholder="搜尋此標籤下的作品"
            aria-label="Search" />
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
        <Card :cards="item" v-for="item in filter[currentPage]" :key="item.id" />
      </div>

      <div class="d-flex justify-content-center" v-if="pageState">
        <paginate :page-count="totalPage" :click-handler="updatePage" :prev-text="'&laquo;'" :next-text="'&raquo;'"
          :container-class="'pagination'" :page-class="'page-item'" :page-link-class="'page-link'"
          :prev-link-class="'page-link'" :next-link-class="'page-link'">
        </paginate>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable global-require */
import Card from '@/components/Card.vue';

export default {
  name: 'Home',
  components: {
    Card,
  },
  data() {
    return {
      navigatorList: [
        {
          id: 0,
          name: '全部',
          course_tag: 'All',
          // bg: require('@/assets/images/all.png'),
          description:
            '六角學員作品牆，學員們依據自己的創意完成一屬於個人獨一無二的作品。',
          active: false,
        },
        {
          id: 1,
          name: 'Vue',
          course_tag: 'Vue',
          // bg: require('../assets/images/vue.png'),
          description:
            '最受歡迎的前端框架，六角學員們透過此框架完成屬於個人的獨一無二作品。',
          active: false,
        },
        {
          id: 2,
          name: '切版直播班',
          course_tag: 'HTML',
          // bg: require('../assets/images/html.png'),
          description: '用三個月的時間將切版技能練到巔峰！',
          active: false,
        },
        {
          id: 3,
          name: 'Node',
          course_tag: 'Node',
          // bg: require('../assets/images/ui.png'),
          description: '團隊共同完成的 Node.js 專案。',
          active: false,
        },
        {
          id: 4,
          name: 'JS',
          course_tag: 'JS',
          // bg: require('../assets/images/js.png'),
          description: '從基礎到 AJAX，體驗前端工程師的第一課！',
          active: false,
        },
        {
          id: 5,
          name: 'Bootstrap',
          course_tag: 'Bootstrap',
          // bg: require('../assets/images/bootstrap.png'),
          description:
            '使用 Bootstrap 快速完成切版版型，從設計稿到可觀賞網頁的不二選擇！',
          active: false,
        },
        {
          id: 6,
          name: 'UI',
          course_tag: 'UI',
          // bg: require('../assets/images/ui.png'),
          description: '好的設計讓網站品質大加分！',
          active: false,
        },
      ],
      pageState: true,
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
    tagClicked(item) {
      this.navigatorList.forEach((list) => {
        if (list.id === item.id) {
          // eslint-disable-next-line no-param-reassign, no-return-assign
          return list.active = true;
        }
        // eslint-disable-next-line no-param-reassign
        list.active = false;
      });

      if (item?.name) {
        // 透過點擊上方分類進來
        if (item?.name === '全部') {
          this.categoryText = '';
        } else if (item?.name === '切版直播班') {
          this.categoryText = 'HTML';
        } else {
          this.categoryText = item?.name;
        }
        this.courseName = item?.name;
        this.courseDescription = item?.description;
      } else {
        // 透過網址分類進來
        this.categoryText = this.$route.query.tag;
        this.navigatorList.forEach((navigator) => {
          if (!this.categoryText) {
            this.courseName = '全部';
            this.courseDescription = '六角學員作品牆，學員們依據自己的創意完成一屬於個人獨一無二的作品。';
          } else if (navigator.course_tag === this.categoryText) {
            this.courseName = navigator.name;
            this.courseDescription = navigator.description;
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
      // this.courseList.forEach((item) => {
      //   if (this.categoryText === item.course_tag) {
      //     this.cacheData.splice(3, 0, item);
      //   }
      // });
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
      this.pageState = false;
      this.totalPage = this.filter.length; // 分頁數量
      this.currentPage = 0;
      setTimeout(() => {
        this.pageState = true;
      }, 0);
    },
    categoryText() {
      this.tagsSelect = this.selectFilter();

      if (this.$route.query?.tag === this.categoryText) return;
      this.$router.push({
        query: {
          tag: this.categoryText,
        },
      });
    },
  },
  async created() {
    if (this.$route.query?.tag) {
      const index = this.navigatorList.findIndex((item) => item.course_tag === this.$route.query?.tag);
      this.tagClicked(this.navigatorList[index]);
    } else {
      this.tagClicked(this.navigatorList[0]);
    }
    await this.getData();
  },
};
</script>

<style lang="scss" scoped>
.main {
  min-height: calc(100vh - 120px);
}

.nav-link {
  font-weight: 500;
  padding-left: 40px;
  padding-right: 40px;
  white-space:nowrap;
}

.nav-link.active {
  background-color: #E7E7E7;
  color: #005856;
  font-weight: 700;
}
.nav-pills .nav-link{
  border-radius: 24px;
}
</style>
