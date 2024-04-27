/*
    The Plan-It project is intended to help people who like planning 
    BUT are not good with time succeed. 

    Author: Marilyn Zhang
*/

//Variables that will be set by user
//Note that time variables are taken in as 24 hour time but displayed as 12 hour time
let startTime = 9;  //start of "most productive hours"
let endTime = 15; //End of "most productive hours"
//note that (endTime - startTime + 1)*4 -1 is the max quarter number for each day
let taskLimit = 5; //max amount of tasks user can add

//Variables that track tasks
let taskNum = 0; //tracks the number of tasks + next task ID to be assigned
let whichTaskNumSelected; //tracks the current task that the user has clicked on based on its task number id
let isTaskSelected = false;

//Color Variables
const backgroundColor = window.getComputedStyle(document.body).backgroundColor; //get background color
console.log(backgroundColor);
const colorArray = ['rgb(118, 218, 113)', 'rgb(113, 207, 218)']; //simplified colorArray
//Arrays of information. 
const dayArray = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
//const dayArray = ['S', 'M', 'T', 'W', 'T', 'F', 'S']; //Optional version of dayArray using single letters for day names
//These arrays are intended to be temporary, and eventually created based on user input
//const colorArray = ['rgb(118, 218, 113)', 'rgb(113, 218, 172)','rgb(113, 207, 218)', 'rgb(113, 155, 218)', 'rgb(115, 113, 218)', 'rgb(192, 113, 218)'];
//const taskNames = ['Make Bed', 'Do Laundry', 'Sweep floor', 'Do Dishes', 'Shower', 'Brush Hair'];

const taskNames = ["Work on Pui", "Plan Social Event"]; //simplified list
/*Note that the ID of the quarter is what many functiond depend on. Quarter IDs are arranged as follows
    Day-Hour-MacroQuarter-NumberOfTasksInBlock-T1-T2-T3-G1-G2-G3

    Where:
        - [0]:Day - what day of the week the quarter is in
        - [1]: Hour - what hour of the day the quarter is in (might be calculatable with floor?)
        - [2]: Macro quarter - what quarter of the day the quarter is
        - [3]: Number of Tasks in Block - A number between 0 and 3 representing how many tasks overlap with that quarter //may remove depending on use of T ID portions
        - [4, 5]: T1 - T2, the task nunmbers corresponding to the tasks overlapping the quarter. Set to tasktNames.length if none. 
*/

/*Code involved in generating calendar*/

//On website load, this line calls the function that generates the calendar. 
document.addEventListener('DOMContentLoaded', makeCalendar);

//Function calls all functions involved in dynamically generating calendar
function makeCalendar(){
    makeTimeKey();
    makeWeek();
}

//Makes time key, the element to the left of the week that labels the dynamically generated hours
function makeTimeKey(){
    // Get the time key container element
    const timeKey = document.querySelector('.time-key');

    //Add header to time key 
    const timeKeyHeader = document.createElement('div');
    timeKeyHeader.className = 'time-header';
    timeKeyHeader.innerText = 'Time';
    timeKey.append(timeKeyHeader);

    //Add hour label for each hour between startTime and endTime, inclusive (using 12 hour time)
    for (h = startTime; h < endTime+1; h++){
        //Create div for current hour
        const newHour = document.createElement('div');
        newHour.className = 'hour-label';

        //Convert 24 hour input into 12 hour time
        if (h <= 12) {
            newHour.innerText = h + ':00 AM';
        }
        else {
            newHour.innerText = h-12 + ':00 PM';
        }
        //Add current hour to hour container
        timeKey.append(newHour);
    }

 }

 //Generates week 
function makeWeek(){

    // Get the week container element
    const container = document.querySelector('.week-container');

    //Generate day within week container
    for (day in dayArray){

        //Create new day
        const newDay = document.createElement('div');
        newDay.className = 'day';
        newDay.id = dayArray[day];
        container.append(newDay);

        //Create heading of day
        const dayHeader = document.createElement('div');
        dayHeader.className = 'day-header';
        dayHeader.innerText = dayArray[day];
        newDay.append(dayHeader);

        //Generate time for day, starting with hours
        //Create container for hours within day
        const hourContainer = document.createElement('div');
        hourContainer.className = 'hour-container';
        hourContainer.id = dayArray[day] + '-hour-container';

        //Add hour container to day 
        newDay.append(hourContainer);

       macroQuarterID  = 0; //the quarter number within the entire day

        //Generate hours
        for (h = startTime; h <= endTime; h++){

            //Create current hour
            const newHour = document.createElement('div');
            newHour.className = 'hour';
            newHour.id = dayArray[day] + '-' + h;

            //Add current hour to hour container
            hourContainer.append(newHour);

            //Generate quarters
            for (q = 0; q < 4; q++){

                //Create current quarter
                const quarterContainer = document.createElement('div');
                quarterContainer.className = 'quarter'; //should assign q based on total q - i.e. the 3nd quarter in the 2nd hour would have q value of (2-1)*4+3
                quarterContainer.id = dayArray[day] + '-' + h + '-' + macroQuarterID + "-" 
                    + 0 //number of tasks within quarter
                    + "-" + taskNames.length + "-" + taskNames.length;

                //Append quarter to hour container
                newHour.appendChild(quarterContainer);
                macroQuarterID++;
            }
        }

    }

     //add event listners to all quarters
     const allQuarters = document.querySelectorAll('.quarter');
   
     allQuarters.forEach(quarter => {
       quarter.addEventListener('click', makeGradient)
     })

  };


