/**
 * 
 */

/**
 * 
 */



$(document).ready(function() {
	
	$("#submitTicket").click(function(){
			var subject=$("#subject").val();
			var description=$("#description").val();
			var priority=$("input[name='priority']:checked").val();

		
       	  $.ajax({
				url :  siteContextPath+"/addTicket",
				type : 'POST',
				 data: {
					 action:"sampleaction",
					 subject:subject,
					 description:description,
					 priority:priority
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