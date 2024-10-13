<template>
  <div class="col-md-6 col-lg-4" v-if="cards.is_display === '是' && cards['六角審核']">
    <div class="card" @mouseover="hover = true" @mouseleave="hover = false">
      <div class="position-relative" style="height: 312px;background-color: #d9d9d9;">
        <template v-if="cards.thumbnail_small">
          <img
            :src="cards.thumbnail_small"
            class="card-img-top border"
            :alt="cards.title"
            style="height: 312px"
          />
        </template>
        <template v-else>
          <img
            src="https://fakeimg.pl/415x312/?text=Coming Soon"
            class="img-fluid"
          />
        </template>
        <span
          class="badge rounded-pill position-absolute start-3 top-3"
          :class="bgTag"
          >{{ cards.course }}</span
        >
        <transition>
          <div
            v-show="hover"
            class="overlay w-100 position-absolute bottom-0 px-3"
          >
            <div class="overlay-text d-flex justify-content-between text-white">
              <h5 class="fs-6 mb-0">作者：{{ cards.name }}</h5>
              <h5 class="fs-6 mb-0">{{ cards.year }} 年</h5>
            </div>
            <ul class="list-unstyled d-flex overflow-auto scrollBar">
              <li class="mr-1" v-for="(item, id) in cards.tags" :key="id">
                <span class="badge rounded-pill bg-primary">{{ item }}</span>
              </li>
            </ul>
          </div>
        </transition>
      </div>

      <div class="card-body d-flex align-items-center">
        <a
          :href="cards.url"
          target="_blank"
          class="stretched-link mr-auto text-decoration-none"
          ><h2 class="h6 card-title mb-0">{{ cards.title }}</h2></a
        >
        <button
          type="button"
          class="btn p-0 position-relative z-index"
          @click="btnActive"
        >
          <i class="fas fa-angle-down"></i>
          <div
            v-if="active"
            class="
              position-absolute
              right-0
              border
              bg-white
              py-2
              px-3
              rounded
              shadow-sm
              z-index
            "
            style="width: 300px"
          >
            <div class="d-flex justify-content-between">
              <h5 class="fs-6">作者：{{ cards.name }}</h5>
              <h5 class="fs-6">{{ cards.year }} 年</h5>
            </div>
            <ul class="list-unstyled">
              <li v-if="cards.social_github_link" class="text-truncate">
                <a :href="cards.social_github_link" target="_blank">
                  <i class="fab fa-github mr-2"></i>
                  {{ cards.social_github_link }}
                </a>
              </li>
              <li v-if="cards.git_repo" class="text-truncate">
                <a :href="cards.git_repo" target="_blank">
                  <i class="fas fa-link mr-2"></i>
                  {{ cards.git_repo }}
                </a>
              </li>
              <li v-if="cards.social_behance_link" class="text-truncate">
                <a :href="cards.social_behance_link" target="_blank">
                  <i class="fab fa-behance mr-2"></i>
                  {{ cards.social_behance_link }}
                </a>
              </li>
            </ul>
            <p class="text-left mb-0">{{ cards.description }}</p>
          </div>
        </button>
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
  data() {
    return {
      hover: false,
      active: false,
      bgTag: '',
    };
  },
  methods: {
    btnActive() {
      this.active = true;
      document.querySelector('body').addEventListener(
        'click',
        () => {
          this.active = false;
        },
        true,
      );
    },
    bagdeColor() {
      if (this.cards.course_tag === 'Vue') {
        this.bgTag = 'vue';
      } else if (this.cards.course_tag === 'Bootstrap') {
        this.bgTag = 'bootstrap';
      } else if (this.cards.course_tag === 'UI') {
        this.bgTag = 'ui';
      } else if (this.cards.course_tag === 'HTML') {
        this.bgTag = 'html';
      } else if (this.cards.course_tag === 'JS') {
        this.bgTag = 'js';
      } else if (this.cards.course_tag === 'Node') {
        this.bgTag = 'node';
      }
    },
  },
  mounted() {
    this.bagdeColor();
  },
};
</script>

<style lang="scss">
.start-3 {
  right: 16px;
}
.top-3 {
  top: 16px;
}
.bottom-3 {
  bottom: 16px;
}
.card-img-top {
  object-fit: cover;
}
.v-enter-active,.v-leave-active {
  transition: opacity .25s;
}
.v-enter,
.v-leave-to {
  opacity: 0;
}
.v-enter-to,
.v-leave {
  opacity: 1;
}
.overlay {
  background: linear-gradient(
    180deg,
    rgba(0, 0, 0, 0) 0%,
    rgba(0, 0, 0, 0.7) 100%
  );
  background-size: 100%;
  background-position-y: bottom;
  background-repeat: no-repeat;
}
.overlay-text {
  padding-top: 100px;
}
.vue {
  background: #3eaf7c;
}
.bootstrap {
  background: #7952b3;
}
.ui {
  background: #2962ff;
}
.js {
  background: #8E240E;
}
.html {
  background: #005856;
}
.node {
  background: #27866b;
}
.z-index {
  z-index: 4;
}
</style>
