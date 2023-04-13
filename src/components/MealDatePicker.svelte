<script lang="ts">
	import { DatePicker } from 'date-picker-svelte';
	import { selectedMealDate } from '../stores';

	export let min: Date;
	export let max: Date;
</script>

<div class="flex justify-center items-center">
	<!-- TODO: set max and min dates -->
	<!-- TODO: customize colors -->
	{#if $selectedMealDate}
		<DatePicker bind:value={$selectedMealDate} {min} {max} />
	{/if}
</div>
