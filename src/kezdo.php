<html>
<header>
<title>User Panel</title>
		<link rel="stylesheet" type="text/css" href="../css/admintheme.css">
		<meta charset="UTF-8">
		<link href="favicon.ico" rel="icon" type="image/x-icon" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<meta http-equiv ="Content-Type" content = "text/html;charset=utf-8"/>

</header>

<body onload="myFunction()" style="margin:0;">
<div id="loader"></div>

<div style="display:none;" id="myDiv" class="animate-bottom">




<div class="vertical-menu">
  <a href="../index.php" class="active"><img src="../img/img2.png"  height="50" width="50"> </a>
 </div>
<div class="fenticontainer">
<div class="ido"><?php echo "Az aktuális idő " . date("h:i:sa");?></div>
<h3>Kezdőlap</h3>
</div>
<div class="container">

<?php
		$con=mysqli_connect("127.0.0.1","root","ascent","webtech");
			if (mysqli_connect_errno())
			{
				echo "Failed to connect to MySQL: " . mysqli_connect_error();
			}

			$result = mysqli_query($con,"SELECT * FROM booking ;");

		while($row = mysqli_fetch_array($result))
			{
				
				$stick= 'stick';
			$id=$row['id'];
			$megrendelo = $row['category'];
			$email = $row['price'];
			$telszam = $row ['accountid'];
		

			
echo"	<table class='tablazat'>";	
echo"<tr>";
		echo "<td style='margin: 10px; padding: 8px;'>id: $id</td>";

		
		echo"<td style='margin: 10px; padding: 8px;'>Kategória: $megrendelo</td>";

		echo"<td style='margin: 10px; padding: 8px;'>Ár: $email</td>";
	
		echo"<td style='margin: 10px; padding: 8px;'>Felhasználó szám: $telszam</td>";
		echo"<br>";
	
		echo"</div>";
	echo"</tr>";
			}
	mysqli_close($con);
	?>
	 
	
	
	
</div>

</div>
	</div>
	<script>
var myVar;

function myFunction() {
  myVar = setTimeout(showPage, 3000);
}

function showPage() {
  document.getElementById("loader").style.display = "none";
  document.getElementById("myDiv").style.display = "block";
}
</script>

</html>