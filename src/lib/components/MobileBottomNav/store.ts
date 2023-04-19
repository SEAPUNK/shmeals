import { writable } from 'svelte/store';

export enum Pages {
	Calendar,
	Menu,
	Summary
}

export const currentPage = writable(Pages.Calendar);
