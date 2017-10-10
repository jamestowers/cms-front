<template>
  <div class="clearfix">
    <div class="p3">
      <page-title>Transactions</page-title>

      <div class="container transactions-list table">
        <div class="group p1 th border-bottom">
          <div class="td sm-col-12 md-col-5 lg-col-5">Item</div>
          <div class="td sm-col-12 md-col-1 lg-col-1">Amount</div>
          <div class="td sm-col-12 md-col-2 lg-col-2">Status</div>
          <div class="td sm-col-12 md-col-2 lg-col-2">Date</div>
          <div class="td sm-col-12 md-col-2 lg-col-2">Customer</div>
        </div>
        <ul v-if="transactions.length > 0" class="m0">
          <li v-for="transaction in transactions" :key="transaction.id" class="group tr p1 transaction" :class="transaction.status">
            <div class="td sm-col-12 md-col-5 lg-col-5">
              <i v-if="transaction.status === 'pending'" class="icon-basic-clessidre" title="private event" aria-hidden></i>
              <nuxt-link :to="{ name: 'transactions-id', params: { id: transaction.id }}">{{ transaction.description }}</nuxt-link>
            </div>
            <div class="td sm-col-12 md-col-1 lg-col-1">{{ transaction.amount_human }}</div>
            <div class="td sm-col-12 md-col-2 lg-col-2">{{ transaction.status }}</div>
            <div class="td sm-col-12 md-col-2 lg-col-2">{{ transaction.date }}</div>
            <div class="td sm-col-12 md-col-2 lg-col-2">{{ transaction.customer.name }}</div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import PageTitle from '~/components/PageTitle.vue'

export default {
  async asyncData ({ params, app }) {
    const transactions = await app.$axios.$get('/transactions')
    return { transactions: transactions.data }
  },
  data () {
    return {
      //
    }
  },
  components: { PageTitle }
}
</script>

<style lang="scss" scoped>
  @import "~assets/scss/global/variables";

  .transaction{
    &.pending{
      background-color: lighten($color-message, 10);
    }
    &.failed{
      background-color: lighten($color-danger, 20);
    }
  }
</style>
