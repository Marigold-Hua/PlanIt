/*
    The Plan-It project is intended to help people who like planning 
    BUT are not good with time succeed. 

    Author: Marilyn Zhang
*/

//Variables that will be set by user
//Note that time variables are taken in as 24 hour time but displayed as 12 hour time
let startTime = 9;  //start of "most productive hours"
let endTime = 21; //End of "most productive hours"
let projectLimit = 5; //max amount of projects user can add

//Variables that track projects
let projectNum = 0; //tracks the number of projects + next project ID to be assigned -- might be redundant, can probably just use projectNames position but might alsio add extra step to match spot in array with name
let projectSelected; //tracks the current project that the user has clicked on based on its project number id

//Arrays of information. 
const dayArray = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
//const dayArray = ['S', 'M', 'T', 'W', 'T', 'F', 'S']; //Optional version of dayArray using single letters for day names
//These arrays are intended to be temporary, and eventually created based on user input
const colorArray = ['#76da71', '#71daac','#71cfda', '#719bda', '#7371da', '#c071da'];
const projectNames = ['Exercise', 'PUI Project', 'Webtoon', 'Meals', 'Social', 'Research'];


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
                quarterContainer.id = dayArray[day] + '-' + h + '-' + q; 

                //Append quarter to hour container
                newHour.appendChild(quarterContainer);
            }
        }

    }
  };


/* Code involved in managing projects */

//Call function to add project when project button is clicked
document.querySelector('#add-project-button').addEventListener('click', addProject);

//Adds project, including setting projectNum, color, and checking that project limit has not been reached
function addProject(){
    //Evaluate if project is within limit, act accordingly 
    if (projectNum < projectNames.length){ //ideally change projectNames to correspond to var tracking how many projects user can enter
        
        //Make clone of project template
        const template = document.querySelector('#project-template');
        const clone = template.content.cloneNode(true);
        const project = clone.querySelector(".project");

        //Assign corresponding values for projectID, project description (project name), and color based on project number
        project.id = "project-" + projectNum;
        project.innerText = projectNames[projectNum];
        project.style.color = colorArray[projectNum];
        project.style.border = colorArray[projectNum] + ' solid 3px';

        //Call function that clears the project selected
        clearProjectSelected();

        // Update number of projects + next project ID to be assigned
        projectNum++;

        //Add cloned project to DOM
        const projectManager = document.querySelector('#project-manager');
        projectManager.append(project);

        //Add event listner to new project 
        document.querySelector('#'+project.id).addEventListener('click', updateProjectSelected);
    }
    else {
        projectNumAtLimit();
    }
  }

  //What happends when project limit is reached - message to console (for now - sends message to console)
  function projectNumAtLimit(){
    console.log("Project limit reached");
  }

  //Clears projectSelected (+2 to projectNum, making it out of bounds of current project IDs)
  function clearProjectSelected(){
    projectSelected = projectNum + 2;
    //console.log(projectSelected); //check if correct projectNumber is being set
  }

  //Keeps track of which project is currently selected  - work in progress -
  function updateProjectSelected(event){
    //Connects to id of project that triggered the event 
    var projectInfo = event.target.id.split('-');
    //Sets project selected equal to the project number associated with the clicked project
    projectSelected = projectInfo[1];
    //console.log(projectSelected); //check if correct projectNumber is being set
  }
