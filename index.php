<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>
<style>
h1 {
  color: #333;
  font-size: 1.3em;
  text-align: center;
  font-family:'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
  position: absolute;
  top: 17%;
  left: 50%;
  transform: translate(-50%,-50%);
}
.btn {
  display: inline-block;
  background-color: #5ec576;
  font-size: 1rem;
  font-weight: 500;
  font-family: inherit;
  position: absolute;
  top: 30%;
  left: 50%;
  transform: translate(-50%,-50%);
  align-items: center;
  justify-content: center;
  padding: 1rem 3rem;
  border-radius: 10rem;
  cursor: pointer;
  transition: all 0.3s;
  text-decoration: none;
  color: #333;
}

.btn:hover {
  background-color: #4bbb7d;
}
</style>

<?php
function getData(){
$connection = new mysqli("localhost","root","","crypto");
$sql = "INSERT INTO `customers`(`name`, `ac`, `user`,`pass`) VALUES ('".$_POST['name']."','".$_POST['acc']."','".$_POST['user']."' ,'".$_POST['pass']."')";
if($connection->query($sql)) echo "<h1>You have been registered successfully</h1> <br/> <a href = './login.html' class = 'btn'>Login Now</a>";
else echo "did not connect";
}
if ( isset($_POST['submit']) ){
getData();
}
header("Location: login.html");
 exit();
?>

</body>
</html>