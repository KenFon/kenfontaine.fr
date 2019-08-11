/*
	RequestAnimationFrame Polyfill

	http://paulirish.com/2011/requestanimationframe-for-smart-animating/
	http://my.opera.com/emoller/blog/2011/12/20/requestanimationframe-for-smart-er-animating
	by Erik Möller, fixes from Paul Irish and Tino Zijdel

	MIT license
 */

(function() {
	var lastTime = 0;
	var vendors = ['ms', 'moz', 'webkit', 'o'];
	for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
		window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
		window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame'] || window[vendors[x]+'CancelRequestAnimationFrame'];
	}

	if ( ! window.requestAnimationFrame ) {
		window.requestAnimationFrame = function(callback, element) {
			var currTime = new Date().getTime();
			var timeToCall = Math.max(0, 16 - (currTime - lastTime));
			var id = window.setTimeout(function() { callback(currTime + timeToCall); },
			timeToCall);
			lastTime = currTime + timeToCall;
			return id;
		};
	}

	if ( ! window.cancelAnimationFrame ) {
		window.cancelAnimationFrame = function(id) {
			clearTimeout(id);
		};
	}
}());

/**********************************************************************************************************************
 *                              Fonction qui gere le parralax des mots de la home
 *********************************************************************************************************************/
(function(){


    function preMove(){
        var moveLeftIndice=-20;
        var moveRightIndice=0;
        moveRightIndice += (window.scrollY/90);
        moveLeftIndice += (window.scrollY/90);
        document.documentElement.style.setProperty("--move_left", `${moveLeftIndice}vw`);
        document.documentElement.style.setProperty("--move_right", `-${moveRightIndice}vw`);
        return [moveLeftIndice, moveRightIndice];
    }

    function move(){
        window.addEventListener("scroll", preMove);
    }

    move();

})();

/**********************************************************************************************************************
 *                                         Fonctions pour le scroll
 **********************************************************************************************************************/
(function(){
   function myLastScrollTo(id) {
  var e = document.getElementById(id);
  var box = e.getBoundingClientRect();
  window.scrollBy(0, box.top);
}

function myScrollTo(id) {
  var e = document.getElementById(id);
  var box = e.getBoundingClientRect();
  var k, inc;
  inc = (box.top >= 0) ? 1 : -1;
  for (k = 0; k < 49; k++) setTimeout("window.scrollBy(0," + Math.floor(box.top / 48.5) + ")", 10 * k);
  setTimeout("myLastScrollTo('" + id + "')", 500);
}

var lists = document.querySelector('.navBar').querySelectorAll('li');
   lists.forEach(list => {
       list.addEventListener('click', function(){
            myScrollTo(list.dataset.link)
       })
   })
})();


/***********************************************************************************************************************
 *                                   Fonction du menu
 **********************************************************************************************************************/
(function(w,d,undefined){

	var el_html = d.documentElement,
	el_body = d.getElementsByTagName('body')[0],
	header = d.querySelector('.navBar')

    function menuIsStuck(){
	        var wScrollTop	= w.pageYOffset || el_body.scrollTop,
            regexp		= /(nav\-is\-stuck)/i,
            classFound	= el_html.className.match( regexp ),
            navHeight	= header.offsetHeight,
            bodyRect	= el_body.getBoundingClientRect(),
            scrollValue	= 800;

        // si le scroll est d'au moins 600 et
        // la class nav-is-stuck n'existe pas sur HTML
        if ( wScrollTop > scrollValue && !classFound ) {
            el_html.className = el_html.className + ' nav-is-stuck';
            el_html.className = el_html.className.replace('nav-no-stuck', '');
        }

        // si le scroll est inférieur à 2 et
        // la class nav-is-stuck existe
        if ( wScrollTop < 2 && classFound ) {
            el_html.className = el_html.className.replace( regexp, 'nav-no-stuck' );
        }
	}

	function onScrolling() {
		// on exécute notre fonction menuIsStuck()
		// dans la fonction onScrolling()
		menuIsStuck();
	};

// quand on scroll
w.addEventListener('scroll', function(){
	// on exécute la fonction onScrolling()
	w.requestAnimationFrame( onScrolling );
});

}(window, document));




/***********************************************************************************************************************
                                            Intialisation des fonctions de Materialize
 **********************************************************************************************************************/

document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.tooltipped');
    var instances = M.Tooltip.init(elems, {});
});



/**********************************************************************************************************************
                                        Fonction qui gére la partie projet
 *********************************************************************************************************************/

(function(){
        var divProjet = document.querySelectorAll(".projs");


        function addProperty(rotate, left, top){
            document.documentElement.style.setProperty("--rotate",`${rotate}deg`);
            document.documentElement.style.setProperty("--left",`${left}%`);
            document.documentElement.style.setProperty("--top",`${top}%`);
        }

        function addText(y){
            var textProjet= document.querySelector(".textprojet").querySelectorAll("div");
            for(i=0;i<textProjet.length;i++){
                if(y==i){
                    textProjet[i].classList.add('active');
                    textProjet[i].classList.remove('inactive');
                }else if(!textProjet[i].classList.contains("inactive")&& y!=i){
                    textProjet[i].classList.add("inactive");
                }else{
                    textProjet[i].classList.remove('active');
                }
            }
        }


        divProjet[0].addEventListener("click",function(){
            addProperty(0,45.2,10);
            addText(0);
        });

        divProjet[2].addEventListener("click",function(){
            addProperty(90,80,42.5);
            addText(2);
        });

        divProjet[3].addEventListener("click",function(){
            addProperty(180,45.2,80.5);
            addText(3);
        });

        divProjet[1].addEventListener("click",function(){
            addProperty(270,9,42.5);
            addText(1);
        });

})();

