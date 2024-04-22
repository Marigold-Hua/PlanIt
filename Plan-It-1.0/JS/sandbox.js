/* 
1. Focus user input: Add task - drag and drop (or), add gradient (hardcode colors for now)
2. Get gradient working
3. Implement transition: Gradient merge 
4. Make calendar responsive (ex: on collapse - days take up whole screen) - time embedded in day
5. Implement projects

Purposes: 
1. Starting small --> build - Step one thing --> add cal
2. Key: *** Fuzzy view of time/deadlines - make people feel better about the way they are productive

Check rubric!!!

APIs and Libraries to Check Out
- 

*/

let startTime = 17;
let endTime = 21;

const dayArray = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

document.addEventListener('DOMContentLoaded', makeCalendar());

//Function calls all functions used to make calendar
function makeCalendar(){

    makeTimeKey();
    makeWeek();
}

//Generates time key
function makeTimeKey(){
    // Get the time key container element
    const timeKey = document.querySelector('.time-key');

    //Add header to time key 
    const timeKeyHeader = document.createElement('div');
    timeKeyHeader.className = 'calHeader';
    timeKeyHeader.innerText = "Time";
    timeKey.append(timeKeyHeader);

    //Add hour label for each out 
    for (h = startTime; h < endTime+1; h++){
        //Create current hour
        const newHour = document.createElement('div');
        newHour.className = 'hourLabel';

        if (h < 12) {
            newHour.innerText = h + ":00 AM";
        }
        else {
            newHour.innerText = h-12 + ":00 PM";
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
        hourContainer.className = 'hourContainer';
        hourContainer.id = dayArray[day] + "-hourContainer";

        //Add hour container to day 
        newDay.append(hourContainer);

        //Generate hours
        for (h = startTime; h < endTime+1; h++){

            //Create current hour
            const newHour = document.createElement('div');
            newHour.className = 'hour';
            newHour.id = dayArray[day] + "-" + h;

            //Add current hour to hour container
            hourContainer.append(newHour);

            //Generate quarters
            for (q = 0; q < 4; q++){

                //Create current quarter
                const quarterContainer = document.createElement('div');
                quarterContainer.className = 'quarter';
                quarterContainer.id = dayArray[day] + "-" + h + "-" + q; 

                //Append quarter to hour container
                newHour.appendChild(quarterContainer);
            }
        }

    }
  };
  