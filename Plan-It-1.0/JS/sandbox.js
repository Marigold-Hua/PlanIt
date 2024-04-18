let startTime = 9;
let endTime = 21;

const dayArray = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

document.addEventListener('DOMContentLoaded', makeBoxes());

/*
function makeBoxes(){

    //Generate days
    const weekContainer = document.querySelector('.weekContainer');

    const dayContainer = document.createElement('div');
        dayContainer.className = "day";

        weekContainer.append(dayContainer);


    for(day in dayArray){
        const dayName = dayArray[day];
        
        //Create container for day
        const dayContainer = document.createElement('div');
        dayContainer.className = "day";

        weekContainer.append(dayContainer);


        //Create div for day header
        const dayHeader = document.createElement("div");

    }

    //Generate hours in day

    //Generate quarters in day
}
*/

function makeBoxes(){

    // Get the container element
    const container = document.querySelector('.weekContainer');

    //Generate calendar
    
    //Generate days
    for (day in dayArray){
        
        //Create current day
        const newDay = document.createElement('div');
        newDay.className = 'day';
        newDay.id = day;

        //Create container for hours in day
        const hourContainer = document.createElement('div');
        
        container.append(newDay);

        //Generate hours
        for (h = startTime; h < endTime+1; h++){

            //Create current hour
            const newHour = document.createElement('div');
            newHour.className = 'hour';
            newHour.id = h;
            container.append(newHour);

            //Generate quarters
            for (q = 0; q < 4; q++){

                //Create current quarter
                const hourContainer = document.getElementById(h);
                const newBox = document.createElement('div');
                newBox.className = 'quarter';

                //Append quarter to hour container
                hourContainer.appendChild(newBox);
            }
        }
    }
  };
  