(function(){
  
/* Load Script function we may need to load jQuery from the Google's CDN */
/* That code is world-reknown. */
/* One source: http://snipplr.com/view/18756/loadscript/ */

var loadScript = function(url, callback){
 
  var script = document.createElement("script");
  script.type = "text/javascript";

  // If the browser is Internet Explorer.
  if (script.readyState){ 
	script.onreadystatechange = function(){
	  if (script.readyState == "loaded" || script.readyState == "complete"){
		script.onreadystatechange = null;
		callback();
	  }
	};
  // For any other browser.
  } else {
	script.onload = function(){
	  callback();
	};
  }

  script.src = url;
  document.getElementsByTagName("head")[0].appendChild(script);
	
};

/* This is app's JavaScript */
var weloApp = function($){

	$(document).ready(function() {

		// handle mobile nav 
		$('.mobileNavIcon').click(function(){
			$(this).toggleClass('open');
			$('.mobileNav, footer').toggleClass('mobileOpen');
			$('body').toggleClass('hideOverflow');
			$('.mobileNavIconContainer').toggleClass('mobileNavDisplay');
			$('#products, #givingBack').toggleClass('whiteMenu');
		});

		// check font is loaded before applying bigtext function
		var poplaireLoaded = false;
		var IntroRustBaseLoaded = false;

		fontSpy('IntroRustBase', {
		  success: function() {
		   	IntroRustBaseLoaded = true
		  },
		  failure: function(error) {
		  	console.log(error)
		  }
		});

		fontSpy('Populaire', {
		  success: function() {
		   	poplaireLoaded = true
		  },
		  failure: function(err) {
		  	console.log(err)
		  }
		});

		function createBigTextScript() {
			var scriptLink = " {{ 'bigText.js' | asset_url | script_tag }} "
			var script = document.createElement("script");
			script.type = "text/javascript";
			script.src = scriptLink
			document.getElementsByTagName("head")[0].appendChild(script);

			var bt = BigText.noConflict(true);
			$.fn.bt = bt.jQueryMethod;

			$('.weWantedToMakeContainer, .soWeDid').bt();
		}

		if (poplaireLoaded && IntroRustBaseLoaded) {
			createBigTextScript()
		}

		// parallax

		// function shastaParallax() {	
			
		// 	if ($('body').css("minWidth") != '480px') {
		// 		$('#shasta_scene div').each(function(i,el) {
		// 			// Define amount of parallax to apply based on attribute
		// 			var parallaxScale = (19.01-$(el).data('parallax'))*.02;
			
		// 			// Apply parallax to vertical position (adjusting top margin)
		// 			// Scale the water plane
		// 			if ($(el).is('#water')) {
		// 				$(el).css({
		// 					'height': 423/1276*100 - $(window).scrollTop()*.025 + '%',
		// 					'margin-top':$(window).scrollTop()*parallaxScale + $(window).scrollTop()*.06
		// 				});
		// 			} else {
		// 				$(el).css({'margin-top':$(window).scrollTop()*parallaxScale});
		// 			}
		// 		});
		// 	};
			
		// 	$('.float.shasta').css({'margin-top': $(window).scrollTop()*0.45 });
		// }

		$(window).scroll(function()
		{
			// if ($('.pane, .contact_pane').length) {
			// 	$('.pane, .contact_pane').not('.half').each(function(i,el) {
			// 		var thisTop = parseInt($(el).css('top')); // read current CSS top attr as px val
			// 		var yPos = -($(window).scrollTop()-$(el).offset().top+thisTop)/6;
			// 		if ($(el).hasClass('above')) $(el).css({'margin-top':yPos*1.6});
			// 			else $(el).css({'margin-top':yPos});
			// 	});
			// }
			if ($('.caption, .block').length) {
				$('.caption, .block').each(function(i,el) {
					if ($(el).parents('.pane').length) var parentOffset = $(el).parents('.pane').offset().top; else var parentOffset = $(el).parents('section').offset().top;
					var yPos = -($(window).scrollTop()-parentOffset+$(el).position().top)/4;
					$(el).css({'margin-top':yPos});
				});
			}
			// if ($('.float:not(.shasta)').length) {
			// 	$('.float:not(.shasta)').each(function(i,el) {
			// 		var thisTop = parseInt($(el).css('top')); // read current CSS top attr as px val			
			// 		var yPos = -($(window).scrollTop()-$(el).offset().top+thisTop)/9;
			// 		$(el).css({'margin-top':yPos});
			// 	});
			// }
			// if ($('.element').length) {
			// 	$('.element').each(function(i,el) {
			// 		var thisTop = parseInt($(el).css('top')); // read current CSS top attr as px val
			// 		var yPos = -($(window).scrollTop()-$(el).offset().top+thisTop)/12;
			// 		if ($(el).hasClass('above')) $(el).css({'margin-top':yPos*1.6});
			// 			else if ($(el).hasClass('flyover_plane')) $(el).css({'margin-top':yPos*3});
			// 			else if ($(el).hasClass('small_cloud')) $(el).css({'margin-top':yPos*3});
			// 			else $(el).css({'margin-top':yPos});
			// 	});
			// 	// Let's add some side-to-side movement to the seeding plane...
			// 	if ($('.seeding_plane').length) $('.seeding_plane').css({'margin-left':($(window).scrollTop()-$('.seeding_plane').offset().top)/3 - $(window).height()/6 });
			// }
			// if ($('#commercial_scale .cloud').length) {
			// 	$('#commercial_scale .cloud').each(function(i,el) {
			// 		var thisTop = parseInt($(el).css('top')); // read current CSS top attr as px val
			// 		var yPos = -($(window).scrollTop()-$(el).offset().top+thisTop)/2.5;
			// 		$(el).css({'margin-top':yPos});
			// 	});
			// }
			// if ($('.backdrop.move').length) {
			// 	$('.backdrop.move').each(function(i,el) {
			// 		var yPos = -($(window).scrollTop()-$(el).offset().top)/16;
			// 		if ($(el).hasClass('left')) var $alignment = 'left ';
			// 			else if ($(el).hasClass('right')) var $alignment = 'right '
			// 				else var $alignment = 'center ';
			// 		$(el).css({'background-position':$alignment+yPos+'px'});
			// 	});
			// }
			// if ($('.availability').length) {
			// 	$('.availability').each(function(i,el) {
			// 		var thisTop = parseInt($(el).css('top')); // read current CSS top attr as px val
			// 		var yPos = -($(window).scrollTop()-$(el).offset().top+thisTop)/12;
			// 		$(el).css({'margin-top':yPos});
			// 	});
			// }
			// if ($('#shasta_scene').length) { shastaParallax();	 }
		})
	})

};

/* If jQuery has not yet been loaded or if it has but it's too old for our needs, we will load jQuery from the Google CDN, and when it's fully loaded, we will run our app's JavaScript. Set your own limits here, the sample's code below uses 1.7 as the minimum version we are ready to use, and if the jQuery is older, we load 1.9. */
if ((typeof jQuery === 'undefined') || (parseFloat(jQuery.fn.jquery) < 1.7)) {
 	loadScript('//ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js', function() {
		jQuery191 = jQuery.noConflict(true);
		weloApp(jQuery191);
  	});
} else {
  weloApp(jQuery);
}

})();