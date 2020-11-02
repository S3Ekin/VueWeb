<template>
  <div
    class="search-box"
  >
    <input
      class="search-inp"
      :style="{width: width ? width + 'px' :null}"
    >
    <Button
      :handle="handle"
      class-name="fa fa-search"
    >
      <slot />
    </Button>
  </div>
</template>

<script lang="ts">
import Vue from "vue"
import { Component, Prop } from "vue-property-decorator"
import Button from "../button/index.vue"
import Input from "../input/index.vue"

@Component({
    name: "Search",
    components: {
        Button,
        Input
    }
})
export default class Search extends Vue {
    @Prop({ required: true }) handle!: (e:MouseEventEl<HTMLButtonElement>)=>void;
    @Prop(Number) width!: number;
}
</script>

<style lang="scss">
  @import "../../css/scss/variate";
  $inp-h:32px;
  $inp-border-color:#c6c9cf;
  $active:#82bbf8;
  $color:#5b5b5b;

  .search-box {
    display: flex;

    .search-inp {
      cursor: pointer;
      border: 1px solid;
      border-radius: 3px;
      border-color: $inp-border-color;
      background: none;
      height: $inp-h;
      text-indent: 0.5em;
      outline: 0;
      color: $color;

      &:focus {
        border-color: $active;
      }

      &:disabled {
        background: $normal;
        opacity: 0.4;
        cursor: not-allowed;
      }
    }
  }

</style>
