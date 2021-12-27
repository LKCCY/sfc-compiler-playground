<template>
  <section class="main">
    <header class="fixed top-0 left-0 w-full  h-[48px] border-b-2 border-bd-color bg-bg-color z-50">头部</header>
    <main class="flex pt-[48px] min-h-screen">
      <section class="flex-1">
        <keep-alive>
          <slot></slot>
        </keep-alive>
      </section>
      <div class="side-menu w-[56px] bg-side-color"></div>
    </main>
  </section>
</template>

<script>
export default {

}
</script>

<style>

</style>
