/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Comments should be present at the beginning of each procedure and class.
 * Great to have comments before crucial code sections within the procedure.
*/

/**
 * Define Global Variables
 * 
*/

// Define Navigation Title
const sectionHeading = document.querySelectorAll("[data-nav]");

//Define Menu Link 
const navigation = document.getElementsByClassName("menu__link");

/**
 * End Global Variables
 * Start Helper Functions
 * 
*/

// Function to find out whether section in the viewport
function isSectionInViewport(section) {
    const rect = section.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

//Function to highlight the last clicked Navigation section
function toggleHighlight(c) {
    let cells = c.parentElement.parentElement.getElementsByTagName('li');
    for (let i in cells) {
       let cell = cells.item(i);
       cell.style.cssText = (cell != c) ? "" : "background: #9289da; color: #fff; transition: ease 0.3s all;";
    }
}

//Function to create array of HTML elements
function createArray(a){
    let aL = a.length;
    let values = [];
    for(i = 0; i < aL; i++ ){
        values.push(a[i]);
    }    
    return values
}

/**
 * End Helper Functions
 * 
 * 
*/

// Build Navigation Menu
for (let heading of sectionHeading) {
    //Define nav bar ul
    const navList = document.getElementById("navbar__list");
    //For each sections data-nav attribute create a li
    const newLi = document.createElement("li");
    //Add the text content of the data-nav as the heading
    let text = heading.getAttribute("data-nav"); 
    newLi.textContent = text;
    //Add attribute for styling
    newLi.setAttribute("class", "menu__link");
    //Append to the ul
    navList.appendChild(newLi);
}

// Add class 'active' to section when in the viewport
document.addEventListener("scroll", function(){
    for (let section of sectionHeading) {
        if (isSectionInViewport(section) === true) {
            section.setAttribute("class", "your-active-class");
        } else {
            section.removeAttribute("class");
        }
    }
})

/**
 * 
 * Scroll to anchor ID
 * 
*/

//Function to scroll to correct section on menu link click
function scrollToSection(){

    //Creates array of menu buttons
    const menuArray = createArray(navigation); 

    //Creates array of sections
    const sectionArray = createArray(sectionHeading); 

    for (let i = 0; i < menuArray.length; i++) {
            for (let j = 0; j < sectionArray.length; j++) {

                //Gets index of each array
                let menuIndex = i; 
                let sectionIndex = j;

                //If index matches up then scroll to the section on click
                if(menuIndex == sectionIndex) { 
                    menuArray[i].addEventListener("click", function() { 
                        sectionArray[j].scrollIntoView({behavior: "smooth"});
                    }) 
                    
                    //For each section in the viewport menu item highlights
                   document.addEventListener("scroll", function() {
                        if(isSectionInViewport(sectionArray[j]) === true) {
                            toggleHighlight(menuArray[i]);
                        }
                    })
                }
            }
        }  
    }

//Call Function to active menu scrolling
scrollToSection();

//Define header section
let header = document.getElementById("navbar__list");

//Function to hide navigation header when scrolling, check every second
setInterval(function hideHeader(){
    document.addEventListener("scroll", function() {
    header.style.cssText = "display: none; transition: ease 0.3s all;";
    })
    header.style.cssText = "display: block; transition: ease 0.3s all;";
}, 1000);

//Scroll to top button

//Define button
let scrollButton = document.getElementById("button");

//Add Event listener for to start function when scrolling
document.addEventListener("scroll", scrollFunction)

//When document is scrolled by 400px, show button
function scrollFunction() {
  if (document.body.scrollTop > 400 || document.documentElement.scrollTop > 400) {
    scrollButton.style.display = "block";
  } else {
    scrollButton.style.display = "none";
  }
}

// When the user clicks on the button, scroll to the top of the document
function scrollToTop() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}

//Make sections collapsable 
const collapse = document.getElementsByClassName("collapsible");
const coll = createArray(collapse);
for (let i = 0; i < coll.length; i++){
    coll[i].addEventListener("click", function() {
        this.classList.toggle("active");
        let content = this.nextElementSibling;
        if (content.style.display === "block") {
          content.style.display = "none";
        } else {
          content.style.display = "block";
        }
})}