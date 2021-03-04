/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/

//declaring global variables, grabbing from the HTML
let studentItem = document.querySelectorAll(".student-item");
console.log(studentItem)
const studentsPerPage = 10;

//list is the students array , page is the number per page
function showPage(list, page) {
   let startIndex = (page * studentsPerPage) - studentsPerPage;
   let lastIndex = page * studentsPerPage;

   //Loop over items in the list parameter
   for (let i = 0; i < list.length; i++) {
      /* if the index of a list item is >= the index of the first item that should be shown on the page
   && the list item index is <= the index of the last item that should be shown on the page,*/
      if (i >= startIndex && i < lastIndex) {
         list[i].style.display = 'block';
      } else {
         list[i].style.display = 'none';
      }

   }
}


// showPage(studentItem, 1)


const appendPageLinks = (list) => {
   // Determine how many pages are needed for the list by dividing the total number of list items by the max number of items
   let numOfStudents = list.length;
   let total = Math.ceil(numOfStudents / studentsPerPage);
   // create a div, give it the "pagination" class and append to .page div
   let newDiv = document.createElement('div');
   newDiv.className = 'pagination';
   let pageDiv = document.querySelector('.page')
   pageDiv.appendChild(newDiv);

   // add a ul to the pagination div to store the pagination
   let newUl = document.createElement('ul')
   newDiv.appendChild(newUl)
   let linklist = document.getElementsByTagName('a');
   //for every page, add li and a tags with the page number text
   for (let i = 0; i < total; i++) {
      let li = document.createElement('li');
      let link = document.createElement('a');
      newUl.appendChild(li);
   
      link.href = '#';
      link.textContent = i + 1;
      li.appendChild(link);
      
      // add an event listener to each a tag. when they are clicked call the showpage function to display the appropriate page
      link.addEventListener('click', (e) => {
         for(let i = 0; i < linklist.length; i++){
            linklist[i].className = '';
            
         }
           e.target.className = 'active';
          showPage(studentItem, i+1);
      });
   }
      linklist[0].className = 'active';
}
showPage(studentItem, 1);
appendPageLinks(studentItem)