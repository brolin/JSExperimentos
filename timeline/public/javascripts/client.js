//console.profile();
$.widget("ui.Timeline", {
    _init: function() {
	this._getTimelines();
    },
    _getTimelines: function() {
	$.get('/timelines', function(data) {
/* Estructura de datos en JSON
   anio
   antecedentes
   sintesis
   Or
   Ab
   Oc
   Dp
*/
	    var count= 0;
	    data.forEach(function(t) {
		// console.log(t);
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
// como meter datos escondidos para pasarlos al recuadro cuando hagan click
		    $evento.append("<div class=\"event\" id=\"box-"
				   +count+"-"+cnt+"\">"+y+"<br>"
				   +t.antecedentes[cnt]+"<br>"
				   +"<span style=\"display: none\"><p class=\"anio\">"+t.anio[cnt]+"</p>"
				   +"<p class=\"sintesis\">"+t.sintesis[cnt]+"</p>"
				   +"<p class=\"dptal\">"+t.Dp[cnt]
				   +"</p><p class=\"oriente\">"+t.Or[cnt]
				   +"</p><p class=\"occidente\">"+t.Oc[cnt]
				   +"</p><p class=\"aburra\">"+t.Ab[cnt]
				   +"</p></div>");
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
//	console.log(this);
    },
    _setDialog: function(){
	
	var $el= this.element;
	$el.bind('click',function(){
	    var $dialog = $('<div></div>')
		.html($(this).find("span").html())
		.dialog({
		    autoOpen: true,
		});
//	    console.log("clicked");
 	});	
	
    }
});

$(function() {
    $(".timelines-list").Timeline();
    $(".span-control").Control();
    var t=setTimeout("$(\".event\").DialogBox()",3000);
});

//console.profileEnd();