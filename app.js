const BASE_URL = "https://v6.exchangerate-api.com/v6/bd691a6603757d44d8f12855/pair/INR/EUR";

const dropdown = document.querySelectorAll(".dropdown select");
const button = document.querySelector("button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");



for(let select of dropdown){
    for(currCode in countryList){
        let newOption = document.createElement("option");
        newOption.innerText = currCode;
        newOption.value = currCode;
        if(select.name === "from" && currCode === "USD"){
            newOption.selected = "selected";
        }
        else if(select.name === "to" && currCode === "INR"){
            newOption.selected = "selected";
        }
        select.append(newOption);
    }
    select.addEventListener("change",(evt)=>{
        updateFlag(evt.target)
    })
}


const updateFlag = (element)=>{
    let currCode  = element.value;
    let countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
}

const updateExchangeRate = async() => {
    let amount = document.querySelector(".amount input"); 
    let amtVal = amount.value;
    if(amtVal === " " || amtVal<1){ 
        amtVal = 1;
        amount.value = "1";
    }
    let URL = `https://v6.exchangerate-api.com/v6/bd691a6603757d44d8f12855/pair/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}`;
    let response = await fetch(URL);
    let data = await response.json();
    let rate = data.conversion_rate;

    let finalAmount = amtVal * rate;
    msg.innerText = `${amtVal} ${fromCurr.value}  = ${finalAmount} ${toCurr.value}`;
}

button.addEventListener("click",(evt)=>{
    evt.preventDefault(); //no page referesing by default 
    updateExchangeRate();
})

window.addEventListener("load",()=>{
    updateExchangeRate();
})

