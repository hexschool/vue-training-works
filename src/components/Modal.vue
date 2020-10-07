<template>
<div class="modal fade bd-example-modal-lg" id="vueModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-lg">
    <div class="modal-content">
      <div class="modal-body">
        <div class="container">
          <div class="row flex-column-reverse flex-md-row">
            <div class="col-12 col-md-4">
              <h2 class="mr-2 mb-0">{{ work.title }}</h2>
              <span class="badge badge-pill badge-dark mb-4">{{ work.coures }}</span>
              <blockquote>
                <p class="modal-text">{{ work.description }}</p>
                <footer class="blockquote-footer text-right"><cite :title="work.name">{{ work.name }}</cite></footer>
              </blockquote>
              <a :href="work.url">
                作品連結
                <img src="./../assets/images/link.svg" />
              </a>
              <div class="d-flex align-items-center mt-2 mb-0">
                <a v-if="work.social_fb_link" :href="work.social_fb_link">
                  <img class="mr-2" src="../assets/images/fb.svg" alt="fb" />
                </a>
                <a v-if="work.social_github_link" :href="work.social_github_link">
                  <img src="../assets/images/ig.svg" alt="ig" />
                </a>
              </div>
            </div>
            <div class="col-12 col-md-8">
              <img class="img-fluid" :src="work.img_url" alt="ig" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: 'Modal',
  props: ['work'],
};
</script>

<style>
.modal-text {
  max-height: 260px;
  overflow: auto;
}
</style>
