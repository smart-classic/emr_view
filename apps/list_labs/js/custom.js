//customize filter on specific columns only
function fnFilterColumn(i){
	$('#createTable').dataTable().fnFilter($("#col" + (i + 1) + "_filter").val(), i);	
}
function MaxMinDates(){
	$("#createTable tbody tr.theGroup").each(function() {
	//Start LastSeen Date
		var itemsarray = [];
		//var indexsarray = [];	
		$(this).nextUntil("tr.theGroup").find("td:nth-child(2)").each(function(){
			itemsarray.push($(this).text());
		});
	
		var max_date_int;
		var max_index_int;
		for(x=0;x<itemsarray.length;x++){
			var cur_date = itemsarray[x];
			var cur_date_string = cur_date.substr(0,4) + cur_date.substr(5,2) + cur_date.substr(8,2);
			if(x == 0){
				max_date_int = parseInt(cur_date_string);
				max_index_int = 0;
			}
			else{
				var cur_date_int = parseInt(cur_date_string);
				if(cur_date_int > max_date_int){
					max_date_int = cur_date_int;
					max_index_int = x;
				}
			}
	
		}
		var max_date_string = max_date_int + '';
		var max_date = max_date_string.substr(0,4) + '-' + max_date_string.substr(4,2) + '-' + max_date_string.substr(6,2);
		
		var column3 = $(this).nextUntil("tr.theGroup").find("td:nth-child(3)").eq(max_index_int).text();
		var column4 = $(this).nextUntil("tr.theGroup").find("td:nth-child(4)").eq(max_index_int).text();
		
		$(this).children("th:nth-child(2)").html(max_date);
		$(this).children("th:nth-child(3)").html(column3);
		$(this).children("th:nth-child(4)").html(column4);
		//alert (maxium_date);
		//$(this).children("td:nth-child(2):contains(maxium_date)").css("color", "red")
	//End LastSeen Date

  	});
}
// function to add extra thead tags to the group row, hide all children, and force the colspan to "1" on load
function GetGroups( oSettings ) {
	$("#createTable tbody tr.theGroup .group").attr("colspan", "1");
	$("#createTable tbody tr.theGroup").append("<th class='group whenSeem'></th><th class='group whenSeem'></th><th class='group whenSeem'></th>");
	$("#createTable tbody tr.odd, #createTable tbody tr.even").addClass("children").hide();
    $("#createTable tbody tr th.group").parent().addClass("theGroup"); 
		var split_at = 'tr.theGroup';
		$(split_at).click(function() {
        	$(this).nextUntil(split_at).toggle("slow");
			$(this).find("th.group").toggleClass("up");
		});	
};

$(document).ready(function() {
	// show and hide Search Filter column
	$("div.searchFilter img.utilitiesFilter").click(function() {
        	$(this).parents().find("#createTable thead tr.filterColumn").toggle("slow");
	});
  // Now, let's resize that font
  $('a.resize').click(function(){
    var ourText = $('table#createTable tbody td, #createTable tbody tr.theGroup th');
	var currFontSize = ourText.css('fontSize');
	var currLineHeight = ourText.css('lineHeight');
	var finalNum = parseFloat (currFontSize, 10);
	var finalHeight = parseFloat (currLineHeight, 16);
	var stringSize = currFontSize.slice(-2);
	var stringHeight = currLineHeight.slice(-2);
	if(this.id == 'small') {
		finalNum = 10;
		finalHeight = 16;
		// in case we want to dynamically scale
		// finalNum *=1.2;
		// finalHeight *=1.2;
		//if(finalNum >= 20.74){finalNum = 20.74;}
		//if(finalHeight >31.1){finalHeight = 31.1;}
	}
	if(this.id == 'large') {
		finalNum = 16;
		finalHeight = 26;
	}
	else if (this.id == 'normal') {
		finalNum = 12;
		finalHeight = 18;
	}
	ourText.css('fontSize', finalNum + stringSize);
	ourText.css('lineHeight', finalHeight + stringHeight);
    
    // Prevent default click action.
    return false;
  });

//Datatable build-in functions/options
	oTable = $('#createTable').dataTable({
	"aoColumnDefs": [{ "bSortable": false, "aTargets": [ 2, 3 ] }],
   	"aaSorting": [[0, 'asc']],	
   	"bAutoWidth" : false,
   	"bInfo": false,
   	"bPaginate": false,
	"iDisplayLength": 20,
	"fnDrawCallback": function ( oSettings ) {
			$("#createTable_wrapper #createTable_filter").remove(); //hide filters on page load
			if ( oSettings.aiDisplay.length == 0 )
			{
				return;
			}
			
/*			var nTrs = $('#createTable tbody tr');
			var iColspan = nTrs[0].getElementsByTagName('td').length;
			var sLastGroup = "";
			for ( var i=0 ; i<nTrs.length ; i++ )
			{
				var iDisplayIndex = oSettings._iDisplayStart + i;
				var sGroup = oSettings.aoData[ oSettings.aiDisplay[iDisplayIndex] ]._aData[0];
				if ( sGroup != sLastGroup )
				{
					var nGroup = document.createElement( 'tr' );
					nGroup.className = "theGroup";
					var nCell = document.createElement( 'th' );
					nCell.colSpan = iColspan;
					nCell.className = "group";
					nCell.innerHTML = sGroup;
					nGroup.appendChild( nCell );
					nTrs[i].parentNode.insertBefore( nGroup, nTrs[i] );
					sLastGroup = sGroup;
				}
			}*/
//			GetGroups ();
//			MaxMinDates();
		}
	});
	var asInitVals = new Array();
	$("thead input").keyup(function(){
		/* Filter on the column (the index) of this element */
		oTable.fnFilter(this.value, $("thead input").index(this));
	});
	
	/*
	 * Support functions to provide a little bit of 'user friendlyness' to the textboxes in
	 */
	$("thead input").each(function(i){
		asInitVals[i] = this.value;
	});
	
	$("thead input").focus(function(){
		if (this.className == "search_init") {
			this.className = "";
			this.value = "";
		}
	});
	
	$("thead input").blur(function(i){
		if (this.value == "") {
			this.className = "search_init";
			this.value = asInitVals[$("thead input").index(this)];
		}
	});
	
// Filter on the column on keyup 
$("#col1_filter").keyup( function() { fnFilterColumn( 0 ); } );
} );