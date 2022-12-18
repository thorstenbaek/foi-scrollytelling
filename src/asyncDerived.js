import { derived } from 'svelte/store'

export default function (store, callback, initial_value) {
	let guard

	return derived(store, ($store, set) => {
		console.log("derived");
        const inner = guard = {}

		set(initial_value)
		Promise.resolve(callback($store)).then(value => {
			if (guard === inner) {
                console.log("set", value);
				set(value)
			}
		})
	}, initial_value)
}
