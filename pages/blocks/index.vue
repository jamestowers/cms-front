<template>
  <div class="about-block flex-center flex-column p4">
    <div class="badge round bg-grey8 text-light p3 m3 border">
      <i class="icon-basic-hammer huge"></i>
    </div>
    <h1 class="page-title">Content blocks</h1>
    <p>Content block are a powerful way to add various types of content to your pages</p>
    <p></p>
    <nuxt-link :to="{ name: 'blocks-block', params: { block: 'create' } }" class="m2 btn-sm text-white" role="button">Add a new block type</nuxt-link>
  </div>
</template>

<script>
export default {
  //
}
</script>
