let name1 = document.querySelector('.name').textContent;
let user = document.querySelector('.user').textContent;
let pass = document.querySelector('.pass').textContent;
let acc1 = document.querySelector('.ac').textContent;
let acc2 = parseInt(acc1);
let pass1 = parseInt(pass);
let update = () => {
  return +(Math.random() * (9 - 1 + 1) + 1).toFixed(2);
};
let rate = update();
let mov1 = 100;
let balance = [];
let dates = [];
balance = JSON.parse(sessionStorage.getItem('balance'));

dates = JSON.parse(sessionStorage.getItem('dates'));

if (balance === null && dates === null) {
  balance = [100];
  dates = [new Date().toISOString()];
}
const account1 = {
  owner: name1,
  movements: balance,
  interestRate: rate,
  pin: pass1,
  movementsDates: dates,
  username: user,
  currency: 'ILS',
  locale: 'en-IN',
  account: acc2,
};

const account2 = {
  owner: 'Obi-wan Kenobi',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: rate,
  pin: 2222,

  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2020-07-26T12:01:20.894Z',
  ],
  currency: 'ILS',
  locale: 'en-IN',
  username: 'ob',
  account: 0011223344,
};

const accounts = [account1, account2];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnInput = document.querySelector('.login__input');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnBuy = document.querySelector('.form__btn--buy');
const btnSell = document.querySelector('.form__btn--sell');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputBuyAmount = document.querySelector('.form__input--buy-amount');
const inputSellUsername = document.querySelector('.form__input--user');
const inputSellPin = document.querySelector('.form__input--pin');

// Functions

const formatMovementDate = function (date, locale) {
  const calcDaysPassed = (date1, date2) =>
    Math.round(Math.abs(date2 - date1) / (1000 * 60 * 60 * 24));

  const daysPassed = calcDaysPassed(new Date(), date);

  if (daysPassed === 0) return 'Today';
  if (daysPassed === 1) return 'Yesterday';
  if (daysPassed <= 7) return `${daysPassed} days ago`;

  return new Intl.DateTimeFormat(locale).format(date);
};

const formatCur = function (value, locale, currency) {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
  }).format(value);
};

const displayMovements = function (acc, sort = false) {
  containerMovements.innerHTML = '';

  const movs = sort
    ? acc.movements.slice().sort((a, b) => a - b)
    : acc.movements;

  movs.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';

    const date = new Date(acc.movementsDates[i]);
    const displayDate = formatMovementDate(date, acc.locale);

    const formattedMov = formatCur(mov, acc.locale, acc.currency);

    const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
        <div class="movements__date">${displayDate}</div>
        <div class="movements__value">${formattedMov}</div>
      </div>
    `;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = formatCur(acc.balance, acc.locale, acc.currency);
};

const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = formatCur(incomes, acc.locale, acc.currency);

  const out = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = formatCur(Math.abs(out), acc.locale, acc.currency);

  labelSumInterest.textContent = `${parseFloat(rate)}%`;
};

const updateUI = function (acc) {
  // Display movements
  displayMovements(acc);

  // Display balance
  calcDisplayBalance(acc);

  // Display summary
  calcDisplaySummary(acc);
};

const startLogOutTimer = function () {
  const tick = function () {
    const min = String(Math.trunc(time / 60)).padStart(2, 0);
    const sec = String(time % 60).padStart(2, 0);
    labelTimer.textContent = `${min}:${sec}`;
    if (time === 0) {
      clearInterval(timer);
      labelWelcome.textContent = 'Log in to get started';
      containerApp.style.opacity = 0;
    }

    time--;
  };

  let time = 300;

  tick();
  const timer = setInterval(tick, 1000);

  return timer;
};

// Event handlers
let currentAccount, timer;

//login
btnLogin.addEventListener('click', function (e) {
  e.preventDefault();

  currentAccount = accounts.find(
    acc => acc.username == inputLoginUsername.value
  );

  if (currentAccount?.pin == +inputLoginPin.value) {
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(' ')[0]
    }`;
    containerApp.style.opacity = 100;

    const now = new Date();
    const options = {
      hour: 'numeric',
      minute: 'numeric',
      day: 'numeric',
      month: 'numeric',
      year: 'numeric',
    };

    labelDate.textContent = new Intl.DateTimeFormat(
      currentAccount.locale,
      options
    ).format(now);

    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();

    if (timer) clearInterval(timer);
    timer = startLogOutTimer();

    updateUI(currentAccount);
  }
});

