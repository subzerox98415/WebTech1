function validateForm() {
  var x = document.forms["logF"]["username"].value;
  if (x == "") {
    alert("Name must be filled out");
    return false;
  }
}



function myMap() {
var mapProp= {
  center:new google.maps.LatLng(51.508742,-0.120850),
  zoom:5,
};
var map = new google.maps.Map(document.getElementById("googleMap"),mapProp);
}


function getValue2()
{
	price =0;
	var cat="";
  var x=document.getElementById("category");
  for (var i = 0; i < x.options.length; i++) {
     if(x.options[i].selected){
		 cat=x.options[i].value;
		 
		 if(cat==2)
		{
			price=5000;
			document.getElementById("price").innerHTML = price;
			break;
			
		}
		else(cat==1)
		{
			price=6000;
			document.getElementById("price").innerHTML = price;
			break;

		}
		 
			
	 }
  }
  return cat;
}

function pgl(obj)
{
	$(document).ready(function(){
       var t = $(obj).text();
	   if(t=="Home")
	   {
		   t="index"
		  
		   $('#content').load(t+".php");
		   	   $("#content").html("");
	   }
	   else
	   {
		   $("#content").html("");
   $('#content').load("src/"+t+".html");
  
	   }
   });
	}
	function store()
	{	var valid = validatefreeroom();
		if(valid == 0)
		{
			alert("ez a szoba szabad");	
		var nev = document.getElementById("vnev").value;
		localStorage.setItem("lastname", nev);
		var room=document.getElementById("roomNum").value;
		localStorage.setItem("roomNum",room );
		document.getElementById("kuldes").style.display="block";
	}
		if(valid == 1)
		{
			alert("Keressen másik szobát");
		}
	}

	function validatefreeroom()
	{
		var sroom=document.getElementById("searchedroom").value;
		for(var i=0;i<localStorage.length;i++)
	{
		localstorekey=localStorage.getItem(localStorage.key(i));
		if (sroom == localstorekey)
		{
			return 1;
			
	}
	else
	{
		return 0;
	}
	}
	}

function searchroom()
{
	var sroom=document.getElementById("searchedroom").value;
	
	for(var i=0;i<localStorage.length;i++)
	{
		 var key = localStorage.key(i);
    var value = localStorage[key];

	
		if(value == sroom)
		{
			
			document.getElementById("foglalte").innerHTML="ez a szoba foglalt a hétre"
		}
		else
		{
			document.getElementById("foglalte").innerHTML="ez a szoba nem foglalt a hétre"
		}
	}
}