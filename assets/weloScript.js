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

/* This is my app's JavaScript */
var weloApp = function($){

	$(document).ready(function() {
		var poplaireLoaded = false;
		var IntroRustBaseLoaded = false;

		$('.mobileNavIcon').click(function(){
			$(this).toggleClass('open');
			$('.mobileNav, footer').toggleClass('mobileOpen');
			$('body').toggleClass('hideOverflow');
			$('.mobileNavIconContainer').toggleClass('mobileNavDisplay');
			$('#products, #givingBack').toggleClass('whiteMenu');
		});

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