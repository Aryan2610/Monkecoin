<?php
session_start();

if(isset($_SESSION['user']) && isset($_SESSION['pass'])){
?>
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <link rel="shortcut icon" type="image/png" href="/icon.png" />

    <link
      href="https://fonts.googleapis.com/css?family=Poppins:400,500,600&display=swap"
      rel="stylesheet"
    />

    <link rel="stylesheet" href="./css//style.css" />
    <title>Monkecoin</title>
    <script defer src="./js//script.js"> </script>
  </head>
  
  <body>
    <!-- TOP NAVIGATION -->
    <nav>
      <p class="welcome">Log in to get started</p>
      <img src="logo.png" alt="Logo" class="logo" />
      <form class="login" method="post">
        <input
          type="text"
          placeholder="Username"
          class="login__input login__input--user"
        />
  
        <input
          type="password"
          placeholder="Password"
          maxlength="4"
          class="login__input login__input--pin"
        />
        <button name="submit" class="login__btn">&rarr;</button>
      </form>
    </nav>
<div class="hidden">
  <h1 class="name hidden"><?php echo "<p style='opacity:0;'>". $_SESSION['name'] ."</p>";?></h1>
  <h1 class="user hidden"><?php echo "<p style='opacity:0;'>". $_SESSION['user'] ."</p>";?></h1>
  <h1 class="pass hidden"><?php echo "<p style='opacity:0;'>". $_SESSION['pass'] ."</p>";?></h1>
  <h1 class="ac hidden"><?php echo "<p style='opacity:0;'>". $_SESSION['ac'] ."</p>";?></h1>
</div>
    <main class="app">
      <!-- BALANCE -->
      <div class="balance">
        <div>
          <p class="balance__label">Current balance</p>
          <p class="balance__date">
            As of <span class="date">05/03/2037</span>
          </p>
        </div>
        <p class="balance__value">0000₹</p>
      </div>

      <!-- MOVEMENTS -->
      <div class="movements">
        <div class="movements__row">
          <div class="movements__type movements__type--deposit">2 deposit</div>
          <div class="movements__date">3 days ago</div>
          <div class="movements__value">4 000₹</div>
        </div>
        <div class="movements__row">
          <div class="movements__type movements__type--withdrawal">
            1 withdrawal
          </div>
          <div class="movements__date">24/01/2037</div>
          <div class="movements__value">-378₹</div>
        </div>
      </div>

      <!-- SUMMARY -->
      <div class="summary">
        <p class="summary__label">In</p>
        <p class="summary__value summary__value--in">0000₹</p>
        <p class="summary__label">Out</p>
        <p class="summary__value summary__value--out">0000₹</p>
        <p class="summary__label">Exchange Rate</p>
        <p class="summary__value summary__value--interest">0000%</p>
        <button class="btn--sort">&downarrow; SORT</button>
      </div>

      <!-- OPERATION: TRANSFERS -->
      <div class="operation operation--transfer">
        <h2>Transfer coins</h2>
        <form class="form form--transfer">
          <input type="text" class="form__input form__input--to" />
          <input type="number" class="form__input form__input--amount" />
          <button class="form__btn form__btn--transfer">&rarr;</button>
          <label class="form__label">Transfer to</label>
          <label class="form__label">Amount</label>
        </form>
      </div>

      <!-- OPERATION: buy -->
      <div class="operation operation--buy">
        <h2>Buy coins</h2>
        <form class="form form--buy">
          <input type="number" class="form__input form__input--buy-amount" />
          <button class="form__btn form__btn--buy">&rarr;</button>
          <label class="form__label form__label--buy">Amount</label>
        </form>
      </div>

      <!-- OPERATION: SELL -->
      <div class="operation operation--sell">
        <h2>Sell coins</h2>
        <form class="form form--sell">
          <input type="text" class="form__input form__input--user" />
          <input
            type="password"
            maxlength="6"
            class="form__input form__input--pin"
          />
          <button class="form__btn form__btn--sell">&rarr;</button>
          <label class="form__label">Confirm Acc No</label>
          <label class="form__label">Confirm PIN</label>
        </form>
      </div>

      <!-- LOGOUT TIMER -->
      <p class="logout-timer">
        You will be logged out in <span class="timer">05:00</span>
      </p>
    </main>


</table>
  </body>
</html>
<?php
}
else{
  header("Location:login.html");
  exit();
}
?>