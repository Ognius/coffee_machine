function clearDisplay() {
    customScreen.classList.add("disable");
    welcomeScreen.classList.add("disable");
    cookingScreen.classList.add("disable");
    readyScreen.classList.add("disable");
    pinScreen.classList.add("disable");
    serviceScreen.classList.add("disable");
    blockScreen.classList.add("disable");
}

function showWelcomeMenu() {
    if (now_no_active >= no_active_delay & block == false) { 
        clearDisplay();
        welcomeScreen.classList.remove("disable");
   }   
}

function showCustomMenu() {
    customScreen.classList.remove("disable");
    if (cups == 0) {
        noCupsMessage.classList.remove("disable");
        for (let i = 0; i < coffeeButtons.length; i++) {
            coffeeButtons[i].classList.add("disable");
        };
        inputMoney.classList.add("disable");
    }
}

function showCookingMenu() {
    cookingScreen.classList.remove("disable");
}

function showReadyMenu() {
    readyScreen.classList.remove("disable");
}

function showPinMenu() {
    document.querySelector('[data-pin]').value = "";
    pinScreen.classList.remove("disable");
}

function showServiceMenu() {
    updateOutput(serviceBalanceDisplay, serviceBalance);
    updateOutput(cupsDisplay, cups);
    serviceScreen.classList.remove("disable");
}

function showBlockMenu(){
    blockScreen.classList.remove("disable");
    block = true;
}

function addMoney() {
    if (cups < 2) {
        alert(`Please pay attention, ${cups} cup left`);
    }
    var input = parseInt(prompt('Add some money. Please, pay attention, the machine does NOT give a change', 0));
    if (input) {
        customBalance += input;
        serviceBalance += input;
    }    
}

function cookCoffee(){
    pour.classList.add("coffee-medium__liquid-active");
    for (let i = 0; i < smoke.length; i++) {
        smoke[i].classList.add("smoke-active");
    };
    clearDisplay();
    showCookingMenu();
    setTimeout(clearPour, 10000);
    setTimeout(clearDisplay, 9000);
    setTimeout(showReadyMenu, 9000);
    setTimeout(clearDisplay, 14000);
    setTimeout(showCustomMenu, 14000);
    setTimeout(clearSmoke, 14000);
}

function clearPour() {
    pour.classList.remove("coffee-medium__liquid-active");
}

function clearSmoke() {
    for (let i = 0; i < smoke.length; i++) {
        smoke[i].classList.remove("smoke-active");
    };
}

function checkPin() {
    pin = document.querySelector('[data-pin]').value;
    if (pin == pinFactory) {
        document.querySelector('[data-pin]').value = "";
        clearDisplay();
        showServiceMenu();
        return;
    } else {
        if (pinAttempt == 2) {
            document.querySelector('[data-pin]').value = "";
            clearDisplay();
            showBlockMenu();
        } else {
            document.querySelector('[data-pin]').value = "";
            pinAttempt++;
        }

    }
}

function addCups() {
    let input = parseInt(prompt('Add some cups. What number of cups you would like to add?', 0));
    if (input) {
        cups += input;
        updateOutput(cupsDisplay, cups);
    }
}

function withdraw() {
    customBalance = 0;
    serviceBalance = 0;
    updateOutput(customBalanceDisplay, customBalance);
    updateOutput(serviceBalanceDisplay, serviceBalance);
    alert("You have just withdrew the proceeds");
}


function updateOutput(text, data) {
    text.innerHTML = data;
}






function activeUser() {
    now_no_active = 0;
  };



const welcomeScreen = document.querySelector('[data-display-welcome]');
const customScreen = document.querySelector('[data-display-custom]');
const cookingScreen = document.querySelector('[data-display-cooking]');
const readyScreen = document.querySelector('[data-display-ready]');
const pinScreen = document.querySelector('[data-display-pin]');
const serviceScreen = document.querySelector('[data-display-service]');
const blockScreen = document.querySelector('[data-display-block]');
const noCupsMessage = document.querySelector('[data-no-cups]');


const coffeeButtons = document.querySelectorAll('[custom__button]');
console.log(coffeeButtons);
const esprButton = document.querySelector('[data-espresso]');
const cappuchButton = document.querySelector('[data-cappuccino]');
const latteButton = document.querySelector('[data-latte]');
const inputMoney = document.querySelector('[data-input-money]');
const pour = document.getElementById("coffee-medium__liquid");
const smoke = document.querySelectorAll('[data-smoke]');
const backButtons = document.querySelectorAll('[data-back-button]');
const login = document.querySelector('[data-login]');
const pinButton = document.querySelector('[data-pin-button]');
const addCupsButton = document.querySelector('[data-add-cups]');
const withdrawButton = document.querySelector('[data-withdraw]');

const customBalanceDisplay = document.querySelector('[data-custom-balance]');
const serviceBalanceDisplay = document.querySelector('[data-service-balance]');
const cupsDisplay = document.querySelector('[data-cups]');

const costEspr = 1.5;
const costCap = 2.5;
const costLat = 2.5;
const pinFactory = 1234;

var cups = 1;
var customBalance = 0;
var serviceBalance = 0;
var pinAttempt = 0;
var no_active_delay = 30; 
var now_no_active = 0;
var block = false;


welcomeScreen.addEventListener("click", function(){
    clearDisplay();
    showCustomMenu();
});

coffeeButtons.forEach(button => {
    button.addEventListener("click", function() {
        let costChosen = 0;
        switch (button) {
            case esprButton: 
                costChosen = costEspr; 
                break;
            case cappuchButton: 
                costChosen = costCap; 
                break;
            case latteButton: 
                costChosen = costLat; 
                break;
        }
        if (costChosen > customBalance) {
            alert ("Please, add more money")
        } else if (cups < 1) {
            alert ("Sorry, we run out of cups..")
        } else{
            customBalance -= costChosen;
            cups--;
            console.log(cups);
            updateOutput(customBalanceDisplay, customBalance);
            cookCoffee();
        }
      }, false);
});

backButtons.forEach(button => {
    button.addEventListener('click', function() {
        clearDisplay();
        showCustomMenu();
    });
});



inputMoney.addEventListener("click", function(){
    addMoney();
    updateOutput(customBalanceDisplay, customBalance);
});

login.addEventListener("click", function(){
    clearDisplay();
    showPinMenu();
});

pinButton.addEventListener('click', checkPin);

addCupsButton.addEventListener('click', addCups);

withdrawButton.addEventListener('click', withdraw);



/* setInterval("now_no_active++;", 1000); 
setInterval("showWelcomeMenu()", 1000); 
document.onmousemove = activeUser;  */


