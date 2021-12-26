export const templateDemo = `<template>
  <div class="red">{{ msg }}</div>
</template>

<script>
  export default {
      data () {
        return {
          msg: '我是消息'
        }
      }
  }
</script>

<style scoped>
.red {
  color: red;
}
</style>
`
