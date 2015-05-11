/**
 * 
 */



$(document).ready(function() {
	
	$("#login").click(function(){
			var emailId=$("#email").val();
			var password=$("#password").val();
			var role=$("#role").val();
			
			
		
       	  $.ajax({
				url :  siteContextPath+"/login",
				type : 'POST',
				 data: {
					 emailid:emailId,
					 password:password,
					 role:role
					 },         				
				success : function(data) {
                  var data = JSON.parse(data);
                 
                  alert("success")
				},
				error : function(data) {
					alert("error");
				},

			});
			 

		});
	
});