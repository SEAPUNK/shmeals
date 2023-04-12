/** @type {import('./$types').PageLoad} */

import { getLocationInfo } from '$lib/api';
import { getFoodIcons, getOrderingWindows } from '$lib/api/nutrislice';

export async function load() {
	return {
		info: getLocationInfo(),
		_fi: getFoodIcons()
	};
}
