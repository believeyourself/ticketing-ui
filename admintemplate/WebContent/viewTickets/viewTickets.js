/**
 * 
 */

$(document).ready(function() {
	

	function getParameterByName(name) {
	    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
	    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
	        results = regex.exec(location.search);
	    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
	}

	var searchByStatus=getParameterByName("searchByStatus")
	 ticketsInfo=$("#ticketsInfo").DataTable(
    		
    		 {
					bFilter : false,
					bInfo : false,
					"bLengthChange" : false,
					responsive:true,
					ordering:false,
					"paging": false,
					 "processing": true,
				        "serverSide": true,
				        "ajax": {
							"url" : siteContextPath+"/getTicketList",
							"data" : function(d) {
								if(searchByStatus!="")
								{
									d.searchByStatus = searchByStatus;									
								}	
							},
							"type" : "GET",
							"error" : function(e) {
								// var data = JSON.parse(e);
								// var response = data.Response;
								//
								//
								// if (response.type == "success") {
								//
								// }
								// else if (response.type = "error") {
								// }
								// else {
								// }

							}

						},
						"columns" : [ {
							"orderable" : false,
							"searchable" : false,
							"bSortable" : false,
							"data" : null,
							"defaultContent" : ''
						}, {
							"data" : "ticketId",
							"defaultContent" : ""
						}, {
							"data" : "subject",
							"defaultContent" : ""
						}, {
							"data" : "priority",
							"defaultContent" : ""
						}, {
							"data" : "status",
							"defaultContent" : ""
						}, {
							"data" : "agenetName",
							"defaultContent" : ""
						} ],
    		        "columnDefs": [
    		            {
    		                // The `data` parameter refers to the data for the cell (defined by the
    		                // `data` option, which defaults to the column being worked with, in
    		                // this case `data: 0`.
    		                "render": function ( data, type, row ,meta) {
    		                	return '<input type="checkbox" class="details-control" id="row_'+ meta.row+ '"/>';
    		                   
    		                },
    		                "targets": 0,
    		               width:"0.5%"
    		            },
    		            {
    		                "targets": [ 1],
    		                "visible": false,
    		                "searchable": false
    		            },
    		            {

							"targets" : [ 2 ],
							"data" : null,
							"className": "capitalizeWord",
							"render" : function(data, type, row, meta) {
								return '<a href="'
										+ siteContextPath
										+ '/viewTicket/viewTicket.jsp?ticketId='
										+ row["ticketId"] + '">'
										+ data + '</a>';

							}

						},
    		        ],
    		    } );	
	
	
	
	
	 var _getSelectedCheckedBoxData = function (datatableApi) {
	        var dataArray = [];
	        var tempValues = [];
	       var tempRowIndex = [];

	        for (var i = 1; i < arguments.length; i++) {
	            tempValues.push(arguments[i]);
	        }

	        var rowSelector;
	        var rowData;
	        $("input[class='details-control']:checked").each(function () {
	            var arr = [];
	            var rowObjs = {};
	            var rowIndex;

	            rowSelector = datatableApi.row($(this).parents('tr'));
	            rowData = rowSelector.data();
	            r=rowData;
	            rowIndex = rowSelector.index();
	            for (var j = 0; j < tempValues.length; j++) {
	                if (rowData.hasOwnProperty(tempValues[j])) {

	                    arr[tempValues[j]] = rowData[tempValues[j]].toString();

	                }

	            }
	            rowObjs["rowData"] = arr;
	            rowObjs["rowIndex"] = rowIndex;
	            dataArray.push(rowObjs);

	        });

	        return dataArray;

	    }
	
	var agentListArr = [{'value':'val1','text':'Agent 1'},
	               {'value':'val2','text':'Agent  2'},
	               {'value':'val3','text':'Agent  3'},
	               {'value':'val4','text':'Agent  4'},
	               {'value':'val5','text':'Agent 5'},
	               {'value':'val6','text':'Agent 6'},
	               {'value':'val7','text':'Agent 7'}];
	 
	// Removes all options for the select box
	$('#agentList option').remove();
	 
	// .each loops through the array
	$.each(agentListArr, function(i){
	    $('#agentList').append($("<option></option>")
	                    .attr("value",agentListArr[i]['value'])
	                    .text(agentListArr[i]['text']));
	});
	
	$("#assignAgent").click(function(){
		$("#assignAgentPopup").modal('show');
	});

	
	
	$("#assignAgentSaveBtn").click(function(){
		var selectedData=_getSelectedCheckedBoxData(ticketsInfo,"ticketId");
		var ticketIdsArr=[];
		 for (var i = 0; i < selectedData.length; i++) {
			 ticketIdsArr.push(selectedData[i].rowData["ticketId"]);
         }
		 console.log("ticketIdsArr"+ticketIdsArr);
		 
		var agentId=$('#agentList').val();
		 updateAgent(ticketIdsArr,agentId);
	});
	
	
	var updateAgent=function(ticketIds,agentId)
	{
		var obj={};
		obj["ticketIds"]=ticketIds;
		obj["agentId"]=agentId;
		console.log(obj);
		
		console.log("string "+JSON.stringify(obj));
       	  $.ajax({
				url :  siteContextPath+"/updateAgent",
				type : 'GET',
				 data: {
					 json:JSON.stringify(obj)
					 },         				
				success : function(data) {
                  var data = JSON.parse(data);
                 
                  $('#assignAgentPopup').modal('hide')

                  alert("success")
				},
				error : function(data) {
					alert("error");
				},

			});
			 

		
	}
	
	
	
	$("#updateStatus").click(function(){
		$("#updateStatusPopup").modal('show');
	});

	

	$("#updateStatusSaveBtn").click(function(){
		var selectedData=_getSelectedCheckedBoxData(ticketsInfo,"ticketId");
		var ticketIdsArr=[];
		 for (var i = 0; i < selectedData.length; i++) {
			 ticketIdsArr.push(selectedData[i].rowData["ticketId"]);
         }
		 console.log("ticketIdsArr"+ticketIdsArr);
		 
		var statusId=$('#statusList').val();
		 updateStatus(ticketIdsArr,statusId);
	});
	
	
	
	var updateStatus=function(ticketIds,statusId)
	{
		var obj={};
		obj["ticketIds"]=ticketIds;
		obj["statusId"]=statusId;
		console.log(obj);
		console.log("string "+JSON.stringify(obj));

		  $.ajax({
				url :  siteContextPath+"/updateStaus",
				type : 'GET',
				 data: {
					 json:JSON.stringify(obj)
					 },         				
				success : function(data) {
                var data = JSON.parse(data);
               
                alert("success");
                $('#updateStatusPopup').modal('hide')
                
				},
				error : function(data) {
					alert("error");
				},

			});
	}
	
	

} );