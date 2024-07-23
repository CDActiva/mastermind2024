const MAX_COMBINATION_LENGTH = 4;
const COLOR_OPTIONS = ["bg-coral", "bg-yellow", "bg-purple", "bg-black", "bg-green", "bg-blue"];
const MAX_ATTEMPTS = 10;

function createCurrentCombination(){
    let newCurrentCombination = [];
    for(let i=0; i<=MAX_COMBINATION_LENGTH-1; i++){
        newCurrentCombination.push("bg-gray");
    }
    return newCurrentCombination;
}

function createTargetCombination(combinationLength, colorOptions){
    let targetCombination = [];
    let randomIndex; 
    for(let i=0; i<=combinationLength-1; i++){
        randomIndex = Math.floor(Math.random()*colorOptions.length);
        targetCombination.push(colorOptions[randomIndex]);
    }
    return targetCombination;
}



function resetCurrentCombinationColors(currentCombination){
    const currentCombinationButtons = document.querySelectorAll(".current_combination_button");
    for(let i=0; i<=currentCombination.length-1; i++){
        currentCombinationButtons[i].setAttribute("class", "current_combination_button bg-gray");
    }
}

function paintCurrentCombination(currentCombination){
    const currentCombinationButtons = document.querySelectorAll(".current_combination_button");
    for(let i=0; i<=currentCombination.length-1; i++){
        currentCombinationButtons[i].classList.remove("bg-gray");
        currentCombinationButtons[i].classList.add(currentCombination[i]);
    }
}

function validateCurrentCombination(combination){
    let isValidCombination = false;
    let totalOfGreyElementsInCombination = 0;
    for (let i=0; i<=combination.length-1; i++){
        if (combination[i]=="bg-gray") totalOfGreyElementsInCombination++;
    }
    if (totalOfGreyElementsInCombination==0) isValidCombination=true;
    return isValidCombination;
}

function combinationsAreEqual(currentCombination, targetCombination){
    let areCombinationsEqual = true;
    for(let i=0; i<=currentCombination.length-1; i++){
        if (currentCombination[i]!=targetCombination[i]){
            areCombinationsEqual = false;
            break;
        }
    }
    return areCombinationsEqual;
}

//comprobar que no haya ningún gris
//resetear Current Combination (vuelva a ser todos grises)
function addCurrentCombinationToHistoric(){
    if (validateCurrentCombination(currentCombination)){
        console.log(currentCombination);
        let newHistoricCombination = document.createElement("div");
        newHistoricCombination.classList.add("historic_combination");
        for(let i=0; i<=currentCombination.length-1; i++){
            let newSquareColor = document.createElement("div");
            newSquareColor.classList.add("historic_square");
            newSquareColor.classList.add(currentCombination[i]);
            newHistoricCombination.insertAdjacentElement("beforeend", newSquareColor);
        }
        document.querySelector("#historial").insertAdjacentElement("afterbegin", newHistoricCombination);
        numberOfAttempts++;
        const isUserWinner = combinationsAreEqual(currentCombination, targetCombination);
        if (isUserWinner) window.alert("Has ganado, la última combinación era la correcta");
        const isGameOver = numberOfAttempts == MAX_ATTEMPTS;
        if (isGameOver && !isUserWinner) window.alert(`Game Over. La combinación correcta es ${targetCombination}`);
        currentCombination = createCurrentCombination();
        resetCurrentCombinationColors(currentCombination);
        
    } else {
        window.alert("Tu combinación de colores no es válida. Tienes que elegir 4 colores");
    }
    
}


const colorButtons = document.querySelectorAll(".color_option_button");
const targetCombination = createTargetCombination(MAX_COMBINATION_LENGTH, COLOR_OPTIONS);
console.log(targetCombination);
let numberOfAttempts = 0;
let currentCombination = createCurrentCombination();
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

document.querySelector("#confirm_current_combination").addEventListener("click", addCurrentCombinationToHistoric);