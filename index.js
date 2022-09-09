//selector
let $ = (selector) => document.querySelector(selector);
let $$ = (selector) => document.querySelectorAll(selector);

var body = $("body");
var header = $(".header");
var sticky = header.offsetTop;
var logo = $(".logo");
var togmenu = $(".bars");
var gototop = $(".gototop");
var year = new Date().getFullYear();
var overlay = $(".overlay");
var yeardiv = $(".year");


    //get  year
    yeardiv.innerHTML = year;
 //Reload
logo.addEventListener("click",function(){
   window.location.href = "/";
});

//menu function
togmenu.onclick = (e) => {
    body.classList.toggle("tognav");
    header.classList.toggle("mybg");
};

//wrap images into div
wrapImg();
function wrapImg(){
    var p = document.getElementsByClassName("gallery-section");
    var c = p.length;
    for(var i=0; i<c; i++){
        var children = p[i].getElementsByTagName("img");
        for(var j=0; j < children.length; j++){
            var child = p[i].removeChild(children[0]);
            var imgWrap= document.createElement("div");
            imgWrap.className = "imgWrap hidden";
            imgWrap.appendChild(child);
            p[i].appendChild(imgWrap);
        }
    }
}


//scroll
window.onscroll = () => {
    if (window.pageYOffset > sticky) {
        header.classList.add("sticky");
        gototop.classList.add("showgtt");
    } else {
        header.classList.remove("sticky");
        gototop.classList.remove("showgtt");
    }
}
//image open
window.onload = function(){
const image = $$('#gl img');
image.forEach((x) => {
x.addEventListener("click", function(e){
  //create image wrapper
  const imgHolder= document.createElement("div");
  imgHolder.className = "imgHolder";
  const imgClose = document.createElement("span");
  imgClose.className = "imgClose";
  const imgCloseTxt = document.createTextNode("\u00D7");
  imgClose.appendChild(imgCloseTxt);
  
  //hide on click
  imgClose.onclick = (item) => {
    item.target.parentNode.style.display="none"
  }
  
  //image module onclick
  const imgsrc = e.target.src;
  
  const newImage = document.createElement("img");
  newImage.src = imgsrc;
  
  //download button
  const dWrap = document.createElement("div");
  dWrap.className = "dWrap";
  //copy links input
  
  const dImg = document.createElement("a");
  dImg.className = "dimg";
  dImg.href = imgsrc;
  dImg.download = "My Image";
  dImg.appendChild(document.createTextNode("Download"));
  dImg.addEventListener("click", (event) => {
    event.preventDefault();
    downloadImage(imgsrc)
  });
  
  //download image script 
  // https://codepen.io/MadanBhandari/pen/vbaKGJ
  
  function downloadImage(url) {
  fetch(url, {
    mode : 'no-cors',
  })
    .then(response => response.blob())
    .then(blob => {
    let blobUrl = window.URL.createObjectURL(blob);
    let a = document.createElement('a');
    a.download = url.replace(/^.*[\\\/]/, '');
    a.href = blobUrl;
    document.body.appendChild(a);
    a.click();
    a.remove();
  })
}

  //append the button close
  imgHolder.append(imgClose,newImage,dImg);
  document.body.appendChild(imgHolder)
});
});
}


//loadmore 
const hiddenItems = [...document.querySelectorAll('.hidden')];
const loadmore = document.getElementById('loadMore');

hiddenItems.splice(0, 21).forEach(
  elem => elem.style.display="flex"
);

loadmore.addEventListener('click', function(e) {
  e.preventDefault();

  hiddenItems.splice(0, 5).forEach(
    elem => elem.style.display="flex"
  )

  if (hiddenItems.length == 0) {
    loadmore.innerHTML = "<span id='loadmore'>" + " No Images" + "</span>";
  }
});


const dk = $$(".menu ul a");

dk.forEach((n) => {
  n.setAttribute('target','_blank');
  if(n.matches(".about,.contact")){
    //create about
    const about = " We are free platform where you can download plenty of stock images from us for your project, blogs etc, The images downloaded from here are coyright free.";
    const contact = "";
    
    n.addEventListener("click", (event) => {
    //nText
    const nTxt = event.target.innerHTML;
    //create title
    const title = document.createElement("h1");
    title.className = "sTitle";
    const sInner = document.createTextNode(nTxt);
    title.appendChild(sInner);
    const sDiv = document.createElement("div");
    sDiv.className ="sdiv";
    //close button 
    const sClose = document.createElement("span");
    sClose.className="imgClose";
    sClose.appendChild(document.createTextNode('\u00D7'));
    sClose.addEventListener("click", (item) => {
      item.target.parentNode.style.display="none";
    });
          //const p 
      const p = document.createElement("div");
      p.className = "ptag";
      
    sDiv.append(title,p);
    //overlay
    const sLay = document.createElement("div");
    sLay.className = "imgHolder";
    sLay.appendChild(sClose);
    
    if(event.target.matches(".about")){
      event.preventDefault();
      console.log("worked");
      p.appendChild(document.createTextNode(about))

    }
    else if(event.target.matches(".contact")) {
      event.preventDefault();
      console.log("contact");
      p.innerHTML =$(".icons").innerHTML
      
    }
    
    else {
      console.log("pass");
      event.preventDefault = false;
    }
    sLay.appendChild(sDiv);
    document.body.appendChild(sLay);
    
  });
  }
 
})


function openSocial(){
  const social = $(".icons");
  social.classList.toggle("show")
}
