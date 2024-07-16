const MAX_COMBINATION_LENGTH = 4;

function paintCurrentCombination(currentCombination){
    const currentCombinationButtons = document.querySelectorAll(".current_combination_button");
    for(let i=0; i<=currentCombination.length-1; i++){
        currentCombinationButtons[i].classList.remove("bg-gray");
        currentCombinationButtons[i].classList.add(currentCombination[i]);
    }
}


const colorButtons = document.querySelectorAll(".color_option_button");
let currentCombination = [];
for(let i=0; i<=colorButtons.length-1; i++){
    colorButtons[i].addEventListener("click", (event)=>{
        if (currentCombination.length<MAX_COMBINATION_LENGTH) {
            currentCombination.push(event.target.classList[1]);
            paintCurrentCombination(currentCombination);
        }
        
    })
}