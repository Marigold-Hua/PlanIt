/* 
1. Focus user input: Add task - drag and drop (or form to add task info), add gradient (hardcode colors for now)
2. Get gradient working
3. Implement transition: Gradient merge (in CSS) 
4. Make calendar responsive (ex: on collapse - days take up whole screen) - time embedded in day
5. Implement projects

Purposes: 
1. Starting small --> build - Step one thing --> add cal
2. Key: *** Fuzzy view of time/deadlines - make people feel better about the way they are productive

Check rubric!!!

APIs and Libraries to Check Out
1. Figure out how to integrate with gcal?

/* Testing gradient stuff */

let startTime = 17;
let endTime = 21;
let projectNum = 0;
let projectSelected; //so that whenever projectNum is updated, project select is out of range. 
let projectList;
let taskSelected = false;

const dayArray = ['Sunday'];
//const dayArray = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
const colorArray = ['#76da71', '#FFFFFF'];
const projectNames = ['Task 1', 'Task 2'];

//Call function to generate calendar once webpage loads
document.addEventListener('DOMContentLoaded', makeCalendar);

//Call function to add project when project button is clicked
document.querySelector('#add-project-button').addEventListener('click', addProject);
function makeCalendar(){
    makeWeek();
}

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
        hourContainer.className = 'hourContainer';
        hourContainer.id = dayArray[day] + '-hourContainer';

        //Add hour container to day 
        newDay.append(hourContainer);

        let totalQuarter = 0; //Added total quarter to make it easy to track overall which quarter in the day it is on 

        //Generate hours
        for (h = startTime; h < endTime+1; h++){

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
                quarterContainer.className = 'quarter';
                quarterContainer.id = dayArray[day] + '-' + h + '-' + q + '-' + totalQuarter; 
                totalQuarter++;

                //Append quarter to hour container
                newHour.appendChild(quarterContainer);
            }
        }

    }
    //add event listners to all quarters
    const test = document.querySelectorAll('.quarter');
   
    test.forEach(quarter => {
      quarter.addEventListener('click', testGradient)
    })
  };
  
  function testGradient(event){
    //Connects to id of project that triggered the event 
    var fullQuarterID = event.target.id.split('-');
    var quarterHour = fullQuarterID[1];
    var quarterID = fullQuarterID[2];
    var quarterMacroId = fullQuarterID[3];

    if (taskSelected) {
      event.target.style.backgroundColor = colorArray[projectNum];
      event.
    }

    console.log(quarterHour + " " + quarterID + " " + quarterMacroId);
  }

  /* Functions involved in managing projects */
  
  //Adds project, including associated event listner
  function addProject(){
    //Evaluate if project is within limit
    if (projectNum < colorArray.length){
    //Make clone of project template
        const template = document.querySelector('#project-template');
        const clone = template.content.cloneNode(true);
        const project = clone.querySelector(".project");

        //Change project ID and formatting
        project.id = "project-" + projectNum;

        project.innerText = projectNames[projectNum];
        project.style.color = colorArray[projectNum];
        project.style.border = colorArray[projectNum] + ' solid 3px';
       
        clearProjectSelected();

        projectNum++;

        //Add cloned project to DOM
        const projectManager = document.querySelector('#project-manager');
        projectManager.append(project);

        //Add event listner to new project - work in progress -
        document.querySelector('#'+project.id).addEventListener('click', updateProjectSelected);
        /*
        //Update event listners and project list
        projectList = document.querySelectorAll('.project');
        updateProjectEventListeners();
        */
    }
    else {
        projectLimit();
    }
  }

  //What happends when project limit is reached - message to console (for now)
  function projectLimit(){
    console.log("Project limit reached");
  }

  //Clears projectSelected (+1 to projectNum, making it out of bounds of later logic)
  function clearProjectSelected(){
    taskSelected = false;
  }

  //Keeps track of which project is currently selected  - work in progress -
  function updateProjectSelected(event){

    taskSelected = true;
    var projectInfo = event.target.id.split('-');
    projectSelected = projectInfo[1];
    console.log(projectSelected);
  }
