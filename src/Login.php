<?php
   include("Connect.php");
   session_start();
   
   if($_SERVER["REQUEST_METHOD"] == "POST") {
      // username and password sent from form 
     
      $myusername = mysqli_real_escape_string($dbname,$_POST['username']);
      $mypassword = mysqli_real_escape_string($dbname,$_POST['password']); 
      
      $sql = "SELECT id FROM accounts WHERE username = '$myusername' and pswd = '$mypassword'";
      $result = mysqli_query($dbname,$sql);
      $row = mysqli_fetch_array($result,MYSQLI_ASSOC);
      $active = $row['active'];
      
      $count = mysqli_num_rows($result);
      
      // If result matched $myusername and $mypassword, table row must be 1 row
		
      if($count == 1) {
         session_register("myusername");
         $_SESSION['login_user'] = $myusername;
         
         header("location: ../index.php");
      }else {
         $error = "Your Login Name or Password is invalid";
      }
   }
?>