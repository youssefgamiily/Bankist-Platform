const account1 = {
  owner: "Jonas Schmedtmann",
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    "2019-11-18T21:31:17.178Z",
    "2019-12-23T07:42:02.383Z",
    "2020-01-28T09:15:04.904Z",
    "2020-04-01T10:17:24.185Z",
    "2020-05-08T14:11:59.604Z",
    "2020-05-27T17:01:17.194Z",
    "2020-07-11T23:36:17.929Z",
    "2020-07-12T10:51:36.790Z",
  ],
  currency: "EUR",
  locale: "pt-PT", // de-DE
};

const account2 = {
  owner: "Jessica Davis",
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    "2019-11-01T13:15:33.035Z",
    "2019-11-30T09:48:16.867Z",
    "2019-12-25T06:04:23.907Z",
    "2020-01-25T14:18:46.235Z",
    "2020-02-05T16:33:06.386Z",
    "2020-04-10T14:43:26.374Z",
    "2020-06-25T18:49:59.371Z",
    "2020-07-26T12:01:20.894Z",
  ],
  currency: "USD",
  locale: "en-US",
};

const accounts = [account1, account2];

const account3 = {
  owner: "Steven Thomas Williams",
  Loggedin: false,
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: `3333`,
};

const account4 = {
  owner: "Sarah Smith",
  Loggedin: false,
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: `4444`,
};

let LogInfo = new Map();

let LoggedUser;

let Name2Initials = function (accounts) {
  accounts.forEach(function (account) {
    let initials = RetInitials(account.owner);
    account.username = initials;
  });
};

//function that takes accounts and edits them to only contain initials "youssef essam gamily" --> "yeg"
let RetInitials = function (str) {
  let retStr = str
    .split(" ")
    .map((name) => name[0])
    .join("")
    .toLowerCase();
  return retStr;
};

Name2Initials(accounts);

let FlagLogin = function (username, accounts) {
  LoggedUser = accounts.find((acc) => acc.username === username);
  console.log(`Logged User is now ${[...Object.entries(LoggedUser)]}`);
  console.log(`${LoggedUser}`);
};

console.log(`Logged User is now ${LoggedUser}`);

const LogOut = () => {
  console.log(`removing attributes now`);
  document.querySelector("#OnSignIn").removeAttribute("style");
  document.querySelector("#OnSignIn").attributes.style.value = "display: none";

  LoggedUser = "";
  document.querySelector("#BalanceVal").innerHTML = `- €`;
};

const ifLogin = function (username, password) {
  password = Number(password);
  console.log(
    `incoming username is ${username} and type of username is ${typeof username} and incoming password is ${password} and type of password is ${typeof password}`
  );
  let foundAcc = accounts.find(
    (acc) => acc.username === username && acc.pin === password
  );
  console.log(`foundAcc is ${foundAcc}`);
  if (foundAcc) {
    console.log(`Login Sucessful! Redirecting ...`);
    FlagLogin(username, accounts);
    return true;
  } else {
    LogOut();
    return false;
  }
};

let Greet = function (user) {
  let greeting = `Hello, ${user.username}`;
  let GreetingParagraph = document.querySelector(".Navbar p");
  GreetingParagraph.innerHTML = greeting;
};

const getLoginInfo = function (e) {
  let username = String(document.querySelector("#username").value);
  let password = document.querySelector("#password").value;
  console.log(`username is ${username} and password is ${password}`);
  ifLogin(username, password);
};

let isOdd = (number) => number % 2 === 0;

let dispMovements = function (movements, transactions, movementsDates) {
  transactions.innerHTML = ``;
  movements.forEach(function (movement, index, array) {
    let date = new Date(movementsDates[index]);
    let isOddStr = isOdd(index) ? `odd` : ``;
    let isEvenStr = isOddStr === "odd" ? "even" : "odd";
    console.log(`isOdd(index) returned ${isOddStr}`);
    let type = movement > 0 ? "deposit" : "withdrawal";
    let html = `<div class="transaction" id="${isOddStr}"> 
    <div class = 'Index_Type' id=${isEvenStr}> ${index + 1} ${type} </div>
    <div id="date">${date.getDate()}/${date.getMonth()}/${date.getFullYear()} </div>
    <div class="Value"> ${movement}</div>
  </div>`;

    transactions.insertAdjacentHTML("afterbegin", html);
  });
};

function calcBalance(movements) {
  const Balance = movements.reduce((acc, curr) => acc + curr, 0);
  console.log(`total balance is ${Balance}`);
  BalanceVal = Balance;
  document.querySelector("#BalanceVal").innerHTML = `${Balance.toFixed(2)} €`;
}

/*Transfer Money Function. Takes username and amount and transfers money from your account to the given username*/
/* Where Am I signed in ? Where am I giving the money to ?*/

