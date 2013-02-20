var baseurl = 'http://mobileconnectit.com/';

$(function() {	
	$.ajax({
		url: baseurl + 'AlbedaWebApp?callback=?',
		dataType: 'json',
		jsonpCallback: 'sitedata', // specify the callback name if you're hard-coding it
		timeout: 3000,
		success: function(data){
			parseData(data)},
		error: function(){
			if (localStorage.getItem('items')){	
				localStorageSort();
			} else {
				$('#sortable').append('<div class="uitleg"><h2>LET OP!</h2><p>Je hebt op dit moment geen internetverbinding, waardoor de app niet goed geladen kan worden.</p></div>');
			}
		}
	});
	
	$('#sortable').sortable({
		connectWith: '#sortable',
		handle: '.handle',
		cursor: 'move',
		stop: function(event, ui) {
			$(ui.item).find('.header').click();
			var sortorder = '';

			$('#sortable').each(function() {
				var itemorder = $(this).sortable('toArray');
				var columnId = $(this).attr('id');
				sortorder +=  itemorder.toString();
			});
			
			console.log('SortOrder: ' + sortorder);
			//localStorage.setItem(JSON.stringify(sortorder).sortable);
			localStorage.setItem("order" , sortorder);
			//localStorage.getItem("sortables");
		}
	})
	.disableSelection();
	$( "#sortable" ).disableSelection();
});	

function parseData(data){
	var y=[];
	$.each(data.items, function(i,item){
		var s ='';
			s = s+'<div class="item" id="item'+i+'"><img class="sort handle" src="images/sort.png" alt=""/>';
			s = s+'<img class="placeholder" src="'+item.img+'" alt=""/>'				
			s = s+'<h2 class="titleItem">'+item.title+'</h2>'
			s = s+'<p class="itemInfo">'+item.info+'</p>'
			s = s+'<a href="'+item.link+'" class="button" target="_blank">Bezoek de site</a><div class="clear"></div></div>'
			y[i]=s;
		});
		console.log(y.join('|'));
		localStorage.setItem("items" , y.join('|'));
	localStorageSort(); 
};

function localStorageSort() {
	var y = localStorage.getItem("items").split('|'); 
	var str = localStorage.getItem("order");
	if (str) {
		
		
			var col = str;
			if (col.length > 0) {
				var vals = col.split(',');
				for (var j = 0; j < vals.length; ++j) {
					console.log('appending ' + vals[j] + ' to #sortable');
					$('#sortable').append(y[vals[j].substring(4,5)]);
				}
				if (y.length > vals.length)
				{
					for (var j = vals.length; j < y.length; ++j) {
					console.log('appending item' + j + ' to #sortable' );
					$('#sortable').append(y[j]);}
				}
			}
		
	} 
	else {
		for (var i = 0; i < y.length; i++) {
			$("#sortable").append(y[i]);
		}
	}
}