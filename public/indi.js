var one = document.querySelector('#one');
var two = document.querySelector('#two');
var three = document.querySelector('#three');
var four = document.querySelector('#four');
var five = document.querySelector('#five');
var array = [one,two,three,five];


/////////////////////  responsive pictures functionality///////////////////////////////////
var count = 15;
var time = 10000
array.forEach(el=>{
    setInterval(function(){ 
        el.style.transition = "2s";
        el.style.backgroundImage = "url('pic-"+count+".jpg')";
        count===15 ? count = 1 : count = count + 1;
    }, time);
    time += 2000;
});


////////////////////////// quotes transformation//////////////////
var quoteList = document.querySelectorAll('.quote');
var quoteArray = Array.from(quoteList);
var icon1 = document.querySelector('.fa-arrow-circle-right');
var icon2 = document.querySelector('.fa-arrow-circle-left');
icon2.style.visibility='hidden';
var coun = 200;
icon1.addEventListener('click', event =>{
    var quotcontrol = document.querySelector('#control');
    var rectcont = quotcontrol.getBoundingClientRect();
    var holder = document.querySelector('.check');
    var rect = holder.getBoundingClientRect();
    if(rect.right > rectcont.right){
        quoteArray.forEach(el=>{
            el.style.transition = '0.5s';
            el.style.transform= `translateX(-${coun+200}px)`;
            // coun += 10;

        });
        coun += 200;
        setTimeout(function(){ 
            rectcont = quotcontrol.getBoundingClientRect();
            rect = holder.getBoundingClientRect();
            if(rect.right <= rectcont.right){
                icon1.style.visibility='hidden';
            }
    
        }, 1000);
    }
    else{
        icon1.style.visibility='hidden';
    }
    icon2.style.visibility='visible';
    // console.log(rect.right);
    // console.log(rectcont.right);
   
});

icon2.addEventListener('click', event =>{
    var quotcontrol = document.querySelector('#control');
    var rectcont = quotcontrol.getBoundingClientRect();
    var holder = document.querySelector('.fir');
    var rect = holder.getBoundingClientRect();
    if(rect.left < rectcont.left){
        coun -= 200;
        quoteArray.forEach(el=>{
            // coun -= 10;
            el.style.transition = '1s';
            el.style.transform= `translateX(-${coun-200}px)`;
            // coun -= 10;

        });
        setTimeout(function(){ 
            rectcont = quotcontrol.getBoundingClientRect();
            rect = holder.getBoundingClientRect();
            if(rect.left >= rectcont.left){
                icon2.style.visibility='hidden';
            } 
        }, 1000);
        
        icon1.style.visibility='visible';
    }
    else{
        icon2.style.visibility='hidden';
    }
    // console.log(rect.right);
    // console.log(rectcont.right);
   
});

                // console.log(rect.top, rect.right, rect.bottom, rect.left);
/////////////////////////////////////////////////////////////////////
////////////////scroll functionality///////////////////////////////

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

//131, 123, 80, 0.473

///////////////////Date functionality/////////////////////////////////////////////////
var timeElement = document.getElementById('time');
var n = new Date();
var time = n.getHours();
if(time >= 4 && time < 12){
    timeElement.textContent = 'Morning!';
}
else if(time >= 12 && time < 17){
    timeElement.textContent = 'Afternoon!';
}
else if(time >= 17 && time < 24){
    timeElement.textContent = 'Evening!';
}
else if(time >= 0 && time < 4){
    timeElement.textContent = 'Evening!';
}
// console.log(typeof time);

/////////////main pic chanching with time of day//////
  var minutes = n.getMinutes();
  changePic(getTime());
if(time%2 === 0){
     var deduct = minutes*60000 + 3600000;
     console.log(deduct);

    var t = 7200000 - deduct - 9000;
    setTimeout(function(){
        four.style.transition = "2s"; 
        changePic(getTime());
        setInterval(function(){
            four.style.transition = "2s";  
            changePic(getTime());
        }, 7200000);

    },t);
}
else{
    var deduct = minutes*60000 - 9000;
    //  console.log(deduct);
     var t = 7200000 - deduct - 9000;
    setTimeout(function(){ 
        four.style.transition = "2s";
        changePic(getTime());
        setInterval(function(){
            four.style.transition = "2s";  
            changePic(getTime()); 
        }, 7200000);
    },t);
}
// setInterval(function(){ 
//     el.style.transition = "2s";
//     el.style.backgroundImage = "url('pic-"+count+".jpg')";
//     count===15 ? count = 1 : count = count + 1;
// }, time);
function getTime(){
    var n = new Date();
    var time = n.getHours();
    return time;
}

function changePic(time){
    if(time === 0 || time === 23){
        applyStyle(1);
    }
    else if(time === 1 || time === 2){
        applyStyle(2);
    }
    else if(time === 3 || time === 4){
        applyStyle(3);
    }
    else if(time === 5 || time === 6){
        applyStyle(4);
    }
    else if(time === 7 || time === 8){
        applyStyle(5);
    }
    else if(time === 9 || time === 10){
        applyStyle(6);
    }
    else if(time === 11 || time === 12){
        applyStyle(7);
    }
    else if(time === 13 || time === 14){
        applyStyle(8);
    }
    else if(time === 15 || time === 16){
        applyStyle(9);
    }
    else if(time === 17 || time === 18){
        applyStyle(10);
    }
    else if(time === 19 || time === 20){
        applyStyle(11);
    }
    else if(time === 21 || time === 22){
        applyStyle(12);
    }
}
function applyStyle(num){
    four.style.backgroundImage = "linear-gradient(rgba(29, 28, 28, 0.315), rgba(29, 28, 28, 0.315)), url('day/picc-"+num+".jpg')";
}

/////////////////////////////////////////////////////////////////////////////////////
/////////  nav collapse functionality///////////////////////////////////////

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