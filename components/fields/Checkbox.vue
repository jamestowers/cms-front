<template>
  <div class="checkbox">
    <span class="checkbox-runner" :style="{ backgroundColor: this.runnerColor }"></span>
    <input 
      type="checkbox" 
      :checked="shouldBeChecked" 
      :value="value" 
      @change="updateInput"
      :id="id" />
    <div>
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 64 64"><polyline points="13 33 25 45 49 21 " style="fill:none;stroke-linejoin:bevel;stroke-width:4;"/></svg>
    </div>
    <label :for="id">{{ label }}</label>
  </div>
</template>

<script>
// see: https://www.smashingmagazine.com/2017/08/creating-custom-inputs-vue-js/
export default {
  model: {
    prop: 'modelValue',
    event: 'change'
  },
  props: {
    value: [String, Number],
    modelValue: {
      default: false
    },
    id: {
      type: String,
      required: true
    },
    label: {
      type: String,
      required: true
    },
    trueValue: {
      type: Boolean,
      default: true
    },
    falseValue: {
      type: Boolean,
      default: false
    },
    runnerColor: {
      type: String,
      default: '#EBEFF2'
    }
  },

  data () {
    return {
      isChecked: '0'
    }
  },

  computed: {
    shouldBeChecked () {
      if (this.modelValue instanceof Array) {
        return this.modelValue.includes(this.value)
      }
      // Note that `true-value` and `false-value` are camelCase in the JS
      return this.modelValue === this.trueValue
    }
  },

  methods: {
    /* onChange (e) {
      this.isChecked = e.target.checked ? '1' : '0'
      // this.isChecked = !this.isChecked
      this.$emit('input', this.isChecked)
    } */
    updateInput (event) {
      let isChecked = event.target.checked

      if (this.modelValue instanceof Array) {
        let newValue = [...this.modelValue]

        if (isChecked) {
          newValue.push(this.value)
        } else {
          newValue.splice(newValue.indexOf(this.value), 1)
        }

        this.$emit('change', newValue)
      } else {
        this.$emit('change', isChecked ? this.trueValue : this.falseValue)
      }
    }
  }
}
</script>

<style lang="scss">
  
  @import "~assets/scss/global/variables";

  input[type="checkbox"], 
  input[type="radio"] {
    display: inline;
    margin-right: 5px;
    & + label{
      clear: none;
      display: inline;
      margin-right: 10px;
      padding-right:0;
    }
  }

  .checkbox{
    position: relative;
    padding: 2px;
    &:not(:first-child){
      border-top: $border-width solid $border-color;
    }
    &:hover{
      input[type="checkbox"] {
        & + div {
          border-color: $grey5;
          svg{
            stroke: $grey5;
          }
          &:before,
          &:after {
            background-color: $grey5;
          }
        }
      }
    }
    .checkbox-runner{
      border-radius: 20px;
      height:20px;
      position: absolute;
      top: 5px;
      left: 2px;
      width: 40px;
      display: block;
    }
    label {
      position: absolute;
      left: 0;
      padding-left: 56px;
      min-height:26px;
      width:100%;
      cursor: pointer;
      display: inline-block;
    }
  }

  .checkbox input[type="checkbox"] {
    cursor: pointer;
    position: absolute;
    opacity: 0;
    left:0;
    top:0;
    width:100%;
    height:100%;
    & + div {
      cursor: pointer;
      display: inline-block;
      margin-right:10px;
      vertical-align: middle;
      width:26px;
      height: 26px;
      border: 1px solid $grey6;
      border-radius: 999px;
      background: $grey8;
      position: relative;
      transition: all 0.2s $ease-out-quint;
      transform: translateX(15px);
      svg{
        display: none;
        /* polyline,
        path{
          stroke: $grey6;
        } */
      }
    }
    &:checked + div {
      border-color: $color-primary;
      background-color: $color-primary;
      transform: translateX(0);
      svg{
        display: block;
        polyline,
        path{
          stroke: $white;
        }
      }
    }
    &:active + div:before {
      
    }
    &:focus + div {
    }
  }

  .checkbox-small{
    input[type="checkbox"] {
      & + div {
        width:20px;
        height: 20px;
        &:before {
          height: 5px;
          left: 5px;
          top: 8px;
        }
        &:after {
          height: 9px;
          left: 9px;
          top: 5px;
        }
      }
      &:checked + div {
        //padding-left: 14px;
      }
    }
    label{
      font-size: 1.2rem;
      min-height: 20px;
      padding-left: 30px;
    }
  }
  
</style>
