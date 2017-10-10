<template>
  <div class="status-bar alert message fixed" ref="status-bar">
    {{ status }}
    
    <a @click.prevent="clearStatus" href="#" class="close pull-right" role="button">
      <svg class="progress" width="24" height="24" viewBox="0 0 24 24">
        <circle class="progress__meter" cx="12" cy="12" r="11" stroke-width="2" />
        <circle class="progress__value" cx="12" cy="12" r="11" stroke-width="2" />
      </svg>
    </a>
  </div>
</template>

<script>
  export default {
    computed: {
      status () { return this.$store.state.status.message }
    },

    watch: {
      status (msg) {
        if (msg) {
          this.$refs['status-bar'].classList.add('on')
          setTimeout(() => this.$refs['status-bar'].classList.remove('on'), 10000)
        }
      }
    },

    methods: {
      clearStatus () {
        this.$store.commit('status/clear')
      }
    }
  }
</script>

<style lang="scss">
  @import "~assets/scss/global/variables";

  .status-bar {
    position: fixed;
    top:0;
    z-index: 12;
    width:100%;
    .close{
      position: relative;
      border: none;
    }
    .progress {
      position: absolute;
      top: 0;
      left: 0;
      transform: rotate(-90deg);
    }
    .progress__meter,
    .progress__value {
      fill: none;
    }
    .progress__meter {
      stroke: rgba(255,255,255,0.5);
    }
    .progress__value {
      stroke: $grey5;
      stroke-linecap: round;
      stroke-dasharray: 69.113; // 2 * PI * Radius (10)
      stroke-dashoffset: 69.113;
      animation: progress 10s 1 forwards;
    }

    @keyframes progress {
      from {
        stroke-dashoffset: 69.113;
      }
      to {
        stroke-dashoffset: 0;
      }
    }
  }
</style>
