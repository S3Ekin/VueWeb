<template>
  <label
    class="m-label m-lab-radio"
    :data-value="value"
    :data-name="name"
    :data-set="dataSet"
  >
    <span
      class="wrap-icon"
    >
      <SvgIcon :class-name="className" />
    </span>
    <slot />
  </label>
</template>

<script lang="ts">
  import Vue from "vue"
  import { SvgIcon } from "@component/Icon/index"
  import { Component, Prop } from "vue-property-decorator"
  type data = {
    name:string;
    val:string;
  }[]

  const obj = {
    checkbox: ["fa-unchecked", "fa-checked"],
    radio: ["fa-unradio", "fa-radio"]
  }

    @Component({
      name: "Checkbox",
      components: {
        SvgIcon
      }
    })
   export default class Checkbox extends Vue {
      @Prop({ type: String, default: "radio" }) type!: "radio" | "checkbox";
      @Prop(String) name!: string;
      @Prop(String) value!: string;
      @Prop(String) dataSet! :string;
      @Prop(Boolean) checked!: boolean;
      @Prop(Boolean) hasChecked!: boolean;
      @Prop(Boolean) disabled!: boolean;
      get className ():string {
        const { type } = this
          return this.hasChecked ? "fa-hasChecked" : this.checked ? obj[type][1] : obj[type][0]
      }
    }
</script>

<style lang="scss">
@import "../../css/scss/variate";
$inp-h:36px;
$inp-border-color:#c6c9cf;
$active:#82bbf8;
$color:#5b5b5b;

%inpbox {
  height: $inp-h;
  display: flex;
  align-items: center;

  .m-label {
    margin: 0 6px;
  }
}

.m-label {
  display: inline-flex;
  align-items: center;
  margin-right: 30px;
  cursor: pointer;

  .wrap-icon {
    position: relative;
    padding-right: 8px;
  }

  .fa {
    color: $text-color;
    cursor: pointer;
    font-size: 18px;
    margin-right: 8px;
  }

  .fa-checked,
  .fa-radio {
    color: #1182fb;
  }

  .checkBox-inp {
    opacity: 0;
    cursor: pointer;
    position: absolute;
    display: none;
  }

  &.active {
    color: #3b90f2;
  }
}

.disabled-box {
  cursor: not-allowed;
  color: #c6c9cf;

  .checkBox-inp {
    cursor: not-allowed;
  }

  .icon {
    cursor: not-allowed;
  }
}

/* radio */
.m-radio {
  @extend %inpbox;
}

.m-checkbox {
  @extend %inpbox;
}
</style>
