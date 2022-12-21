<script>
    import {onMount} from "svelte";
    import Scrolly from "../components/Scrolly.svelte";
    import Calendar from "../components/Calendar.svelte";
    import Slideshow from "../components/Slideshow.svelte";
    import Illustrator from "../components/Illustrator.svelte";
    import Document from "../components/Document.svelte";
    import {current, index, documents} from "../stores.js";	        
    import {page} from "$app/stores";

    let promise = null;

    onMount(() => {
      promise = documents.init();
    })
</script>

<section>
{#await promise}
  Loading data...
{:then}
  {#if $documents}              
          <div class="section-container">
              <div class="steps-container">
                <Scrolly bind:$index>              
                    {#each $documents as document, i}
                        <div class="step" class:active={$index === i}>
                            <div class="top-spacer"/>        
                            <div class="step-content">
                                {#if document.content}
                                    <Document {document}/>
                                {/if}
                            </div>
                            <div class="bottom-spacer"/>        
                        </div>
                    {/each}
                </Scrolly>
                
              </div>
              <div class="sticky">              
                <div class="fixed">
                  {#if $current}
                    <Calendar />  
                    <Illustrator />
                    <Slideshow />   
                  {/if}
                </div>
              </div>
          </div>

          <h1> 
              God jul 🎅🎄 og godt nytt år! 💥🎉
          </h1>
          <div class="spacer" />
  {/if}
{/await}
</section>

<style>
	:global(body) {
    background: #06082d;
    color: white;
		overflow-x: hidden;
    font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    margin: 0;
	}
	
	h1 {
    font-size: 2em;
    justify-content: center;
    text-align: center;
	}
	
	h2 {
		justify-content: center;
		text-align: center;
	}

  :global(a:link, a:active, a:visited) {
      color: lightgray;
  }
  :global(a:hover) {
      color: white;        
  }

  .top-spacer {
    height: 50px;
  }

  .bottom-spacer {
    height: 10vh;
  }

  .section-container {
    display: flex;    
    text-align: center;
    transition: background 100ms;        
  }

  .step {
    min-height: 80vh;
  }

  .step-content {
    font-size: 1rem;
    background: rgba(6, 8, 45, 0.2);
    color:rgba(255, 255, 255, .2);
    margin-left: 2%;
    border-radius: 10px;
    padding: 1rem 1rem;
    transition: background 500ms ease;    
    text-align: left;
  }

	.step.active .step-content {
		background: rgba(6, 8, 45, 0.6);
		color: rgba(255, 255, 255, 1.0);
	}
	
  .sticky {
    flex: 1;
    position: sticky;
    top: 0;
    align-content: center;    
  }

  .fixed {
    position: fixed;
  }

  .steps-container {
    flex: 2;
    max-width: 740px;
    z-index: 10;
  }

  .ontop {
    z-index: 10;
  }
	
/* Comment out the following line to always make it 'text-on-top' */
@media screen and (max-width: 640px) {
    .section-container {
      flex-direction: column-reverse;
    }
    .sticky {
      width: 100%;
	    margin: 0;
    }
  }
</style>