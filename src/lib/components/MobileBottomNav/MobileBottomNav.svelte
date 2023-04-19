<script lang="ts">
	import MobileBottomNavButton from './MobileBottomNavButton.svelte';
	import { faCalendar, faCartShopping, faUtensils } from '@fortawesome/free-solid-svg-icons';
	import { Pages } from '$lib/components/MobileBottomNav/store';
</script>

<div
	class="fixed flex bottom-0 left-0 w-screen h-16 border-t-2 text-white bg-slate-600 border-slate-700 border-solid justify-center"
>
	<div class="flex w-full max-w-screen-sm">
		<MobileBottomNavButton pageId={Pages.Calendar} name="Calendar" icon={faCalendar} />
		<MobileBottomNavButton pageId={Pages.Menu} name="Menu" icon={faUtensils} />
		<MobileBottomNavButton pageId={Pages.Summary} name="Summary" icon={faCartShopping} />
	</div>
</div>
