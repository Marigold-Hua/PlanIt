document.addEventListener('DOMContentLoaded', function() {
    // Get the container element
    const hour = document.getElementById('hour');
  
    // Create four quarter boxes using a for loop
    for (let q = 0; q < 4; q++) {
      // Create a div element for each box
      const quarter = document.createElement('div');
      quarter.className = 'quarter'; // Apply CSS class to style the box
  
      // Append the box to the container
      hour.appendChild(quarter);
    }
  });