import {writable, readable, derived} from "svelte/store";

export function createDocumentStore() {
    const {subscribe, update, set} = writable([]);    
    return {
		subscribe,		
		init: () => {
			return new Promise(async resolve => {                
                const request = await fetch("/documents.json");
                const data = await request.json();
                set(data.documents);
                resolve();
			})
		}
	}
}

export const index = writable(0);
export const documents = createDocumentStore();

export const current = derived(
    [documents, index],
    ([$documents, $index]) => $documents[$index]
)