let MoneyTransfer = function (username, amount, accounts) {
  if (accounts.includes(username)) {
  }
};

let RetSignedInObj = function (username) {
  for (account of accounts) {
    if (account.username === username) return account;
  }

  return 0;
};

let displayUI = function () {
  let DOMElement = (document.querySelector("#OnSignIn").style.display =
    "block");
  document.querySelector("#OnSignIn").style.opacity = 100;
};

const showSummary = (movements) => {
  let totDeposits = movements
    .filter((element) => element > 0)
    .reduce((acc, curr) => acc + curr, 0);
  let totWithdrawals = movements
    .filter((element) => element < 0)
    .reduce((acc, curr) => acc + curr, 0);

  console.log(`totDeposits is ${totDeposits} `);
  document.querySelector(".AmountIn").innerHTML = totDeposits.toFixed(2);
  document.querySelector(".AmountOut").innerHTML =
    Math.abs(totWithdrawals).toFixed(2);

  const interest = movements
    .filter((mov) => mov > 0)
    .map((deposit) => (deposit * LoggedUser.interestRate) / 100)
    .filter((int, i, arr) => {
      // console.log(arr);
      return int >= 1;
    })
    .reduce((acc, int) => acc + int, 0);

  console.log(`interest is ${interest}`);
  document.querySelector(".InterestAmount").innerHTML = interest.toFixed(2);
};

const showDate = function () {
  let Today = document.querySelector("#dateTod").innerHTML;
  let DateToday = new Date();
  document.querySelector(
    "#dateTod"
  ).innerHTML = `As of ${DateToday.getDate()}/${
    DateToday.getMonth() + 1
  }/${DateToday.getFullYear()}`;
};

window.onload = function () {
  // to start the app when the page has loaded
  const SubmitBtn = document.querySelector(".Submit");
  let transactions = document.querySelector(".transactions");
  let TransferMoneyBtn = document.querySelector("#TransferMoneyBtn");
  let RequestLoanBtn = document.getElementById("RequestLoanBtn");
  let CloseAccountBtn = document.getElementById("CloseAccountBtn");

  SubmitBtn.addEventListener("click", function (event) {
    event.preventDefault(); // to prevent the button default behaviour of refreshing the page from reloading on button click automatically
    getLoginInfo(); // Sign in Done
    console.log(`Logged User is ${LoggedUser}`);
    Greet(LoggedUser);
    displayUI();
    dispMovements(
      LoggedUser.movements,
      transactions,
      LoggedUser.movementsDates
    );
    //calculate balance from movements.
    calcBalance(LoggedUser.movements);
    showSummary(LoggedUser.movements);
    showDate();
  });

  let SendMoney = function (user, amount, accounts) {
    let Receiver = accounts.find((acc) => acc.username === user);
    if (Receiver) Receiver.movements.push(amount);
    console.log(
      `Receiver: ${Receiver} movements is now: ${Receiver.movements}`
    );
  };

  TransferMoneyBtn.addEventListener("click", function (event) {
    let Transferto = document.querySelector("#TransferTo").value.toString();
    let Amount = Number(document.querySelector("#Amount").value);
    event.preventDefault();
    document.querySelector("#TransferTo").value = "";
    document.querySelector("#Amount").value = "";
    console.log(`Transfer to : ${Transferto} of Amount ${Amount}`);
    console.log(`will push ${-1 * Amount} into ${LoggedUser.movements} now`);
    LoggedUser.movements.push(-1 * Amount);
    dispMovements(
      LoggedUser.movements,
      transactions,
      LoggedUser.movementsDates
    );
    SendMoney(Transferto, Amount, accounts);
  });

  RequestLoanBtn.addEventListener("click", function (e) {
    e.preventDefault();
    const LoanVal = document.querySelector(".RequestLoan input").value;
    document.querySelector(".RequestLoan input").value = "";
    console.log(`Loan Value is ${LoanVal} and is now being processed ... `);
    LoggedUser.movements.push(LoanVal);
    setTimeout(
      dispMovements(
        LoggedUser.movements,
        transactions,
        LoggedUser.movementsDates
      ),
      10000
    );
  });

  CloseAccountBtn.addEventListener("click", function () {
    // window.onload = function () {
    let CloseAccUsername = document.getElementById("CloseAccUsername").value;
    let CloseAccPw = document.getElementById("CloseAccPassword").value;
    console.log(
      `closeAcc Username is ${CloseAccUsername} and PW is ${CloseAccPassword}`
    );

    document.getElementById("CloseAccUsername").value = document.getElementById(
      "CloseAccPassword"
    ).value = "";

    if (
      LoggedUser.username === CloseAccUsername &&
      LoggedUser.pin === CloseAccPw
    ) {
      accounts.splice(
        accounts.findIndex((account) => account === LoggedUser),
        1
      );
    }

    LoggedUser = "";
    LogOut();
  });
};
