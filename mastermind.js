const MAX_COMBINATION_LENGTH = 4;

function createCurrentCombination(){
    let newCurrentCombination = [];
    for(let i=0; i<=MAX_COMBINATION_LENGTH-1; i++){
        newCurrentCombination.push("bg-gray");
    }
    return newCurrentCombination;
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

//comprobar que no haya ningún gris
//resetear Current Combination (vuelva a ser todos grises)
function addCurrentCombinationToHistoric(){
    if (validateCurrentCombination(currentCombination)){
        let newHistoricCombination = document.createElement("div");
        newHistoricCombination.classList.add("historic_combination");
        for(let i=0; i<=currentCombination.length-1; i++){
            let newSquareColor = document.createElement("div");
            newSquareColor.classList.add("historic_square");
            newSquareColor.classList.add(currentCombination[i]);
            newHistoricCombination.insertAdjacentElement("beforeend", newSquareColor);
        }
        document.querySelector("#historial").insertAdjacentElement("afterbegin", newHistoricCombination);
        currentCombination = createCurrentCombination();
        resetCurrentCombinationColors(currentCombination);
    } else {
        window.alert("Tu combinación de colores no es válida. Tienes que elegir 4 colores");
    }
    
}


const colorButtons = document.querySelectorAll(".color_option_button");
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