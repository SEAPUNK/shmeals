<script lang="ts">
	/** @type {import('./$types').PageData} */
	import MealDatePicker from '$lib/components/MealDatePicker.svelte';
	import { DateTime } from 'luxon';
	import { selectedMealDate } from '$lib/stores';
	import { derived, readable } from 'svelte/store';
	import * as t from 'typed-assert';

	export let data;
	console.log(data.info);

	// determine first and last day of menus
	const orderingWindowDates = Object.keys(data.info.orderingWindows)
		.map((orderingWindow) => DateTime.fromISO(orderingWindow))
		.sort((a, b) => a.diff(b).toMillis());
	const firstMenuDate = orderingWindowDates[0].toJSDate();
	const lastMenuDate = orderingWindowDates[orderingWindowDates.length - 1].toJSDate();
	selectedMealDate.set(firstMenuDate);

	const selectedDateOrderingWindow = derived(selectedMealDate, ($selectedMealDate) => {
		if ($selectedMealDate == null) return;
		const key = DateTime.fromJSDate($selectedMealDate).toFormat('yyyy-MM-dd');
		const range = data.info.orderingWindows[key];
		t.isNotUndefined(range, `ordering window range not found for ${key}`);
		return range;
	});

	let currentDate = readable(new Date(), (set) => {
		const iv = setInterval(() => {
			set(new Date());
		}, 500);

		return function cleanup() {
			clearInterval(iv);
		};
	});
	let orderTimeRemaining = derived(
		[selectedDateOrderingWindow, currentDate],
		([$selectedDateOrderingWindow, $currentDate]) => {
			if ($selectedDateOrderingWindow == null) return '';
			const current = DateTime.fromJSDate($currentDate);
			const end = DateTime.fromISO($selectedDateOrderingWindow.end);
			const diff = end.diff(current).rescale();
			if (diff.toMillis() < 0) {
				return 'Ordering is closed';
			} else if (diff.as('days') >= 1) {
				return `Ordering closes in ${diff.toFormat(`d'd' h'h'`)}`;
			} else {
				return `Ordering closes in ${diff.toFormat(`h:mm:ss`)}`;
			}
		}
	);
</script>

<div class="fixed w-[320px] p-4 flex flex-col gap-4 left-0 top-0 h-screen">
	<h1 class="text-2xl">SH Meals</h1>
	<MealDatePicker min={firstMenuDate} max={lastMenuDate} />
	<div class="italic">
		{$orderTimeRemaining}
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
<div
	class="absolute left-[320px] pl-4 pr-4 pt-4 pb-4 right-0 top-0 w-auto min-h-screen bg-green-200"
>
	<!-- menu bar + padding -->
	<div class="sticky top-4 left-4 right-4 w-auto h-20 bg-red-100" />
	<div class="h-4" />
	content START<br />
	content goes here<br />
	content goes here<br />
	content goes here<br />
	content goes here<br />
	content goes here<br />
	content goes here<br />
	content goes here<br />
	content goes here<br />
	content goes here<br />
	content goes here<br />
	content goes here<br />
	content goes here<br />
	content goes here<br />
	content goes here<br />
	content goes here<br />
	content goes here<br />
	content goes here<br />
	content goes here<br />
	content goes here<br />
	content goes here<br />
	content goes here<br />
	content goes here<br />
	content goes here<br />
	content goes here<br />
	content goes here<br />
	content goes here<br />
	content goes here<br />
	content goes here<br />
	content goes here<br />
	content goes here<br />
	content goes here<br />
	content goes here<br />
	content goes here<br />
	content goes here<br />
	content goes here<br />
	content goes here<br />
	content goes here<br />
	content goes here<br />
	content goes here<br />
	content goes here<br />
	content goes here<br />
	content goes here<br />
	content goes here<br />
	content goes here<br />
	content goes here<br />
	content goes here<br />
	content goes here<br />
	content goes here<br />
	content goes here<br />
	content goes here<br />
	content goes here<br />
	content goes here<br />
	content goes here<br />
	content goes here<br />
	content goes here<br />
	content goes here<br />
	content goes here<br />
	content goes here<br />
	content goes here<br />
	content goes here<br />
	content goes here<br />
	content goes here<br />
	content goes here<br />
	content goes here<br />
	content goes here<br />
	content goes here<br />
	content goes here<br />
	content goes here<br />
	content END<br />

	<!-- totals bar + padding -->
	<div class="h-4" />
	<div class="sticky bottom-4 left-4 right-4 w-auto h-20 bg-red-100" />
</div>
