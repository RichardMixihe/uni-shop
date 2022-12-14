<template>
	<view>
		<!-- <my-login v-if="!token"></my-login> -->
		<!-- <my-userinfo v-else></my-userinfo> -->
		<my-userinfo></my-userinfo>
	</view>
</template>

<script>
	import {
		mapState
	} from 'vuex'
	import badgeMix from '@/mixins/setBadge.js'
	export default {
		mixins: [badgeMix],
		data() {
			return {

			};
		},
		computed: {
			...mapState('m_user', ['token'])
		}
	}
</script>

<style lang="scss">

</style>
