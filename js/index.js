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
