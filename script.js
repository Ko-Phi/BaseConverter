"strict mode";
console.log("Script connected!");
let bytes = 1;
let binaryButtonList;

//puts all elements with .binary-button class in div with class .binary into an array
let binaryButtons;
let binary = [];

//loops through all buttons in binaryButtons and adds them to binary[] array
const addButtonsToArray = function () {
  binaryButtonList = document.querySelector(".binary-button-list");
  binaryButtons = binaryButtonList.querySelectorAll(".binary-button");
  binary = [];
  binaryButtons.forEach((button) => {
    binary.unshift(button);
  });
  console.log(binaryButtonList);
  console.log(binaryButtons);
};

addButtonsToArray();

//Flip binary values

function handleSwaps(button) {
  console.log(
    `Flipping value ${button.textContent} in slot ${
      binary.indexOf(button) + 1
    } to ${button.textContent == 0 ? 1 : 0}`
  );

  if (button.textContent == 0) {
    //Asign button new style
    Object.assign(button.style, {
      borderColor: "black",
      backgroundColor: "white",
      color: "black",
    });
    button.textContent = 1;
    //Asign button new subclass and remove old
    button.classList.add("white-button");
    button.classList.remove("black-button");
  } else {
    //Asign button new style
    Object.assign(button.style, {
      borderColor: "white",
      backgroundColor: "black",
      color: "white",
    });
    button.textContent = 0;
    //Asign button new subclass and remove old
    button.classList.add("black-button");
    button.classList.remove("white-button");
  }

  listBinary();
}

const addBinarySwapFunc = function () {
  binaryButtons.forEach((button) => {
    if (binary.indexOf(button) < 8) {
      button.addEventListener("click", () => handleSwaps(button));
    }
  });
};

addBinarySwapFunc();

//Lists all binary values in console
const listBinary = function () {
  let tempBinaryList = [];
  binary.forEach((value) => {
    tempBinaryList.unshift(binary[binary.indexOf(value)].textContent);
  });
  console.log(`Current binary list: ${tempBinaryList}`);
};

const deciInput = document.getElementById("deci-input");
const deciClearButton = document.getElementById("deci-clear-button");

deciClearButton.addEventListener("click", function () {
  console.log("Clearing decimal input...");
  deciInput.value = "";
});

const convertButton = document.getElementById("convert-button");

const binaryClearButton = document.getElementById("binary-clear-button");

const incrementByteButton = document.getElementById("increment-byte");

incrementByteButton.addEventListener("click", function () {
  bytes++;
  console.log(`There are now ${bytes} bytes`);

  for (let i = 0; i < 8; i++) {
    let newBit = document.createElement("button");
    newBit.textContent = 0;
    newBit.className = "binary-button";
    binaryButtonList.appendChild(newBit);
  }

  addButtonsToArray();
  addBinarySwapFunc();
});

binaryClearButton.addEventListener("click", function () {
  console.log("Clearing binary values...");
  //Loop through each binary button to assign new data
  binaryButtons.forEach((button) => {
    button.textContent = "0";
    //Asign button new style
    Object.assign(button.style, {
      borderColor: "white",
      backgroundColor: "black",
      color: "white",
    });
    button.textContent = 0;
    //Asign button new subclass and remove old
    button.classList.add("black-button");
    button.classList.remove("white-button");
  });
});

const findBinarySum = function () {
  let binarySum = 0;
  //loop through array to find binary sum
  binary.forEach((value) => {
    binarySum += value.textContent == 1 ? 2 ** binary.indexOf(value) : 0;
    console.log(
      `Binary slot ${binary.indexOf(value) + 1} is a ${
        value.textContent
      } - Current sum: ${binarySum}`
    );
  });
  console.log(`Binary sum is: ${binarySum}`);
  deciInput.value = binarySum;
};

const deciToBinary = function () {
  console.log(deciInput.value);
  let deciRemaining = deciInput.value;
  if (deciRemaining > 2 ** binary.length - 1) {
    console.log(
      `Decimal too big! ${deciRemaining} > ${2 ** binary.length - 1}`
    );
    return;
  }
  let currentBinary = [];
  for (let i = binary.length - 1; i >= 0; i--) {
    if (deciRemaining % 2) {
      currentBinary.push(1);
      deciRemaining = (deciRemaining - (deciRemaining % 2)) / 2;
    } else {
      currentBinary.push(0);
      deciRemaining = deciRemaining / 2;
    }

    console.log(
      `The remaining decimal value is ${deciRemaining} and the current binary is ${currentBinary} (Backwards)`
    );
  }

  binary.forEach((button) => {
    button.textContent = currentBinary[binary.indexOf(button)];
    if (button.textContent == 0) {
      button.classList.remove("black-button");
      //Asign button new style
      Object.assign(button.style, {
        borderColor: "white",
        backgroundColor: "black",
        color: "white",
      });
      //Asign button new subclass and remove old
      button.classList.add("black-button");
      button.classList.remove("white-button");
    } else {
      //Asign button new style
      Object.assign(button.style, {
        borderColor: "black",
        backgroundColor: "white",
        color: "black",
      });
      //Asign button new subclass and remove old
      button.classList.add("white-button");
    }
  });
};

//Convert function
convertButton.addEventListener("click", function () {
  listBinary();
  console.log("Converting...");
  console.log(binary);
  let binarySum = 0;
  binary.forEach((value) => {
    binarySum += value.textContent == 1 ? 2 ** binary.indexOf(value) : 0;
    console.log(
      `Binary slot ${binary.indexOf(value) + 1} is a ${
        value.textContent
      } - Current sum: ${binarySum}`
    );
  });
  if (binarySum) {
    findBinarySum();
  } else if (deciInput.value) {
    deciToBinary();
  }
});
