<script>
    import {onMount} from "svelte";
    import Scrolly from "../components/Scrolly.svelte";
    import Calendar from "../components/Calendar.svelte";
    import Slideshow from "../components/Slideshow.svelte";
    import Document from "../components/Document.svelte";
    import {current, index, documents} from "../stores.js";	        
    import {page} from "$app/stores";

    let value = 0;
    let promise = null;

    onMount(() => {
      promise = documents.init();
    })
</script>

{#await promise}
  Loading data...
{:then}
  {#if $documents}    
      <section>
          <h1 class="ontop"> 
              Årskavalkade
          </h1>
          <h2>Forskning & Innovasjon 2022</h2>                  
      <div class="section-container">
          <div class="steps-container">
          <Scrolly bind:$index>              
              {#each $documents as document, i}
                  <div class="step" class:active={$index === i}>
                      <div class="step-content">
                          {#if document.content}
                              <Document {document}/>
                          {/if}
                      </div>
                  </div>
              {/each}
              <div class="spacer" />
          </Scrolly>
          </div>
          <div class="sticky">              
            {#if $current}
              {$current.title}
            
              <Slideshow document={$current} />        
              <Calendar value={$current.month} />
              {/if}
          </div>
      </div>

      <h1> 
          God jul 🎅🎄 og godt nytt år! 💥🎉
      </h1>
      </section>
  {/if}
{/await}

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
	
  .spacer {
    height: 40vh;
  }

  .sticky {
    position: sticky;
    top: 0;
	flex: 1 1 60%;
    width: 60%;
  }

  .section-container {
    margin-top: 1em;
    text-align: center;
    transition: background 100ms;
    display: flex;
  }

  .step {
    min-height: 80vh;
    display: flex;
    place-items: center;
    justify-content: left;
  }

  .step-content {
    font-size: 1rem;
    background: #06082d;
    opacity: 0.6;
    color:rgba(255, 255, 255, .2);
    margin-left: 2%;
    border-radius: 10px;
    padding: 1rem 1rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    transition: background 500ms ease;    
    text-align: left;
	width: 65%;	
	min-width: 400px;
  }

	.step.active .step-content {
		background: 06082d;
		color: white;
	}
	
  .steps-container,
  .sticky {    
    height: 100%;
  }

  .steps-container {
    flex: 1 1 40%;
    z-index: 10;
  }

  .ontop {
    z-index: 1000;
  }
	
/* Comment out the following line to always make it 'text-on-top' */
  @media screen and (max-width: 3000px) {
    .section-container {
      flex-direction: column-reverse;
    }
    .sticky {
      width: 100%;
	  margin: 0;
    }
  }
</style>