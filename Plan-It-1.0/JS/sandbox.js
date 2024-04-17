const dayArray = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
let startTime = 9;
let endTime = 21

/*
for (const day of dayArray) {
  const 
}
*/
/*
//Call functions to create weekly calendar
createCalendar();

function createCalendar(){

  //get table header element
  const dayHeader = document.querySelector('#calendar');
 
  console.log(dayHeader);
  //Create column headers for each ay of the week
  dayArray.forEach(day => {
    const newTh = document.createElement('th');
    newTh.textContent = day;
    dayHeader.appendChild(newTh);

    for (let hour = startTime; hour < endTime + 1; hour++){
      const newRow = document.createElement('tr');
      const timeCell = document.createElement('td');
      newRow.appendChild(timeCell);

      dayHeader.appendChild(da)
    }
  })

}
*/
createCalendar();

function createCalendar(){
  //Get calendar section 
  const calendar = document.getElementById('calendar');

  //Create four boxes for the four quarters making an hour
  for (let q= 0; q < 4; q++) {

    //Create a div element with quarter class for each quarter
    const quarter = document.createElement('div');
    quarter.className = 'quarter';

    //Append the quarter to the hour
    calendar.appendChild(quarter);
  }
}