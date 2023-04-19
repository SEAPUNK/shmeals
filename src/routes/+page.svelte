<script lang="ts">
	/** @type {import('./$types').PageData} */
	import MobileBottomNav from '$lib/components/MobileBottomNav/MobileBottomNav.svelte';
	import { Pages, currentPage } from '$lib/components/MobileBottomNav/store';
	import { switchExhaust } from '$lib/types';
	import { derived } from 'svelte/store';
	import PageThreeContent from './PageThreeContent.svelte';
	import PageTwoContent from './PageTwoContent.svelte';
	import CalendarPage from './CalendarPage.svelte';

	const mobileCurrentPage = derived(currentPage, ($currentPage) => {
		switch ($currentPage) {
			case Pages.Calendar:
				return CalendarPage;
			case Pages.Menu:
				return PageTwoContent;
			case Pages.Summary:
				return PageThreeContent;
			default:
				return switchExhaust($currentPage);
		}
	});
</script>

<div class="pb-16 min-h-screen">
	<svelte:component this={$mobileCurrentPage} />
</div>
<MobileBottomNav />
