<?php
$link = mysqli_connect("localhost", "root", "ascent", "webtech");
 

if($link === false){
    die("Nem sikerült kapitány. " . mysqli_connect_error());
}
$knev = mysqli_real_escape_string($link, $_REQUEST['knev']);
$vnev = mysqli_real_escape_string($link, $_REQUEST['vnev']);
$mail = mysqli_real_escape_string($link, $_REQUEST['mail']);
$tszam = mysqli_real_escape_string($link, $_REQUEST['tszam']);
$fo = mysqli_real_escape_string($link, $_REQUEST['fo']);
$kat = mysqli_real_escape_string($link, $_REQUEST['szkat']);
$dc = mysqli_real_escape_string($link, $_REQUEST['hosszabb']);


$sql = "INSERT INTO booking (knev, vnev,mail,tszam, fo,kat,dc) VALUES ('$knev', '$vnev','$mail', '$tszam', '$fo','$kat', '$dc')";
if(mysqli_query($link, $sql)){
header( 'Location: ../index.php' );

exit();}
 else{
    echo "Nem sikerült kapitány!. " . mysqli_error($link);
}
 
// Close connection
mysqli_close($link);


?>