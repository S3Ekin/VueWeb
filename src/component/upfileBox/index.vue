<template>
  <div class="upfile-box">
    <span class="file-name">
      {{ fileName }}
    </span>
    <label class="j-btn">
      <span>
        <slot>选择文件</slot>
      </span>
      <input
        type="file"
        class="upfile-inp"
        @change="change"
      >
    </label>
  </div>
</template>

<script lang="ts">
  import Vue, { PropType } from "vue"
  import Component from "vue-class-component"
  const InpProps = Vue.extend({
        name: "UpFile",
        props: {
            handle: {
                type: Function as PropType<(e:MouseEvent)=>void>,
                required: true
            },
            name: {
                type: String,
                default: ""
            },
            val: {
                type: String,
                default: ""
            },
            fileReg: {
              type: RegExp,
              default: null
            },
            disabled: Boolean
        }
    })

    @Component
    class UpFile extends InpProps {
        fileName = ""
        change (e:MouseEventEl<HTMLInputElement>):void {
            const file = e.target.files![0]
            this.fileName = file.name
            const fileTypeArr = this.fileName.split(".")
            const fileType = fileTypeArr[fileTypeArr.length - 1]
            if (this.fileReg && !fileType.match(this.fileReg)) {
                alert(this.fileName + "格式不对！")
                this.fileName = ""
                return
            }
            this.handle(e)
            e.target.value = ""
        }
    }

    export default UpFile

</script>

<style lang="scss">
@import "../../css/scss/variate";

.upfile-box {
  display: flex;
  line-height: 36px;
  height: 36px;

  .file-name {
    border: 1px solid $normal;
    height: 100%;
    flex: 1;
    padding: 0 1em;
    word-break: break-all;
  }

  .upfile-inp {
    position: absolute;
    left: 0;
    width: 100%;
    height: 100%;
    top: 0;
    opacity: 0;
    cursor: pointer;
  }

  .j-btn {
    cursor: pointer;
    padding: 0 10px;
    background: #1182fb;
    color: white;
    text-align: center;
    position: relative;
    border-radius: 0 4px 4px 0;
  }
}

</style>
