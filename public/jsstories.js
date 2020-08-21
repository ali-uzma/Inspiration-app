//////////////scrol functionality////////////////////

window.addEventListener('scroll', function(e) {
    var scrollTop = window.pageYOffset || (document.documentElement || document.body.parentNode || document.body).scrollTop;
    var nav = document.querySelector('nav');
    var height = getComputedStyle(nav).getPropertyValue('height');
    height = parseInt(height);
    nav.classList.toggle('navChange', scrollTop > height);
    if(scrollTop > height){
        var navvcolor = document.querySelectorAll('nav li a');
        var arr = Array.from(navvcolor);
        arr.forEach(el =>{
            el.style.color = 'red';
        });
    }else{
        var navvcolor = document.querySelectorAll('nav li a');
        var arr = Array.from(navvcolor);
        arr.forEach(el =>{
            el.style.color = 'white';
        });
    }

 });


/////////////////////////////////////////////////////////////////
/////// nav collapse functionality///////////////////////

var hamburger = document.querySelector('#ham');
var crossbtn = document.querySelector('.fa-times');
var navCollapse = document.querySelector('#collapsed');
var open = false;
hamburger.addEventListener('click',ev=>{
    if(open){
        navCollapse.style.display = 'none';
        open = false;
    }
    else{
        navCollapse.style.display = 'flex'; 
        open = true;
    }

});
crossbtn.addEventListener('click',ev=>{
    
    navCollapse.style.display = 'none';
    open = false;
});