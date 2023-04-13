import { writable } from 'svelte/store';

export const selectedMealDate = writable<Date | undefined>(undefined);
