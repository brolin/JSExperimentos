//console.profile();
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
		t.anio.forEach(function(y,cnt) { 
		    var $evento= $("li.timeline-item.item-"+count);
		    // console.log("Antecende: "+cnt+" "+t.antecedentes[cnt]);
		    $evento.append("<p class=\"event\" id=\"box-"+count+"-"+cnt+"\">"+y+"<br>"+t.antecedentes[cnt]+"</p>");
		    // Problemas con el width (Límite 6000px -> Pillar interactivos.marginalia)
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
		$(".timelines-list").scrollLeft(ui.position.left*6.1);
	    }
	});
    }
});

$.widget("ui.DialogBox",{
    _init: function() {
	this._setDialog();
    },
    _setDialog: function(){
	var $el= this.element;
	$el.dialog();
    }
});

$(function() {
    $(".timelines-list").Timeline();
    $(".span-control").Control();
  
    var $dialog = $('<div></div>')
	.html('This dialog will show every time!')
	.dialog({
	    autoOpen: false,
	    title: 'Basic Dialog'
	});
//No ha cargado todos los eventos 
    $('.event').click(function() {
	$dialog.dialog('open');
	// prevent the default action, e.g., following a link
	return false;
    });
    
//    $(".event").DialogBox(); // No me carga todos los elementos con la clase event| Está cargando solo el primero
});

//console.profileEnd();