$.widget("ui.Timeline", {
    _init: function() {
	this._getTimelines();
    },
    _getTimelines: function() {
	$.get('/timelines', function(data) {
	    var count= 0;
	    data.forEach(function(t) {
		count++;
		var $layout= $(".timeline-item.layout").clone();
		$layout.removeClass("layout");
		$layout.find(".name").text(t.name);
		$layout.addClass("item-"+count);
		$(".timelines-list ul").append($layout.show());
	    });
	});
    }
});



$(function() {
    $(".timelines-list").Timeline();
});