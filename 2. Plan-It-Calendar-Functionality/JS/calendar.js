/*
    The Plan-It project is intended to help people who like planning 
    BUT are not good with time succeed. 

    Author: Marilyn Zhang
*/

//Variables that will be set by user
//Note that time variables are taken in as 24 hour time but displayed as 12 hour time
let startTime = 6;  //start of "most productive hours"
let endTime = 11; //End of "most productive hours"
//note that (endTime - startTime + 1)*4 -1 is the max quarter number for each day
let taskLimit = 5; //max amount of tasks user can add

//Variables that track tasks
let taskNum = 0; //tracks the number of tasks + next task ID to be assigned
let whichTaskNumSelected; //tracks the current task that the user has clicked on based on its task number id
let isTaskSelected = false;

//Color Variables
const backgroundColor = window.getComputedStyle(document.body).backgroundColor; //get background color
const colorArray = ['rgb(118, 218, 113, 1)', 'rgb(113, 207, 218, 1)']; //simplified colorArray
const colorRGBArray = [118, 218, 113, 113, 207, 218]; 
const gradientAlpha = [1, 0.5, 0.25];
const color1and2Mix = ['rgb(118, 218, 113, 1)', 'rgb(117,216,134)', 'rgb(116,214,155)', 'rgb(115,211,176)', 'rgb(114,209,197)', 'rgb(113, 207, 218, 1)']
//Arrays of information. 
const dayArray = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
//const dayArray = ['S', 'M', 'T', 'W', 'T', 'F', 'S']; //Optional version of dayArray using single letters for day names
//These arrays are intended to be temporary, and eventually created based on user input
//const colorArray = ['rgb(118, 218, 113)', 'rgb(113, 218, 172)','rgb(113, 207, 218)', 'rgb(113, 155, 218)', 'rgb(115, 113, 218)', 'rgb(192, 113, 218)'];
//const taskNames = ['Make Bed', 'Do Laundry', 'Sweep floor', 'Do Dishes', 'Shower', 'Brush Hair'];

const taskNames = ['Work on Pui', 'Plan Social Event']; //simplified list
/*Note that the ID of the quarter is what many functiond depend on. Quarter IDs are arranged as follows
    Day-Hour-MacroQuarter-NumberOfTasksInBlock-T1-T2-T3-G1-G2-G3

    Where:
        - [0]:Day - what day of the week the quarter is in
        - [1]: Hour - what hour of the day the quarter is in (might be calculatable with floor?)
        - [2]: Macro quarter - what quarter of the day the quarter is
*/

/*Code involved in generating calendar*/

//On website load, this line calls the function that checks the dimensions of the webpage. 
document.addEventListener('DOMContentLoaded', checkDimensions);

//On website resize, this line calls the function that checks the dimensions of the webpage. 
document.addEventListener('resize', checkDimensions);

//Function checks if the page is wide screen or narrow and calls the corrsponding functions to create differently formatted calendar
function checkDimensions(){
    if (screen.width > 1000){
        makeCalendar();
    } else {
        makeCalendarCarosuel();
       }
}

//Function calls all functions involved in dynamically generating calendar for wider screen
function makeCalendar(){
    makeTimeKey();
    makeWeek(true);
}

//Function calls all functions involved in dynamically generating calendar for smaller
//Fix later
function makeCalendarCarosuel(){
   makeWeek(false); 
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
function makeWeek(hasTime){

    // Get the week container element
    const container = document.querySelector('.calendar-container');

    //Generate day within week container
    for (day in dayArray){

        makeDay(day, hasTime);

    }

     //add event listners to all quarters
     const allQuarters = document.querySelectorAll('.quarter');
   
     allQuarters.forEach(quarter => {
       quarter.addEventListener('click', makeGradient)
     })
};

  //makes each day 
function makeDay(day, hasTime){

    //Create new day
    const newDay = document.createElement('div');
    newDay.className = 'day';
    newDay.id = dayArray[day];
    document.querySelector('.calendar-container').append(newDay);

    //Create heading of day
    const dayHeader = document.createElement('div');
    dayHeader.className = 'day-header';
    dayHeader.innerText = dayArray[day];
    newDay.append(dayHeader);

    //Generate time for day, starting with hours
    //Create container for hours within day
    const quarterContainer = document.createElement('div');
    quarterContainer.className = 'quarter-container';
    quarterContainer.id = dayArray[day] + '-quarter-container';

    //Add hour container to day 
    newDay.append(quarterContainer);

    macroQuarterID  = 0; //the quarter number within the entire day

     //Generate quarters
     for (q = 0; q <= (endTime - startTime + 1)*4 -1; q++){

            //Create current quarter
            const quarter = document.createElement('div');
            quarter.className = 'quarter'; //should assign q based on total q - i.e. the 3nd quarter in the 2nd hour would have q value of (2-1)*4+3
            quarter.id = dayArray[day] + '-' + h + '-' + macroQuarterID;

            //Append quarter to hour container
            if (q % 4 === 0 && !hasTime){
                const hour = Math.floor(h/4);
                if (hour <= 12) {
                    quarter.innerText = hour + ':00 AM';
                }
                else {
                    quarter.innerText = hour-12 + ':00 PM';
                }
            }
            quarterContainer.appendChild(quarter);
            macroQuarterID++;
        }
    }

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
            task.style.border = task.style.backgroundColor + ' solid 3px';
            task.style.color = task.style.backgroundColor;
            task.style.backgroundColor = 'black';
            task.classList.remove('.selected');
       }
     })

    //Sets task selected equal to the task number associated with the clicked task
    whichTaskNumSelected = taskInfo[1];
  }

  //Makes gradients based on what and how many tasks are nearby, and what task is currently selected
  function makeGradient(event){
    
    event.target.style.backgroundColor = colorArray[whichTaskNumSelected];
    const fullQuarterIDName = event.target.id.split('-');
    const day = fullQuarterIDName[0];
    const hour = fullQuarterIDName[1];
    const macroQuarter = parseInt(fullQuarterIDName[2]);

     //Define gradient values

    //Act according to what is already in the gradient
     for (gradient in gradientAlpha){
        if (event.target.classList.contains(gradient)){
            console.log('bonk');
        }
        else {

            //Gets each quarter within 2 neighbors of the clicked quarter
            for (let relQuarter = -2; relQuarter < 3; relQuarter++){
            
                //Gets neighboring quarter's information
                const quarterNeighbor = macroQuarter + parseInt(relQuarter);
                const quarterNeighborID = day + '-' + hour + '-' + quarterNeighbor;
                const quarterNeighborDOM = document.getElementById(quarterNeighborID)
                //console.log(quarterNeighborDOM.classList); //test which quarters are being accessed

                if(quarterNeighborDOM){
                    //set
                    quarterNeighborDOM.style.backgroundColor = 'rgba(' + colorRGBArray[3*whichTaskNumSelected] + ',' + colorRGBArray[3*whichTaskNumSelected+1] + ',' + colorRGBArray[3*whichTaskNumSelected+2] + ',' + gradientAlpha[Math.abs(relQuarter)] + ')';
                    
                    //add class markers based on alphas of newly generated gradient
                    quarterNeighborDOM.classList.add(gradientAlpha[Math.abs(relQuarter)]);
                }
            }   
         }
    }
  }
