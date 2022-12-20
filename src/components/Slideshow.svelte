<script>
    import {current} from "../stores";
    import { fade } from 'svelte/transition';
    import { quintOut } from "svelte/easing";
</script>

{#if $current && $current.image}
    {#key $current}
    <div class="parent">
        <img class="fullscreen"
            transition:fade={{delay:10, duration:500}}
            src={$current.image} 
            alt={$current.title}
        />
    </div>
    {/key}    
{/if}

<style>
    div.parent {
        z-index: -1000;
        display:flex;
        position:fixed;
        left:0px;
        top:0px;
        width:100%;
        height:100%;
        justify-content:center;
        align-items:center;
    }

    img {
        height:100%; 
        width: auto;
    }
</style>