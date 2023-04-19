<script lang="ts">
	import MealDatePicker from '$lib/components/MealDatePicker.svelte';
	import { DateTime } from 'luxon';

	const firstMenuDate = DateTime.fromISO('2023-04-02').toJSDate();
	const lastMenuDate = DateTime.fromISO('2023-04-25').toJSDate();
	const orderTimeRemaining = 'Ordering is closed';
</script>

<div class="p-4 flex flex-col gap-4 left-0 top-0 h-full">
	<h1 class="text-2xl">SH Meals</h1>
	<MealDatePicker min={firstMenuDate} max={lastMenuDate} />
	<div class="italic">
		{orderTimeRemaining}
	</div>
	<div class="flex-1" />
	<div>
		<button
			type="button"
			class="w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
			>Set choices/calorie targets</button
		>
	</div>
</div>
