<template>
  <div class="home">
    <h1>Welcome to your Vue + Sanity Blog</h1>
    <div class="posts">
      <div class="loading" v-if="loading">Loading...</div>
      <div v-if="error" class="error">
        {{ error }}
      </div>
      <div class="container">
        <div v-for="post in posts" class="post-item" :key="post._id">
          <router-link :to="`/blog/${post.slug.current}`" class="post-link">
            <h2 style="color: black">{{ post.title }}</h2>
          </router-link>
          <img v-if="post.image" :src="imageUrlFor(post.image).width(480)" />
          <p>{{ post.excerpt }}</p>
          <hr />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import sanity from "../client";
import imageUrlBuilder from "@sanity/image-url";
const imageBuilder = imageUrlBuilder(sanity);
const query = `*[_type == "post"]{
  _id,
  title,
  slug,
  excerpt,
  "image": mainImage.asset->url
}[0...50]`;

export default {
  name: "HomeView",
  data() {
    return {
      loading: true,
      posts: [],
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    imageUrlFor(source) {
      return imageBuilder.image(source);
    },
    fetchData() {
      this.error = this.post = null;
      this.loading = true;
      sanity.fetch(query).then(
        (posts) => {
          this.loading = false;
          this.posts = posts;
        },
        (error) => {
          this.error = error;
        }
      );
    },
  },
};
</script>

<style scoped>
.home h1 {
  text-align: center;
}
.container {
  margin: 0 auto;
  max-width: 42em;
  width: 100%;
}
.post-item {
  box-sizing: border-box;
}
.post-link {
  text-decoration: none;
}
</style>
