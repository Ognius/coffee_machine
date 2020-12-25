function clearDisplay() {
    customScreen.classList.add("disable");
    welcomeScreen.classList.add("disable");
}

function showWelcomeMenu() {
    if (now_no_active >= no_active_delay) { 
        clearDisplay();
        welcomeScreen.classList.remove("disable");
   }   
}


function showCustomMenu() {
    customScreen.classList.remove("disable");
}

function addMoney() {
    var input = parseInt(prompt('Add some money. Please, pay attention, the machine does NOT give a change', 0));
    if (input) {
        customBalance += input;
    }    
}

function cookCoffee(){
    pour.classList.add("coffee-medium__liquid-active");
    setTimeout(clearPour, 9000);
}

function updateOutput(text, data) {
    text.innerHTML = data;
}




function clearPour() {
    pour.classList.remove("coffee-medium__liquid-active");
}

function activeUser() {
    now_no_active = 0;
  };



const welcomeScreen = document.querySelector('[data-display-welcome]');
const customScreen = document.querySelector('[data-display-custom]');

const coffeeButtons = document.querySelectorAll('[custom__button]');
const inputMoney = document.querySelector('[data-input-money]');
const pour = document.getElementById("coffee-medium__liquid");

const customBalanceDisplay = document.querySelector('[data-custom-balance]');

const costEspr = 2;
const costCap = 3;
const costLat = 3;

var customBalance = 0;
var no_active_delay = 30; 
var now_no_active = 0;


coffeeButtons.forEach(button => {
    button.addEventListener("click", function() {
        customBalance -= costCap;
        updateOutput(customBalanceDisplay, customBalance);
        cookCoffee();
      }, false);
});

welcomeScreen.addEventListener("click", function(){
    clearDisplay();
    showCustomMenu();
});

inputMoney.addEventListener("click", function(){
    addMoney();
    updateOutput(customBalanceDisplay, customBalance);
});



/* setInterval("now_no_active++;", 1000); 
setInterval("showWelcomeMenu()", 1000); 
document.onmousemove = activeUser;  */


