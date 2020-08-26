<template>
  <span class="g-alertInfo">
    <span>
      <span
        class="notice-item"
        :class="type"
      >
        <SvgIcon
          :class-name="type"
          size="middle"
        />
      </span>
      <span class="txt">
        <slot />
      </span>
    </span>

    <span
      class="m-alert-close"
      :data-id="id"
    >
      <i class="fa fa-close" />
    </span>
  </span>
</template>

<script lang="ts">
import Vue, { PropType } from "vue"
import Component from "vue-class-component"
import { SvgIcon } from "@component/Icon/index"

const ModalProps = Vue.extend({
    components: {
        SvgIcon
    },
    props: {
            type: {
                type: String as PropType<"error" | "success" | "warn">,
                default: "success"
            },
            id: {
                type: String,
                required: true
            }
    }
})

@Component
export default class Modal extends ModalProps {
}
</script>

<style lang="scss">
@import "../../css/scss/unit","../../css/scss/variate";

.g-alertInfo {
  .txt {
    text-align: left;
  }

  .warn {
    color: $warn;
  }

  .notice-item {
    padding-right: 8px;
    font-size: 24px;
  }

  .error {
    color: $error;
  }

  .success {
    color: $success;
  }

  .m-alert-close {
    padding-left: 10px;
    cursor: pointer;

    &:hover {
      color: $theme-color;
    }
  }
}

.g-notification {
  position: absolute;
  right: 20px;
  top: 10px;
  z-index: 20;
  text-align: right;
  width: 50%;
  overflow: hidden;
  padding: 0 6px;

  .g-alertInfo {
    @extend %shadow;

    background: white;
    color: black;
    display: inline-flex;
    padding: 10px;
    margin: 8px 0;
    align-items: center;
    min-width: 280px;
    justify-content: space-between;
    text-align: left;
  }
}

</style>
