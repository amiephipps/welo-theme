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
		$(window).scroll(function() {
			var iphone5bp = 320
			var tablet = 768
			var mobile = 580

			//homepage
			if ($('.learnAboutProbioticsLink').length && window.innerWidth > iphone5bp) {
				$('.learnAboutProbioticsLink').each(function(i,el) {
					var parentOffset = $(el).parents('.soWeDidContainer').offset().top;
					var yPos = -($(window).scrollTop()-parentOffset+$(el).position().top)/25;
					$(el).css({'margin-top': yPos});
				});
			}

			if ($('.sectionContent2, .sectionContent3').length && window.innerWidth > mobile) {
				$('.sectionContent2, .sectionContent3').each(function(i,el) {
					var parentOffset = $(el).parents('section').offset().top;
					var yPos = -($(window).scrollTop()-parentOffset+$(el).position().top)/2;
					$(el).css({'margin-top': yPos});
				});
			}

			if ($('.sectionContent2').length && window.innerWidth <= mobile) {
				$('.sectionContent2').each(function(i,el) {
					var parentOffset = $(el).parents('section').offset().top;
					var yPos = -($(window).scrollTop()-parentOffset+$(el).position().top)/5;
					$(el).css({'margin-top': yPos});
				});
			}

			if ($('.sectionContent3').length && window.innerWidth <= mobile) {
				$('.sectionContent3').each(function(i,el) {
					var parentOffset = $(el).parents('section').offset().top;
					var yPos = -($(window).scrollTop()-parentOffset+$(el).position().top-300)/2;
					$(el).css({'margin-top': yPos});
				});
			}

			if ($('.block').length) {
				$('.block').each(function(i,el) {
					var parentOffset = $(el).parents('section').offset().top;
					var yPos = ($(window).scrollTop()-parentOffset+$(el).position().top)/11;
					$(el).css({'bottom': yPos});
				});
			}

			// purpose
			if ($('.section1Content').length) {
				$('.section1Content').each(function(i,el) {
					var parentOffset = $(el).parents('section').offset().top;
					var yPos = -($(window).scrollTop()-parentOffset+$(el).position().top)/6;
					$(el).css({'margin-top': yPos});
				});
			}

			if ($('.founders').length) {
				$('.founders').each(function(i,el) {
					var parentOffset = $(el).parents('section').offset().top;
					var yPos = -($(window).scrollTop()-($(el).position().top+100))/3;
					$(el).css({'margin-top': yPos});
				});
			}

			if ($('.meetTheFounders').length) {
				$('.meetTheFounders').each(function(i,el) {
					var thisTop = parseInt($(el).css('bottom'));
					var yPos = -($(window).scrollTop()+$(el).offset().top+thisTop)/11.5;
					$(el).css({'bottom': yPos});
				});
			}

			// products
			// all products
			if ($('.section2-1').length) {
				$('.section2-1').each(function(i,el) {
					var thisTop = parseInt($(el).css('top'));
					var yPos = (-($(window).scrollTop()+$(el).offset().top+thisTop)/10)+50;
					$(el).css({'top': yPos});
				});
			}

			// 2 billion desktop
			if ($('.section2-2-1').length) {
				$('.section2-2-1').each(function(i,el) {
					var thisTop = parseInt($(el).css('margin-top'));
					var yPos = (-($(window).scrollTop()+$(el).offset().top+thisTop)/10)+75;
					$(el).css({'margin-top': yPos});
				});
			}

			// yogurts desktop view
			if ($('.section2-3').length && window.innerWidth > tablet) {
				$('.section2-3').each(function(i,el) {
					var parentOffset = $(el).parents('#productsSection2').offset().top;
					var yPos = -($(window).scrollTop()-parentOffset+$(el).position().top)/4;
					$(el).css({'margin-top': yPos});
				});
			}

			// yogurts mobile view
			if ($('.section2-3, .section2-2-1').length && window.innerWidth <= mobile) {
				$('.section2-3, .section2-2-1').each(function(i,el) {
					var parentOffset = $(el).parents('#productsSection2').offset().top;
					var yPos = -($(window).scrollTop()-parentOffset+$(el).position().top)/10;
					$(el).css({'margin-top': yPos});
				});
			}

			if ($('.section3-1-desktop, .section3-1-mobile').length) {
				$('.section3-1-desktop, .section3-1-mobile').each(function(i,el) {
					var parentOffset = $(el).parents('section').offset().top;
					var yPos = -($(window).scrollTop()-$(el).position().top)/8;
					$(el).css({'margin-top': yPos});
				});
			}

			if ($('.section4Content').length) {
				$('.section4Content').each(function(i,el) {
					var parentOffset = $(el).parents('section').offset().top;
					var yPos = -($(window).scrollTop()-parentOffset+$(el).position().top)/2;
					$(el).css({'margin-top': yPos});
				});
			}

			if ($('.section5Content').length && window.innerWidth > iphone5bp) {
				$('.section5Content').each(function(i,el) {
					var parentOffset = $(el).parents('section').offset().top;
					var yPos = -($(window).scrollTop()-parentOffset+$(el).position().top)/2;
					$(el).css({'margin-top': yPos});
				});
			}

			// giving back
			if ($('.section2Container h6').length && window.innerWidth > tablet) {
				$('.section2Container h6').each(function(i,el) {
					var parentOffset = $(el).parents('section').offset().top;
					var yPos = -($(window).scrollTop()-parentOffset+$(el).position().top)/5;
					$(el).css({'margin-top': yPos});
				});
			}
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