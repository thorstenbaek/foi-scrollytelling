<script>
    import {marked} from 'marked';
    
    export let document;

    async function loadMarkdown(name) {
        
        console.log("Loading " + name);
        const res = await fetch(name);
        const text = await res.text();    
        if (res.ok) {
            return text;
        } 
        else {
            throw new Error(text);
        }
	}

</script>
    
{#await loadMarkdown(document.content)}
    Loading...
{:then markdown}
    <div>{@html marked(markdown)}</div>    
{:catch error}
    {error}
{/await}

<style>

</style>