<template>
  <div>
    <span class="g-alertInfo">
      <span>
        <span
          class="notice-item"
          :class="type"
        >
          <SvgIcon
            :class-name="className"
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
        @click="close"
      >
        <i class="fa fa-close" />
      </span>
    </span>
  </div>
</template>

<script lang="ts">
import Vue from "vue"
import { Component, Prop } from "vue-property-decorator"
import { SvgIcon } from "@component/Icon/index"

@Component({
  components: {
        SvgIcon
  },
  name: "Notice"
})
export default class Notice extends Vue {
  iconObj = {
    success: "fa-fill-success",
    error: "fa-fill-error",
    warn: "fa-warning"
  }

  @Prop({ type: String, default: "success" }) type!: "error" | "success" | "warn";
  @Prop({ type: String, required: true }) id!: string;

  get className ():string {
    return this.iconObj[this.type as "warn"]
  }

  close (e:MouseEventEl<HTMLSpanElement>):void{
    const id = e.currentTarget.dataset.id
    this.$emit("close", id)
  }
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
