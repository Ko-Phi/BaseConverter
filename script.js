"strict mode";
let showConsole = true;
const consoleText = document.getElementById("console");
consoleText.value = "";
const wrapNumbers = function (input) {
  // Regular expression to match numbers
  const regex = /(\d+)/g; // Matches one or more digits

  // Replace matching numbers with span elements
  return input.replace(regex, '<span class="highlight">$1</span>');
};
let storedConsoleText = "";
const print = function (message) {
  storedConsoleText = storedConsoleText + wrapNumbers(message) + "<br>";
  console.log(message);
  if (showConsole) {
    consoleText.innerHTML = storedConsoleText;
  }
};
print("Script connected!");
let bytes = 0;
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

//Adds bit swap functionality for each binary button
function handleSwaps(button) {
  print(
    `Flipping value ${button.textContent} in slot ${
      binary.indexOf(button) + 1
    } to ${button.textContent == 0 ? 1 : 0}`
  );

  if (button.textContent == 0) {
    button.textContent = 1;
    //Asign button new class and remove old
    button.classList.add("white-button");
    button.classList.remove("black-button");
  } else {
    button.textContent = 0;
    //Asign button new class and remove old
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
  print(`Current binary list: ${tempBinaryList}`);
};

const deciInput = document.getElementById("deci-input");
deciInput.value = "";
const deciClearButton = document.getElementById("deci-clear-button");
deciClearButton.addEventListener("click", function () {
  print("Clearing decimal input...");
  deciInput.value = "";
});

const convertButton = document.getElementById("convert-button");

const binaryClearButton = document.getElementById("binary-clear-button");

const incrementByteButton = document.getElementById("increment-byte");

const incrementByte = function () {
  bytes++;
  print(`There are now ${bytes} bytes`);

  for (let i = 0; i < 8; i++) {
    let newBit = document.createElement("button");
    newBit.textContent = 0;
    newBit.className = "binary-button";
    if (i === 0) {
      newBit.className = "binary-button end-button-left";
    } else if (i === 7) {
      newBit.className = "binary-button end-button-right";
    }
    binaryButtonList.appendChild(newBit);
  }

  addButtonsToArray();
  addBinarySwapFunc();
};
incrementByte();

incrementByteButton.addEventListener("click", incrementByte);

binaryClearButton.addEventListener("click", function () {
  print("Clearing binary values...");
  //Loop through each binary button to assign new data
  binaryButtons.forEach((button) => {
    button.textContent = "0";
    button.textContent = 0;
    //Asign button new subclass and remove old
    button.classList.add("black-button");
    button.classList.remove("white-button");
  });
});

//Add pin functonality to pin buttons
const defaultPinnedButton = document.getElementById("binary-pin-button");
let currentlyPinned = "";
currentlyPinned = defaultPinnedButton.id;
defaultPinnedButton.classList.add("selected");
defaultPinnedButton.classList.remove("unselected");
pinButtons = document.querySelectorAll(".pin-button");
console.log(`Pin buttons are`);
const addPinFunc = function () {
  pinButtons.forEach((button) => {
    console.log(button);
    button.addEventListener("click", function () {
      if (button.classList.contains("unselected")) {
        button.classList.add("selected");
        button.classList.remove("unselected");
        //Checks if there's an already pinned item
        if (currentlyPinned) {
          print(`Unpinned: ${document.getElementById(currentlyPinned).id}`);
          document.getElementById(currentlyPinned).classList.add("unselected");
          document.getElementById(currentlyPinned).classList.remove("selected");
        }
        currentlyPinned = button.id;
        print(`Pinned: <span class="selector">${button.id}</span>`);
      } else {
        button.classList.add("unselected");
        button.classList.remove("selected");
        currentlyPinned = "";
        print(`Unpinned: <span class="selector">${button.id}</span>
    `);
      }
    });
  });
};
addPinFunc();
print(`Currently pinned: <span class="selector">${currentlyPinned}</span>`);

//Adds functionality to console buttons
showConsole = true;
const consoleHideShow = document.getElementById("console-hideshow");
consoleHideShow.addEventListener("click", function () {
  if (consoleHideShow.classList.contains("unselected")) {
    consoleHideShow.classList.add("selected");
    consoleHideShow.classList.remove("unselected");
    consoleHideShow.innerHTML = '<i class="fa-solid fa-eye-slash"></i>';
    showConsole = false;
    consoleText.innerHTML = "";
    print(`Console hidden`);
  } else {
    consoleHideShow.classList.add("unselected");
    consoleHideShow.classList.remove("selected");
    consoleHideShow.innerHTML = '<i class="fa-solid fa-eye"></i>';
    showConsole = true;
    print(`Console shown`);
  }
});

const consoleClearButton = document.getElementById("console-clear-button");
consoleClearButton.addEventListener("click", function () {
  storedConsoleText = "";
  consoleText.innerHTML = "";
  print("Console cleared!");
});

//Conversion functions
const findBinarySum = function () {
  let binarySum = 0;
  //loop through array to find binary sum
  binary.forEach((value) => {
    binarySum += value.textContent == 1 ? 2 ** binary.indexOf(value) : 0;
    print(
      `Binary slot ${binary.indexOf(value) + 1} is a ${
        value.textContent
      } - Equivalent to: ${
        value.textContent == 1 ? 2 ** binary.indexOf(value) : 0
      } - Current sum: ${binarySum}`
    );
  });
  print(`Binary sum is: ${binarySum}`);
  deciInput.value = binarySum;
};

const deciToBinary = function () {
  print(`Inputted decimal is: ${deciInput.value}`);
  let deciRemaining = deciInput.value;

  if (deciRemaining > 2 ** binary.length - 1) {
    print(`Decimal too big! ${deciRemaining} > ${2 ** binary.length - 1}`);
    alert(`Decimal too big! ${deciRemaining} > ${2 ** binary.length - 1}`);
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
    print(
      `Remaining decimal value: ${deciRemaining} - Current binary: ${currentBinary} (Backwards)`
    );
  }

  print(`Binary for ${deciInput.value} is: ${currentBinary}`);
  binary.forEach((button) => {
    button.textContent = currentBinary[binary.indexOf(button)];

    //Assign new styles
    if (button.textContent == 0) {
      button.classList.remove("black-button");
      button.classList.add("black-button");
      button.classList.remove("white-button");
    } else {
      button.classList.add("white-button");
      button.classList.remove("black-button");
    }
  });
};

const hexaInput = document.getElementById("hexa-input");
hexaInput.value = "";
const hexaClearButton = document.getElementById("hexa-clear-button");
hexaClearButton.addEventListener("click", function () {
  print("Clearing hexa input...");
  hexaInput.value = "";
});
const hexaKey = {
  id10: "a",
  id11: "b",
  id12: "c",
  id13: "d",
  id14: "e",
  id15: "f",
};

const deciToHexa = function () {
  let deciRemaining = deciInput.value;
  let currentHexa = [];
  while (deciRemaining > 0) {
    if (deciRemaining % 16 == 0) {
      currentHexa.push(0);
      deciRemaining = deciRemaining / 16;
    } else {
      if (deciRemaining % 16 > 9) {
        currentHexa.push(hexaKey["id" + (deciRemaining % 16)]);
      } else {
        currentHexa.push(deciRemaining % 16);
      }
      deciRemaining = (deciRemaining - (deciRemaining % 16)) / 16;
    }
    print(
      `Remaining decimal value: ${deciRemaining} - Hex code: ${currentHexa} (Backwards)`
    );
  }
  print(`Current hex is: ${currentHexa} (Backwards) - Flipping hex...`);
  let currentHexaString = "";
  for (let i = currentHexa.length - 1; i >= 0; i--) {
    currentHexaString = currentHexaString + currentHexa[i];
    print(`Current hex is: ${currentHexaString}`);
  }
  print(`Hex code for ${deciInput.value} is: ${currentHexaString}`);
  hexaInput.value = currentHexaString;
};

const hexaKeyReversed = {
  a: 10,
  b: 11,
  c: 12,
  d: 13,
  e: 14,
  f: 15,
  A: 10,
  B: 11,
  C: 12,
  D: 13,
  E: 14,
  F: 15,
};
const hexaToDeci = function () {
  let currentHexa = Array.from(hexaInput.value);
  print(currentHexa);
  for (i = 0; i < currentHexa.length; i++) {
    if (Number(currentHexa[i])) {
      print(`${currentHexa[i]} is a number`);
      currentHexa[i] = Number(currentHexa[i]);
    } else {
      print(`${currentHexa[i]} is not a number`);
      currentHexa[i] = hexaKeyReversed[String(currentHexa[i])];
      print(`New hexa is ${currentHexa[i]}`);
    }
  }
  print(currentHexa);
  let deciSum = 0;
  for (i = 0; i < currentHexa.length; i++) {
    deciSum += currentHexa[i] * 16 ** (currentHexa.length - 1 - i);
    print(
      `Hexa slot ${i} is a ${currentHexa[i]} - Equivalent to: ${
        currentHexa[i] * 16 ** (currentHexa.length - 1 - i)
      } - Current sum is: ${deciSum}`
    );
  }
  deciInput.value = deciSum;
};

//Convert function
convertButton.addEventListener("click", function () {
  listBinary();
  print("Converting...");
  console.log(binary);
  if (currentlyPinned === "binary-pin-button") {
    print("Converting binary to decimal...");
    findBinarySum();
    print("Converting decimal to hexadecimal...");
    deciToHexa();
  } else if (currentlyPinned === "deci-pin-button") {
    print("Converting decimal to binary...");
    deciToBinary();
    print("Converting decimal to hexadecimal...");
    deciToHexa();
  } else if (currentlyPinned === "hexa-pin-button") {
    print("Converting hexadecimal to decimal...");
    hexaToDeci();
    print("Converting decimal to binary...");
    deciToBinary();
  } else {
    print(`Pin input first!`);
  }
});
