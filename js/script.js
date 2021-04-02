//declaring global variables, grabbing from the HTML
let studentItem = document.querySelectorAll(".student-item");
const studentsPerPage = 10;

//Extra Credit
//Create and append a search bar 
let searchDiv = document.createElement('div')
searchDiv.className = "student-search";
let pageHead = document.querySelector(".page-header");
pageHead.appendChild(searchDiv)

//create input field and append to div
let input = document.createElement('input')
input.placeholder = "Search for students...";
searchDiv.appendChild(input);

//create a button and append to div
let btn = document.createElement('button')
btn.innerText = "Search";
searchDiv.appendChild(btn);

//when the search button is clicked filter by student name
btn.addEventListener('click', (e) => {
   let searchValue = input.value;
   searchItem(studentItem, searchValue);

})
//add a keyup eventlistener so as the person types it should search
input.addEventListener('keyup', (e) => {
   let searchValue = input.value;
   searchItem(studentItem, searchValue);

})

//how to filter lists https://www.w3schools.com/howto/howto_js_filter_lists.asp 
function searchItem(list, searchValue) {
   let h3, txtValue, filter, page, div, warning;
   let searchResults = [];
   page = document.querySelector('.page');
   filter = searchValue.toUpperCase();
   for (let i = 0; i < list.length; i++) {
      h3 = list[i].getElementsByTagName('h3')[0];
      txtValue = h3.textContent || h3.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
         searchResults.push(list[i]);
      } else {
         list[i].style.display = 'none';
      }
   }
   showPage(searchResults, 1)
   // if no matches are found by the search, include a message in the HTML to tell the user no matches
   if (searchResults.length < 1 || searchResults === undefined) {
      if (page.children[2].className !== 'warning') {
         div = document.createElement('div');
         div.className = 'warning';
         warning = document.createElement('div');
         warning.textContent = 'No Matches';
         div.appendChild(warning);
         page.appendChild(div);
      }
   } else if (page.children[2].className === 'warning') {
      page.children[2].remove();
   }
   //update the pages to match search results
   document.querySelector('.pagination').remove();
   appendPageLinks(searchResults);
}

//list is the students array , page is the number per page
function showPage(list, page) {
   let startIndex = (page * studentsPerPage) - studentsPerPage;
   let lastIndex = page * studentsPerPage;

   //Loop over items in the list parameter
   for (let i = 0; i < list.length; i++) {
      if (i >= startIndex && i < lastIndex) {
         list[i].style.display = 'block';
      } else {
         list[i].style.display = 'none';
      }

   }
}


//Pagination 

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
         for (let i = 0; i < linklist.length; i++) {
            linklist[i].className = '';

         }
         e.target.className = 'active';
         showPage(studentItem, i + 1);
      });
   }
   linklist[0].className = 'active';
}
showPage(studentItem, 1);
appendPageLinks(studentItem)