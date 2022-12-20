<script>
    import {current} from "../stores";
    
    export let value;

    const year = 2022;

    let month;
    let calendar;
    let days = [];

    function addDays(date, days) {
        var result = new Date(date);
        result.setDate(result.getDate() + days);
        return result;
    }

    const weekDays = ["ma", "ti", "on", "to", "fr", "lø", "sø"];
    const months = ["Januar", "Februar", "Mars", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Desember"];
        //console.log("calendar", document);
        $: {
          if ($current) {
            value = $current.month;
            days = [];
            month = new Date(year, value);

            if (value >= 0 && value < 12) {
                calendar = month;
                while(calendar.getMonth() == value) {
                    days.push(new Date(year, value, calendar.getDate()))
                    calendar = addDays(calendar, 1);
                }
            }
        
            else {
                calendar = null;
                days = [];
            }
          }
    }

</script>

{#if calendar}
<div class="calendar-container">
  <div class="month-indicator">        
    <time datetime={month}>{months[month.getMonth()]} {year}</time>
  </div>
  <div class="day-of-week">      
    {#each weekDays as weekDay}
      <div>{weekDay}</div>
    {/each}
  </div>
    
  <div class="date-grid">
    {#each days as day, i}
      <button style="{(i == 0)?`grid-column:${day.getDay()}`:''}">
        <time datetime={day}>{day.getDate()}</time>
      </button>
    {/each}      
  </div>
</div>
{/if}
<style>

.calendar-container {    
  z-index: 1000;
  align-content: center;
  margin: 20px;
  padding: 20px;
  font-size: 2em;  
}

button {
    background: transparent;
    border: none;
    color: white;
    font-size: .75em;
}

.month-indicator {
  color: white;
  text-align: center;
  font-weight: 500;
}

.day-of-week,
.date-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
}


.day-of-week {
  margin-top: 1.25em;
}

.day-of-week > * {
  font-size: 0.7em;
  color: white;
  font-weight: 500;
  letter-spacing: 0.1em;
  /*font-variant: small-caps;*/
  text-align: center;
}

/* Dates */
.date-grid {
  margin-top: 0.5em;
}

/* Positioning the first day */
/*.date-grid button:first-child {
  grid-column: 6;
} */   
</style>