/* Code involved in managing tasks */

//Call function to add task when task button is clicked
document.querySelector('#add-task-button').addEventListener('click', addTask);

//Adds task, including setting taskNum, color, and checking that task limit has not been reached
function addTask(){
    //Evaluate if number of tasks is within limit, act accordingly 
    if (taskNum < taskNames.length){ //ideally change taskNames to correspond to var tracking how many tasks user can enter
        
        //Make clone of tasktemplate
        const template = document.querySelector('#task-template');
        const clone = template.content.cloneNode(true);
        const task = clone.querySelector('.task');

        //Assign corresponding values for taskID, task description (task name), and color based on task number
        task.id = 'task-' + taskNum;
        task.innerText = taskNames[taskNum];
        task.style.color = colorArray[taskNum];
        task.style.border = colorArray[taskNum] + ' solid 3px';

        //Call function that clears the task selected
        clearTaskSelected();

        // Update number of tasks + next task ID to be assigned
        taskNum++;

        //Add cloned task to DOM
        const taskManager = document.querySelector('#task-manager');
        taskManager.append(task);

        //Add event listner to new task 
        document.querySelector('#' + task.id).addEventListener('click', updateTaskSelected);
    }
    else {
       atLimit();
    }
  }

  //What happends when task limits are reached - message to console (for now - sends message to console)
  function atLimit(){
    console.log('Task limit reached');
  }

  //Clears taskSelected (+2 to taskNum, making it out of bounds of current task IDs)
  function clearTaskSelected(){
    //Sets is task selected to false
    isTaskSelected = false;
    // console.log(isTaskSelected); //test 
  }

  //Keeps track of which tas is currently selected  - work in progress -
  function updateTaskSelected(event){
    //Connects to id of task that triggered the event 
    isTaskSelected = true;
    let taskInfo = event.target.id.split('-');
    taskSelected = taskInfo[1];
    //console.log(taskInfo);

    //removes adds selected class to clicked task, removes from the rest. 
    const allTasks = document.querySelectorAll('.task');
   
    allTasks.forEach(task => {
        if (task.id === event.target.id) {
            task.classList.add('selected');
            task.style.backgroundColor = task.style.color;
            task.style.color = 'black';
        }
       else if (task.classList.contains('selected')){
            task.style.border = task.style.backgroundColor + " solid 3px";
            task.style.color = task.style.backgroundColor;
            task.style.backgroundColor = 'black';
            task.classList.remove('.selected');
       }
     })

    //Sets task selected equal to the task number associated with the clicked task
    whichTaskNumSelected = taskInfo[1];

    console.log(taskSelected + '' + isTaskSelected); //test if correct taskNumber is being set
  }

  //Makes gradients based on what and how many tasks are nearby, and what task is currently selected
  function makeGradient(event){

    const clickedQuarterID = event.target.id;
    const fullQuarterIDName = event.target.id.split('-');
    //whichTaskNumSelected
    const day = fullQuarterIDName[0];
    const hour = fullQuarterIDName[1];
    const macroQuarterID = fullQuarterIDName[2];
    let task1ID = fullQuarterIDName[4];
    let task2ID = fullQuarterIDName[5];
    const quarterDOMElement = document.getElementById(clickedQuarterID);

    quarterDOMElement.style.backgroundColor = colorArray[whichTaskNumSelected];

    /* Gradient Trial 1 (fix later)

    //changes color of selected quarter to that corresponding to color of the task
    if(quarterDOMElement.classList.contains('gradient0') || quarterDOMElement.classList.contains('gradient1') ) //makes sure added task is atleast 1 quarters/15 minutes away from core of next task
    {}

    } else 
    {
        quarterDOMElement.style.backgroundColor = colorArray[whichTaskNumSelected];

        //IDs of quarters n (1-2_ above (a) and below (b)
        const firstNumAbove = macroQuarterID-1:
        const secondNumAbove = firstNumAbove-1;
        const firstNumBelow = macroQuarterID+1:
        const secondNumBelow = firstNumBelow+1;
        const target2A = day + "-" + hour + "-" + firstNumAbove + ""
        const target1A
        const target1B
        const target2B
    }
    */

    
    /* correct logic later
    //Logic checks to see if task spaces have been filled by another task
    if (task1ID = taskNames.length){
        setGradient1(clickedQuarterID);
    }
        else if (task2ID = taskNames.length) {

        }
            else if (task3ID = taskNames.length) {

            }
                else {
                    atLimit();
                }

    //console.log(macroQuarterID + "-" + whichTaskNumSelected); //test
                */
    
    /*if (taskSelected) {
      event.target.style.backgroundColor = colorArray[taskNum];
      event.
    }*/

    //console.log(quarterHour + ' ' + quarterID + ' ' + quarterMacroId); //test 
  }

 
  function setGradient1(clickedQuarterID){
    //Get quarters impacted by change, on above quarter clicked
    //Check if quarters above are within quarter bounds
    document.getElementById('#' + clickedQuarterID).backgroundColor = colorArray[whichTaskNumSelected];
    if (macroQuarterID-1 >= 0){ //Check if quarter directly above is within bounds
        //if (macroQuarterID-2 >= 0){ //Check if quarter two rows above is within bounds
    }
    //Get quarters impacted by change, on below quarter clicked
    //Check if quarters below are within quarter bonds
  }
  