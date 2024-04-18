let startTime = 9;
let endTime = 21;

const dayArray = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

document.addEventListener('DOMContentLoaded', makeBoxes());

function makeBoxes(){

    // Get the week container element
    const container = document.querySelector('.weekContainer');

    //Generate day within week container
    for (day in dayArray){

        //Create new day
        const newDay = document.createElement('div');
        newDay.className = 'day';
        newDay.id = dayArray[day];
        container.append(newDay);

        //Create heading of day
        const dayHeader = document.createElement('div');
        dayHeader.className = 'dayHeader';
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

                //Append quarter to hour container
                newHour.appendChild(quarterContainer);
            }
        }

    }
  };
  