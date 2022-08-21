const intialPriceELe = document.querySelector("#initialPrice");
const quantityEle = document.querySelector("#quantity");
const currentPriceEle = document.querySelector("#currentPrice");
const tellMeBtn = document.querySelector("#tellMe");
const message = document.querySelector("#message");
const output = document.querySelector(".output-div");

function updateOutputDivWOBG() {
  output.style["borderRadius"] = "0px";
  output.style.border = "none";
  output.style.padding = "inherit";
  output.style["color"] = "black";
  output.style["fontWeight"] = "normal";
  output.style["fontSize"] = "normal";
  output.style["backgroundColor"] = "white";
}

function updateOutputDivBG(coolor, fontCoolor) {
  output.style["borderRadius"] = "10px";
  output.style.border = "5px solid black";
  output.style.padding = "2rem 1rem";
  output.style["color"] = fontCoolor;
  output.style["fontWeight"] = "bold";
  output.style["fontSize"] = "large";
  output.style["backgroundColor"] = coolor;
}

function noLossNoProfit(message) {
  updateOutputDivBG("#f9c74f", "black");
  sendUpdate(message);
}

function lossMessage(loss, lossPercentage) {
  let message = `Your loss is ${loss} and loss percentage is ${lossPercentage}% `;
  let coolor = "#";

  if (lossPercentage < 26) {
    coolor += "dc2f02";
    message += "😶";
  } else if (lossPercentage < 51) {
    coolor += "d00000";
    message += "😟";
  } else if (lossPercentage < 76) {
    coolor += "9d0208";
    message += "😰";
  } else {
    coolor += "6a040f";
    message += "😭";
  }
  updateOutputDivBG(coolor, "white");
  sendUpdate(message);
}

function profitMessage(profit, proftPercentage) {
  let message = `Your profit is ${profit} and profit percentage is ${proftPercentage}% `;
  let coolor = "#";

  if (proftPercentage > 75) {
    coolor += "007200";
    message += "💸 🤭";
  } else if (proftPercentage > 50) {
    coolor += "008000";
    message += "💸 😍";
  } else if (proftPercentage > 25) {
    coolor += "38b000";
    message += "💸 😂";
  } else {
    coolor += "70e000";
    message += "💸  😄";
  }

  updateOutputDivBG(coolor, "black ");
  sendUpdate(message);
}

function calculateProfitandLoss(intialPrice, currentPrice, quantity) {
  let costPrice = parseToFloat(intialPrice.value);
  let sellingPrice = parseToFloat(currentPrice.value);

  quantity = Number(quantity.value);

  if (costPrice > sellingPrice) {
    let loss = parseToFloat(costPrice - sellingPrice);
    let lossPerc = parseToFloat((loss / costPrice) * 100);
    let totalLoss = parseToFloat(loss * quantity);
    lossMessage(totalLoss, lossPerc);
  } else if (sellingPrice > costPrice) {
    let profit = parseToFloat(sellingPrice - costPrice);
    let profitPerc = parseToFloat((profit / costPrice) * 100);
    let totalProfit = parseToFloat(profit * quantity);
    profitMessage(totalProfit, profitPerc);
  } else {
    noLossNoProfit("You made no loss 😑 no profit 👌");
  }
}

function parseToFloat(value) {
  return Number(parseFloat(value).toFixed(2));
}

function sendUpdate(msg) {
  message.innerText = msg;
}

function isZeroOrNegative(ele) {
  sendUpdate("");
  let val = parseToFloat(ele.value);
  if (val === 0) {
    updateOutputDivWOBG();
    sendUpdate(`${ele.name} can not be zero.`);
    ele.value = "";
    return true;
  }

  if (val < 0) {
    updateOutputDivWOBG();
    sendUpdate(`${ele.name} can not be negative number.`);
    ele.value = "";
    return true;
  }

  return false;
}

function isFloat(ele) {
  sendUpdate("");
  let n = parseToFloat(ele.value);
  let res = n % 1 !== 0; //Number(n) === n &&
  if (!res) {
    return false;
  }
  updateOutputDivWOBG();
  sendUpdate(`${ele.name} can only be a whole number.`);
  ele.value = "";
  return true;
}

function isEmptyOrNan(ele) {
  sendUpdate("");
  let val = parseToFloat(ele.value);
  if (!isNaN(val)) {
    return false;
  }
  updateOutputDivWOBG();
  sendUpdate(`${ele.name} cannot be empty.`);
  ele.value = "";
  return true;
}

function tellMe() {
  sendUpdate("");
  updateOutputDivWOBG();
  let intialPrice = intialPriceELe;
  let quantity = quantityEle;
  let currentPrice = currentPriceEle;

  if (!isEmptyOrNan(intialPrice)) {
    if (!isZeroOrNegative(intialPrice)) {
      if (!isEmptyOrNan(quantity)) {
        if (!isZeroOrNegative(quantity)) {
          if (!isFloat(quantity)) {
            if (!isEmptyOrNan(currentPrice)) {
              if (!isZeroOrNegative(currentPrice)) {
                calculateProfitandLoss(intialPrice, currentPrice, quantity);
              }
            }
          }
        }
      }
    }
  }
}

tellMeBtn.addEventListener("click", tellMe);
