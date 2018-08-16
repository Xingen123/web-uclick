<template>
  <div id="app">
	<!-- <transition  name="component-fade" mode="out-in"> -->
    		<!-- <keep-alive>	 -->
				<router-view  v-if="$route.meta.requiresAuth"></router-view>
				<router-view  v-if="!$route.meta.requiresAuth"></router-view>
			<!-- </keep-alive> -->
				<!-- <router-view v-if="!$route.meta.requiresAuth"></router-view> -->
	<!-- </transition> -->
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style scoped>

/* .component-fade-leave-active for below version 2.1.8  {
  opacity: 0;
}*/
</style>
