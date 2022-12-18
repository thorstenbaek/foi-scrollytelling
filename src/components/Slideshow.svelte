<script>
    import {documents} from "../stores";
    import { fade } from 'svelte/transition';
    import { quintOut } from "svelte/easing";
    export var document;    
</script>

{#if document && document.image}
    {#key document}
        <img 
            transition:fade={{delay:10, duration:500}}
            style="position: absolute;left:-100px;top:0;width:120%"
            src={document.image} 
            alt={document.title}
        />
    {/key}
{/if}