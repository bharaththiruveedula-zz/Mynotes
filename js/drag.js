$(function() {
	check();
	$('.draggable').draggable();
	$('.draggable').resizable({minHeight:150,minWidth:150});
	var newnote = '<div class="draggable" class="ui-widget-content"><div class="title">Title</div><div class="content"></div></div>';
	$('#newnote').on('click', function(){
		$('#drop').append(newnote);
		addEvent();
		localStorage.setItem("notes",localStorage.getItem("notes")+newnote+",");
	});

	function addEvent() {
		$(".draggable:not(.ui-draggable)").draggable();
		$(".draggable:not(.ui-resizable)").resizable({minHeight:150,minWidth:150});
		$('.title').on('click', divClicked);
		$('.content').on('click', contentClicked);
	}

	function contentClicked() {
    	var div = $(this);
    	var divHtml = $(this).html();
    	var width = div.width();
    	console.log(width);
    	var editableText = $("<textarea class='ct'/>").css('width', width);
    	editableText.val(divHtml);
    	$(this).replaceWith(editableText);
    	editableText.focus();
    	// setup the blur event for this new textarea
    	editableText.blur(contentTextBlurred);
	}

	function contentTextBlurred() {
	    var html = $(this).val();
	    var viewableText = $('<div class="content"></div>');
	    viewableText.html(html);
	    $(this).replaceWith(viewableText);
	    // setup the click event for this new div
	    viewableText.click(contentClicked);
	}

	function divClicked() {
    	var div = $(this);
    	var divHtml = $(this).html();
    	var width = div.width();
    	console.log(width);
    	var editableText = $("<input type='text' />").css('width', width);
    	editableText.val(divHtml);
    	$(this).replaceWith(editableText);
    	editableText.focus();
    	// setup the blur event for this new textarea
    	editableText.blur(editableTextBlurred);
	}

	function editableTextBlurred() {
	    var html = $(this).val();
	    var viewableText = $('<div class="title">Title</div>');
	    viewableText.html(html);
	    $(this).replaceWith(viewableText);

	    // setup the click event for this new div
	    viewableText.click(divClicked);
	}
	$('.title').on('click', divClicked);

	function check() {
		if(localStorage.getItem("notes") === null){
			console.log("New User!");
			localStorage.setItem("notes","");
		}
	}
});