<template>
  <span class="tit">{{str}}</span>
</template>

<script>
export default {
  name: 'tit',
  props: {
    str: {
      type: String,
      required: true
    }
  }
}
</script>
<style scoped>
    .tit{
        display: inline-block;
        padding-left: 5px;
        /* line-height: 0px; */
        margin-bottom: 20px;
        border-left: 4px solid #ef4c4f;
        /* border-bottom: 1px solid #111; */
    }
</style>
