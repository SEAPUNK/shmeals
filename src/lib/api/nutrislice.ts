import { makeRequest } from '$lib/api/http';
import { DateTime } from 'luxon';
import { z } from 'zod';

const NSLocationsSchema = z.array(
	z.object({
		id: z.number(),
		name: z.string(),
		logo: z.string()
	})
);
export type NSLocations = z.infer<typeof NSLocationsSchema>;
export async function getLocations(): Promise<NSLocations> {
	const rawNSLocations = await makeRequest('menu/api/schools/');
	return NSLocationsSchema.parse(rawNSLocations);
}

const NSMenuTypesSchema = z.array(
	z.object({
		id: z.number(),
		name: z.string(),
		slug: z.string(),
		image_url: z.string()
	})
);
export type NSMenuTypes = z.infer<typeof NSMenuTypesSchema>;
export async function getMenuTypes(): Promise<NSMenuTypes> {
	const rawNSMenuTypes = await makeRequest('menu/api/menutypes/', {
		params: {
			'exclude-archived': 'true'
		}
	});
	return NSMenuTypesSchema.parse(rawNSMenuTypes);
}

const NSOrderingWindowList = z.record(
	z.optional(
		z.object({
			start: z.string().datetime({ offset: true }),
			end: z.string().datetime({ offset: true })
		})
	)
);
const NSOrderingWindowsSchema = z.record(
	z.optional(
		z.object({
			delivery: NSOrderingWindowList,
			pickup: NSOrderingWindowList
		})
	)
);
export type NSOrderingWindows = z.infer<typeof NSOrderingWindowsSchema>;
export async function getOrderingWindows(): Promise<NSOrderingWindows> {
	const getNow = () => DateTime.now().setZone('America/New_York');
	const start = getNow().toFormat('YYYY-MM-DD');
	const end = getNow().plus({ days: 30 }).toFormat('YYYY-MM-DD');
	const rawNSOrderingWindows = await makeRequest('menu/api/location/5485/ordering-windows/', {
		params: {
			start,
			end
		}
	});
	return NSOrderingWindowsSchema.parse(rawNSOrderingWindows);
}

// TODO: type it
export type NSFoodIcons = any;
export async function getFoodIcons(): Promise<NSFoodIcons> {
	return makeRequest('api/food-icon/group/as-filter/');
}

// TODO: type it
export type NSMenu = any;
export async function getMenu(menuType: string, date: Date): Promise<NSMenu> {
	// TODO: validate input
	const luxonDate = DateTime.fromJSDate(date).setZone('Americas/New_York');
	const year = luxonDate.toFormat('YYYY');
	const month = luxonDate.toFormat('MM');
	const day = luxonDate.toFormat('DD');
	return makeRequest(
		`menu/api/weeks/school/dining-room/menu-type/${menuType}/${year}/${month}/${day}`
	);
}
