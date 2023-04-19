<script lang="ts">
	import classnames from 'classnames';
	import Fa from 'svelte-fa/src/fa.svelte';
	import type { IconDefinition as RegularIcon } from '@fortawesome/free-regular-svg-icons';
	import type { IconDefinition as SolidIcon } from '@fortawesome/free-solid-svg-icons';
	import { currentPage, type Pages } from '$lib/components/MobileBottomNav/store';
	export let pageId: Pages;
	export let name: String;
	export let icon: RegularIcon | SolidIcon;

	function handleClick() {
		currentPage.set(pageId);
	}

	$: selected = pageId === $currentPage;
</script>

<button
	on:click={handleClick}
	class="cursor-pointer flex-1 gap-1 flex flex-col items-center justify-center"
>
	<button class={classnames('text-md px-5 rounded-full py-1.5', selected && 'bg-slate-700')}>
		<Fa {icon} />
	</button>
	<span class="uppercase text-xs text-slate-100">
		{name}
	</span>
</button>
