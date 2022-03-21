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
  </head>
  <body>
    <!-- TOP NAVIGATION -->
    <nav>
      <p class="welcome">Log in to get started</p>
      <img src="logo.png" alt="Logo" class="logo" />
      <form class="login">
        <input
          type="text"
          placeholder="user"
          class="login__input login__input--user"
        />

        <input
          type="text"
          placeholder="PIN"
          maxlength="4"
          class="login__input login__input--pin"
        />
        <button class="login__btn">&rarr;</button>
      </form>
    </nav>
  </body>
</html>
<?php
session_start();
$conn = new mysqli("localhost","root","","crypto");
if(isset($_POST['user']) && isset($_POST['pass'])){
  function validate($data){
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data);
    return $data;
  }
}
$user = validate($_POST['user']);
$pass = validate($_POST['pass']);
if(empty($user)){
    header("Location: login.html?error = User Name is required");
    echo "<h1> User Name is required</h1>";
}
if(empty($pass)){
    header("Location: login.html?error = Password is required");
    echo "<h1> Password is required</h1>";
}
$sql = "SELECT * FROM customers WHERE user = '$user' AND pass = '$pass'";
$result = mysqli_query($conn,$sql);

if(mysqli_num_rows($result) === 1){
    $row = mysqli_fetch_assoc($result);
    if($row['user'] === $user && $row['pass'] === $pass){
        echo "Logged in";
        $_SESSION['user'] = $row['user'];
        $_SESSION['pass'] = $row['pass'];
        $_SESSION['name'] = $row['name'];
        $_SESSION['ac'] = $row['ac'];
        header("Location: wallet.php");
        exit();
    }
}
else{
 header("Location: login.html?error = Invalid User name or password");
 exit();
}

?>


