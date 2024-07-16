const MAX_COMBINATION_LENGTH = 4;

function createCurrentCombination(){
    let currentCombination = [];
    for(let i=0; i<=MAX_COMBINATION_LENGTH-1; i++){
        currentCombination.push("bg-gray");
    }
    return currentCombination;
}

function paintCurrentCombination(currentCombination){
    const currentCombinationButtons = document.querySelectorAll(".current_combination_button");
    for(let i=0; i<=currentCombination.length-1; i++){
        currentCombinationButtons[i].classList.remove("bg-gray");
        currentCombinationButtons[i].classList.add(currentCombination[i]);
    }
}


const colorButtons = document.querySelectorAll(".color_option_button");
const currentCombination = createCurrentCombination();
for(let i=0; i<=colorButtons.length-1; i++){
    colorButtons[i].addEventListener("click", (event)=>{  
        for(let j=0; j<=currentCombination.length-1; j++){
            if (currentCombination[j]=="bg-gray"){
                currentCombination[j]=event.target.classList[1];
                paintCurrentCombination(currentCombination);
                break;
            }
        }
        //currentCombination.push(event.target.classList[1]); 
    })
}

const currentCombinationButtons = document.querySelectorAll(".current_combination_button");
for(let i=0; i<=currentCombinationButtons.length-1; i++){
    currentCombinationButtons[i].addEventListener("click", (event)=>{
        event.target.classList.remove(currentCombination[i]);
        event.target.classList.add("bg-gray");
        currentCombination[i]="bg-gray";
    })
}