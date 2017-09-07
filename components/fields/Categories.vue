<template>
  <div class="category-select">
    <ul class="category-list">
      <li v-for="cat in categories" :key="cat.id" class="checkbox checkbox-small">
        <input 
          type="checkbox" 
          v-model="selected" 
          :value="cat.id" 
          :id="`categories_${cat.id}`"
           />
        <div></div>
        <label :for="`categories_${cat.id}`">{{ cat.title }}</label>
      </li>
    </ul>

    <div class="category-add">
      <input type="text" v-model="newCategory.title" placeholder="New category name" class="small">
      <multiselect
        @select="updateNewCategoryParent"
        :options="categories"
        label="title"
        placeholder="Parent category"
        select-label="Click to select"
        deselect-label="Click to deselect">
      </multiselect>
      <button @click.prevent="submitNewCategory" class="btn-sm mt1">Add</button>
    </div>

  </div>
</template>

<script>
  import Multiselect from 'vue-multiselect'

  export default {
    props: ['default'],

    data () {
      return {
        selected: this.default,
        newCategory: null
      }
    },

    watch: {
      selected (val) {
        this.$emit('updated', this.selected)
      }
    },

    computed: {
      categories () { return this.$store.state.categories.items }
    },

    created () {
      this.resetNewCategory()
    },

    methods: {
      resetNewCategory () {
        this.newCategory = {
          title: null,
          slug: null,
          parent_id: null
        }
      },
      updateNewCategoryParent (data) {
        this.newCategory.parent_id = data.id
      },
      submitNewCategory () {
        const vm = this
        this.axios.post('/admin/categories', this.newCategory)
          .then(function (response) {
            vm.$store.commit('categories/add', response.data.entity)
            this.resetNewCategory()
          })
          .catch(function (error) {
            console.log(error)
          })
      }
    },

    components: {
      Multiselect
    }
  }
</script>