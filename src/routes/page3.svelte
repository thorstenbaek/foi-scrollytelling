
    <div class="flexcontainer">
   
        <div class="column">This is 1st column</div>
        <div class="column">This is 2nd column</div>
   
    </div>


<style>
           
    div.flexcontainer{
        display: flex;        
    }

    div.column{
        flex: 2;
        padding: 10px;

    }
    div.column:nth-of-type(even){
        flex: 1;                  
    }
            
</style>