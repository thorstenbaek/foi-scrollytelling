<script>
    import {marked} from 'marked';
    
    export let document;

    async function loadMarkdown(name) {       
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
    <h1>{document.icon} {document.title}</h1>
    <div class="markdown">{@html marked(markdown)}</div>    
{:catch error}
    {error}
{/await}

<style>
    :global(img) {
        width: 250px;
        margin: 10px;
        border-color: white;
        border-style: solid;
        border-width: 1px;
    }
</style>