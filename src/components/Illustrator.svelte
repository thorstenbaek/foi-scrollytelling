<script>
    import {current} from "../stores";
    import { fade } from 'svelte/transition';
    import { quintOut } from "svelte/easing";
</script>

{#if $current && $current.illustration}
    {#key $current}
    <div class="parent">
        <img class="fullscreen"
            transition:fade={{delay:10, duration:500}}
            src={$current.illustration} 
            alt={$current.title}
        />
    </div>
    {/key}
{:else}
    <div />    
{/if}

<style>
    .parent {
        display:flex;
        position:fixed;
        margin: 20px;
        padding: 20px;
        top:50%;
        width:auto;
        height:auto;
        justify-content:center;
        align-items:center;
    }

    img {
        height: auto; 
        width: 360px;
        border-style: none;
    }
</style>