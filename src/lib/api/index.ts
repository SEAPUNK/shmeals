import {
	getFoodIcons,
	getLocations,
	getMenuTypes,
	getOrderingWindows,
	type NSLocations,
	type NSMenuTypes,
	type NSOrderingWindows
} from '$lib/api/nutrislice';
import assert from 'assert';

// nutrislice id
// ex: 1234
type NSID = number;

type LocationInfo = {
	location: {
		nsid: NSID;
		// name of the location
		// ex: "Dining Room"
		name: string;
		// url to image
		// ex: https://structurehouse.nutrislice.com/images/some-image.jpg
		image: string;
	};
	menus: {
		// menu ID (in the form of a slug)
		// ex: "breakfast"
		[id: string]: {
			nsid: NSID;
			// menu ID (in the form of a slug)
			// ex: "breakfast"
			id: string;
			// menu display name
			// ex: "Breakfast"
			name: string;
			// url to image
			// ex: https://structurehouse.nutrislice.com/images/some-image.jpg
			image: string;
		};
	};
	orderingWindows: {
		// meal date (YYYY-MM-DD)
		// ex: "2023-04-14"
		[date: string]:
			| undefined
			| {
					// ordering window start
					// ex: "2023-03-14T00:00:00-04:00"
					start: string;
					// ordering window end
					// ex: "2023-04-11T13:00:00-04:00"
					end: string;
			  };
	};
};

function extractLocations(nsLocations: NSLocations): LocationInfo['location'] {
	const nsLocation = nsLocations[0];
	assert.ok(nsLocation, 'NSLocation 0 does not exist');
	assert.strictEqual(nsLocation.name, 'Dining Room', 'NSLocation 0 not dining room');
	return {
		nsid: nsLocation.id,
		name: nsLocation.name,
		image: nsLocation.logo
	};
}

function extractMenu(nsMenuTypes: NSMenuTypes, slug: string): LocationInfo['menus']['id'] {
	const nsMenuType = nsMenuTypes.find((nsMenuType) => nsMenuType.slug === slug);
	assert.ok(nsMenuType, `could not find NSMenuType with slug '${slug}'`);
	return {
		nsid: nsMenuType.id,
		id: nsMenuType.slug,
		name: nsMenuType.name,
		image: nsMenuType.image_url
	};
}

function extractMenus(nsMenuTypes: NSMenuTypes): LocationInfo['menus'] {
	return {
		breakfast: extractMenu(nsMenuTypes, 'breakfast'),
		lunch: extractMenu(nsMenuTypes, 'lunch'),
		dinner: extractMenu(nsMenuTypes, 'dinner')
	};
}

function extractOrderingWindows(
	nsOrderingWindows: NSOrderingWindows
): LocationInfo['orderingWindows'] {
	// assert menu IDs show same order types, dates, and time windows
	let firstOrderingWindowMethods: NSOrderingWindows['x'] | undefined = undefined;
	for (const [menuTypeNSID, orderingWindowMethods] of Object.entries(nsOrderingWindows)) {
		// assert truthy b/c zod schema type
		assert.ok(orderingWindowMethods, 'SHOULD NEVER HAPPEN - orderingWindowMethods is not truthy');

		if (firstOrderingWindowMethods == null) {
			firstOrderingWindowMethods = orderingWindowMethods;
			// assert that the delivery and pickup methods contain the same ordering window datetimes
			assert.deepStrictEqual(
				orderingWindowMethods.delivery,
				orderingWindowMethods.pickup,
				'pickup and delivery ordering window dates differ'
			);
			continue;
		}
		assert.deepStrictEqual(
			orderingWindowMethods,
			firstOrderingWindowMethods,
			`ordering window methods data for menu type ${menuTypeNSID} does not match first one`
		);
	}

	assert.ok(
		firstOrderingWindowMethods,
		'SHOULD NEVER HAPPEN - firstOrderingWindowMethods was not set'
	);

	return firstOrderingWindowMethods.delivery;
}

export async function getLocationInfo(): Promise<LocationInfo> {
	// fetch all data
	// TODO: use nsFoodIcons somewhere
	const [nsLocations, nsMenuTypes, nsOrderingWindows, nsFoodIcons] = await Promise.all([
		getLocations(),
		getMenuTypes(),
		getOrderingWindows(),
		getFoodIcons()
	]);

	const location = extractLocations(nsLocations);
	const menus = extractMenus(nsMenuTypes);
	const orderingWindows = extractOrderingWindows(nsOrderingWindows);

	return {
		location,
		menus,
		orderingWindows
	};
}
