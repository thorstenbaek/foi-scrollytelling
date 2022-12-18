<script>
    import {documents} from "../stores";
    import { fade } from 'svelte/transition';
    import { quintOut } from "svelte/easing";
    export var value;

    var document;

    $: {
        console.log($documents);
        document = $documents.filter(d => d.index == value);
        console.log("document", document[0]);
    }
</script>

{#if document.length > 0 && document[0].image}
    {#key document[0]}
        <img 
            transition:fade={{delay:10, duration:500}}
            style="position: absolute;left:-100px;top:0;width:120%"
            src={document[0].image} 
            alt={document[0].title}
        />
    {/key}
{/if}