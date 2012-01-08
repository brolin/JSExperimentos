$.widget("ui.Timeline", {
    _init: function() {
	this._getTimelines();
    },
    _getTimelines: function() {
	$.get('/timelines', function(data) {
	    var count= 0;
	    data.forEach(function(t) {
		// console.log(t.anio);
		count++;
		var $layout= $(".timeline-item.layout").clone();
		$layout.removeClass("layout");
		$layout.find(".name").text(t.nombre);
		// Tengo que poner una serie de elementos <p> que correspondan con cada elemento de los antecedentes t.anio???</p>
		$layout.addClass("item-"+count);
		$(".timelines-list ul").append($layout.show());
		t.anio.forEach(function(y) { //Add todos los <p>s par, solo está poniendo el último
		    var $evento= $("li.timeline-item.item-"+count);
		    // console.log($evento.find(".event"));
		    $evento.append("<p class=\"event\">"+y+"</p>");
		});
	    });
	});
    }
});

$.widget("ui.Control", {
    _init: function() {
	var $el= this.element;
	$el.draggable({
	    containment: 'parent',
	    drag: function(e, ui) {
		$(".timelines-list").scrollLeft(ui.position.left);
	    }
	});
    }
});


$(function() {
    $(".timelines-list").Timeline();
    $(".span-control").Control();
});