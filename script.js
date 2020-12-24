const buttons = document.querySelectorAll('[menu__display__button]');
const pour = document.getElementById("coffee-medium__liquid")

buttons.forEach(button => {
    button.addEventListener("click", function() {
        pour.classList.add("coffee-medium__liquid-active");
        console.log("works");
        setTimeout(clear, 10000);
        /* animation.play(); */
      }, false);
});

function clear() {
    pour.classList.remove("coffee-medium__liquid-active");
}