//transfer
btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = +inputTransferAmount.value;
  const receiverAcc = accounts.find(
    acc => acc.username === inputTransferTo.value
  );
  inputTransferAmount.value = inputTransferTo.value = '';

  if (
    amount > 0 &&
    receiverAcc &&
    currentAccount.balance >= amount &&
    receiverAcc?.username !== currentAccount.username
  ) {
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);

    currentAccount.movementsDates.push(new Date().toISOString());
    receiverAcc.movementsDates.push(new Date().toISOString());

    updateUI(currentAccount);
    alert(' Amount transfer completed.');

    clearInterval(timer);
    timer = startLogOutTimer();
    if (currentAccount.username == account1.username) {
      sessionStorage.setItem(
        'balance',
        JSON.stringify(currentAccount.movements)
      );
      sessionStorage.setItem(
        'dates',
        JSON.stringify(currentAccount.movementsDates)
      );
    }
    if (receiverAcc.username == account1.username) {
      sessionStorage.setItem('balance', JSON.stringify(receiverAcc.movements));
      sessionStorage.setItem(
        'dates',
        JSON.stringify(receiverAcc.movementsDates)
      );
    }
  } else {
    alert(' Unable to transfer');
  }
});
// buy
btnBuy.addEventListener('click', function (e) {
  e.preventDefault();

  const amount = Math.floor(inputBuyAmount.value);
  val = Math.floor(amount * rate * 10);
  if (amount > 0) {
    if (
      confirm(
        `₹${val} will be debited from your bank account. Confirm purchase`
      ) == true
    ) {
      setTimeout(function () {
        currentAccount.movements.push(amount);

        currentAccount.movementsDates.push(new Date().toISOString());

        updateUI(currentAccount);
        alert(' Purchase successful! Thank you for your purchase.');

        clearInterval(timer);
        timer = startLogOutTimer();
        if (currentAccount.username == account1.username) {
          sessionStorage.setItem(
            'balance',
            JSON.stringify(currentAccount.movements)
          );
          sessionStorage.setItem(
            'dates',
            JSON.stringify(currentAccount.movementsDates)
          );
        }
      }, 2500);
      inputBuyAmount.value = '';
    } else alert('Transaction Failed');
  }
});
// sell
btnSell.addEventListener('click', function (e) {
  e.preventDefault();

  if (
    inputSellUsername.value == currentAccount.account &&
    +inputSellPin.value == currentAccount.pin
  ) {
    currentAccount.balance = currentAccount.movements.reduce(
      (acc, mov) => acc + mov,
      0
    );
    val = Math.floor(currentAccount.balance * rate * 10);
    currentAccount.movements.push(-currentAccount.balance);
    currentAccount.movementsDates.push(new Date().toISOString());

    updateUI(currentAccount);
    clearInterval(timer);
    timer = startLogOutTimer();
    alert(`₹${val} is successfully credited to your bank account!`);
    if (currentAccount.username == account1.username) {
      sessionStorage.setItem(
        'balance',
        JSON.stringify(currentAccount.movements)
      );
      sessionStorage.setItem(
        'dates',
        JSON.stringify(currentAccount.movementsDates)
      );
    }
  } else {
    alert('Invalid Credentials. Please try again');
  }
  inputSellPin.value = inputSellUsername.value = '';
});
// sort
let sorted = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();

  displayMovements(currentAccount, !sorted);
  sorted = !sorted;
});
