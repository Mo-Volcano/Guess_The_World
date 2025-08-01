//setting game name
let gessName= "Guess The World";
document.title=gessName
document.querySelector("h1").innerHTML = `${gessName}`
document.querySelector("footer").innerHTML =`${gessName} Created By Volcano`
//game settings
let numbersOfTries = 6;
let numbersOfLetters = 6
let currentTry = 1;
let numberOfHint = 2
//manage world 
let worldToGuess = ""
const words = ["create", "Update", "Delete", "Master", "Elzero","winnner"]
worldToGuess = words[Math.floor(Math.random() * words.length)].toLowerCase()
let messageArea = document.querySelector(".message")

// mange hint
document.querySelector(".hint span").innerHTML = numberOfHint
const getHintButton = document.querySelector(".hint")
getHintButton.addEventListener("click",getHint)
// 
function generateInput(){
const inputsContainer = document.querySelector(".inputs");

for(let i =1 ; i <= numbersOfTries; i++ ){
const tryDiv = document.createElement("div");
tryDiv.classList.add(`try-${i}`);
tryDiv.innerHTML = `<span>Try ${i}</span>`

if(i !== 1 ){
tryDiv.classList.add(`disabled-inputs`);}
//create trees
for(let j = 1 ;j <= numbersOfLetters ;j++){
const input = document.createElement('input');
input.type = "text";
input.id = `guess-${i}-letter-${j}`
input.setAttribute("maxlength" , "1")
tryDiv.appendChild(input);


}



inputsContainer.appendChild(tryDiv);



}
inputsContainer.children[0].children[1].focus()
// disable all inputs
const inputsInDisabledDiv = document.querySelectorAll(".disabled-inputs input")
inputsInDisabledDiv.forEach((input) =>{input.disabled  = true})

// add event lisner to fix oppercase problem
const inputs = document.querySelectorAll("input")

inputs.forEach((input  , index) => {
   
input.addEventListener("input", ()=>{
input.value = input.value.toUpperCase()

const nextInput = inputs[index +1]
if (nextInput){
    nextInput.focus()
}

})
input.addEventListener("keydown", (event)=>{
const currentIndex = Array.from(inputs).indexOf(event.target)



if(event.key  === "ArrowRight"){
const nextInput = currentIndex + 1
if (nextInput < inputs.length){
    inputs[nextInput].focus()
}
}
if(event.key  === "ArrowLeft"){
    const prevInput = currentIndex -1
    if (prevInput >= 0){
        inputs[prevInput].focus()
    }
    }
    })
})

}
//
console.log(worldToGuess)
let guessButton = document.querySelector(".check")
guessButton.addEventListener("click",handleGuesses)

function handleGuesses(){
let successGuess = true

for (let i = 1 ; i <= numbersOfLetters ; i++)
{
 
const inputFiled = document.querySelector(`#guess-${currentTry}-letter-${i}`)
const letter  = inputFiled.value.toLowerCase()
const actullyLetter = worldToGuess[i-1]
console.log(letter)
//game logic 
if (letter === actullyLetter){
inputFiled.classList.add("yes-in-place")

}else if (worldToGuess.includes(letter) && letter !== "" ){
inputFiled.classList.add("not-in-place")
successGuess = false
}else {
    inputFiled.classList.add("no")
    successGuess = false

}

}
//cheack if user win or lose
if (successGuess){
    messageArea.innerHTML = `You win the world is <span> ${worldToGuess} </span>`
    if(numberOfHint === 2){
        messageArea.innerHTML = ` cangratz You Didn't Use Hint the world is <span> ${worldToGuess} </span>`


    }
    // add disable class to all divs
    let allTries = document.querySelectorAll(".inputs > div")
    allTries.forEach((tryDiv) =>{tryDiv.classList.add("disabled-inputs")})
    getHintButton.disabled = true
    guessButton.disabled =true
}else{
    document.querySelector(`.try-${currentTry}`).classList.add("disabled-inputs")
    const currentTryInputs = document.querySelectorAll(`.try-${currentTry} input`)
    currentTryInputs.forEach((input)=>{input.disabled = true})

    currentTry++

   
    const nextTryInputs = document.querySelectorAll(`.try-${currentTry} input`)
    nextTryInputs.forEach((input)=>{input.disabled = false})

    let el = document.querySelector(`.try-${currentTry} `)
    if(el){
        document.querySelector(`.try-${currentTry}`).classList.remove(`disabled-inputs`)
        el.children[1].focus()
    }
    else{
guessButton.disabled = true
getHintButton.disabled = true
messageArea.innerHTML = `You lose and the world is <span> ${worldToGuess} </span>`


    }
}
}

function getHint(){
if(numberOfHint > 0){
numberOfHint --
document.querySelector(".hint span").innerHTML = numberOfHint
}
if( numberOfHint === 0){
    getHintButton.disabled = true
}

const enabledInputs = document.querySelectorAll("input:not([disabled])")
console.log(enabledInputs)
const emptyEnabledInputs = Array.from(enabledInputs).filter((input)=>input.value === "")
console.log(emptyEnabledInputs)

if(emptyEnabledInputs.length > 0){
const randomIndex = Math.floor(Math.random() * emptyEnabledInputs.length)
const randomInput = emptyEnabledInputs[randomIndex]
const indexToFill = Array.from(enabledInputs).indexOf(randomInput)
console.log(indexToFill)

if (indexToFill !== -1){
randomInput.value = worldToGuess[indexToFill].toUpperCase();
console.log(randomInput);
}
}



}

function handleBackSpace(event){
if(event.key === "Backspace"){
    const inputs = document.querySelectorAll("input:not([disabled])");
const currentIndex = Array.from(inputs).indexOf(document.activeElement)

if(currentIndex > 0){
// inputs[currentIndex -1].focus()
const currentInput = inputs[currentIndex]
const prevInput = inputs[currentIndex -1]
currentInput.value = ""
prevInput.value =""
prevInput.focus()
}



}
}
document.addEventListener("keydown",handleBackSpace)

window.onload = function (){

    generateInput()
}