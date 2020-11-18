<?php
session_start();

$DATABASE_HOST = 'localhost';
$DATABASE_USER = 'root';
$DATABASE_PASS = 'ascent';
$DATABASE_NAME = 'webtech';

$con = mysqli_connect($DATABASE_HOST, $DATABASE_USER, $DATABASE_PASS, $DATABASE_NAME);
if ( mysqli_connect_errno() ) {

	die ('Valami nem adja főnök: ' . mysqli_connect_error());
}
if ( !isset($_POST['username'], $_POST['password']) ) {
	die ('!');
}

if ($stmt = $con->prepare('SELECT id, password FROM accounts WHERE username = ?')) {
	
	$stmt->bind_param('s', $_POST['username']);
	$stmt->execute();
	
	$stmt->store_result();
}
if ($stmt->num_rows > 0) {
	$stmt->bind_result($id, $password);
	$stmt->fetch();

	if ($_POST['password'] === $password)  {
		
		session_regenerate_id();
		$_SESSION['loggedin'] = TRUE;
		$_SESSION['name'] = $_POST['username'];
		$_SESSION['id'] = $id;
		echo 'Üdv ' . $_SESSION['name'] . '!';
	
  




		header('Location: kezdo.php');
		

	} else {
		 $message = "Felhasználó vagy a jelszó nem jó próbáld újra.";
  echo $message;
 
  header('Location:../index.php');

	}
} else {
	 $message = "Felhasználó vagy a jelszó nem jó próbáld újra.";
   echo $message; header('Location:../index.php');

}
$stmt->close();