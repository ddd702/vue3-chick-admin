<template>
  <div class="ck-water-mark-wrapper">
    <template v-if="level === 0">
      <div
        v-for="item in new Array(count)"
        :style="{ fontSize: size + 'px', width: getWidth() }"
        :key="item"
        class="ck-water-mark"
      >
        {{ text }}
      </div>
    </template>
    <template v-else>
      <div class="ck-water-mark-pic" ref="markBg"></div>
    </template>
    <!-- <canvas ref="canvas"></canvas> -->
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue';
const canvasWidth = 200;
const canvasHeight = 200;
export default defineComponent({
  setup() {
    return {
      waterImg: ref(''),
    };
  },
  props: {
    level: {
      //0：文字,不推荐使用了，1:图片
      type: Number,
      default: 1,
    },
    count: {
      //level=0时，文本密度
      type: Number,
      default: 20,
    },
    rotate: {
      //倾斜角度，单位deg
      type: Number,
      default: -20,
    },
    size: {
      type: Number,
      default: 22,
    },
    isImage: {
      // 如果开启isImage。默认text传入的是图片链接地址（记得链接地址要支持跨域-canvas.toDataUrl有跨域问题）
      type: Boolean,
      default: false,
    },
    text: {
      type: String,
      default: 'chick admin',
    },
  },
  mounted() {
    if (this.level === 1) {
      const canvas: HTMLCanvasElement = document.createElement('canvas');
      // const canvas: any = this.$refs['canvas'];
      canvas.width = canvasWidth;
      canvas.height = canvasHeight;
      const ctx: any = canvas.getContext('2d');
      const maskEl = this.$refs['markBg'] as HTMLElement;
      ctx.rotate(Math.PI * (this.rotate / 180));
      ctx.font = `${this.size}px serif`;
      ctx.textAlign = 'center';
      ctx.fillStyle = '#666';
      if (!this.isImage) {
        ctx.fillText(this.text, 100, 100);
        maskEl.style.backgroundImage = `url(${canvas.toDataURL()})`;
      } else {
        const img = new Image();
        img.onload = function () {
          const drawWidth = canvasWidth * (3 / 5); //图片绘制长度为canvas的3/5
          const drawHeight = img.height * (drawWidth / img.width);
          ctx.drawImage(img, 0, 0, drawWidth, drawHeight);
          maskEl.style.backgroundImage = `url(${canvas.toDataURL(
            'image/png'
          )})`;
        };
        img.crossOrigin = 'Anonymous';
        img.src = this.text;
      }
    }
  },
  methods: {
    getWidth() {
      return '20%';
    },
  },
});
</script>
<style lang="scss">
.ck-water-mark-wrapper {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  opacity: 0.2;
  color: #999;
  font-weight: bold;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  user-select: none;
  overflow: hidden;
}
.ck-water-mark {
  transform: rotate(-25deg);
}
.ck-water-mark-pic {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-repeat: repeat;
}
</style>
