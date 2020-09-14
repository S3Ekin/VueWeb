<template>
  <div class="g-check-item">
    <span class="lab-tit"><slot /></span>
    <span class="g-check-box">
      <label
        v-for="item in data"
        :key="item.val"
        class="m-label m-lab-radio "
      >
        <span class="wrap-icon">
          <SvgIcon :class-name="item.val === select?'fa-radio':'fa-unradio'" />
          <input
            :type="type"
            class="checkBox-inp"
            :name="name"
            :data-set="dataSet"
            :value="item.val"
            :checked="item.val === select"
            :disabled="disabled"
            @change="handle"
          >
        </span>
        {{ item.name }}
      </label>
    </span>
  </div>
</template>

<script lang="ts">
  import Vue, { PropType } from "vue"
  import { SvgIcon } from "@component/Icon/index"
  import { Component } from "vue-property-decorator"
  type data = {
    name:string;
    val:string;
  }[]
  const InpProps = Vue.extend({
        name: "Checkbox",
        components: {
          SvgIcon
        },
        props: {
            handle: {
                type: Function as PropType<(e:MouseEvent)=>void>,
                required: true
            },
            type: { // 边框样式
                type: String as PropType<"radio" | "checkbox" >,
                default: "radio"
            },
            name: {
                type: String,
                required: true
            },
            dataSet: {
                type: String,
                default: ""
            },
            data: {
                type: Array as PropType<data>,
                default: []
            },
            select: {
                type: String,
                required: true
            },
            disabled: Boolean
        }
    })

    @Component
    class SInp extends InpProps {
    }

    export default SInp

</script>

<style lang="scss">
@import "../../css/scss/variate";
$inp-h:36px;
$inp-border-color:#c6c9cf;
$active:#82bbf8;
$color:#5b5b5b;

.g-check-item {
  display: flex;
  align-items: center;
}

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
