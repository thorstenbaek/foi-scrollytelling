<script>
    import {current} from "../stores";
    
    let date;

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
        $: {
          if ($current && $current.date) {
            date = new Date($current.date);
            month = date.getMonth();
            days = [];

            calendar = new Date(year, month, 1);
            while(calendar.getMonth() == month) {
                days.push(calendar);
                calendar = addDays(calendar, 1);
            }
          }
    }

</script>

{#if calendar}
<div class="calendar">
  <div class="calendar-container">
    <div class="month-indicator">        
      <time datetime={date}>{months[date.getMonth()]} {year}</time>
    </div>
    <div class="day-of-week">      
      {#each weekDays as weekDay}
        <div>{weekDay}</div>
      {/each}
    </div>
      
    <div class="date-grid">
      {#each days as day, i}
        <button style="{(i == 0)?`grid-column:${day.getDay()}`:''}" class="{day.getDate()==date.getDate()?'current':''}">
          <time datetime={day}>{day.getDate()}</time>
        </button>
      {/each}      
    </div>
  </div>
</div>
{/if}
<style>

.calendar {
  width: 100%;
  align-content: center;
}

.calendar-container {    
  z-index: 1000;
  margin: 20px;
  padding: 20px;
  font-size: 2em;  
  width: 360px;
  filter: drop-shadow(2px 2px 4px black);
}

button {
    background: transparent;
    border-color: transparent;
    border-style: solid;
    border-width: 4px;
    border-radius: 14px;
    color: white;
    font-size: .65em;
}

button.current {
  border-color: darkred;
  border-style: solid;
  border-width: 4px;
  border-radius: 14px;
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
  font-size: 0.65em;
  color: white;
  font-weight: 500;
  /*font-variant: small-caps;*/
  text-align: center;
}

/* Dates */
.date-grid {
  margin-top: 0.65em;
}

/* Positioning the first day */
/*.date-grid button:first-child {
  grid-column: 6;
} */   
</style>