let startTime = 9;
let endTime = 21;

document.addEventListener('DOMContentLoaded', makeBoxes());

function makeBoxes(){
    // Get the container element
    const container = document.querySelector('.weekContainer');

    //Generate 4 Boxes
    for (h = startTime; h < endTime+1; h++){
        const newHour = document.createElement("div");
        container.append(newHour);
        newHour.className = "hour";
        newHour.id = h;
        for (q = 0; q < 4; q++){
            const hourContainer = document.getElementById(h);
            const newBox = document.createElement("div");
            newBox.className = "quarter";
        
            hourContainer.appendChild(newBox);
        }
    }
  };