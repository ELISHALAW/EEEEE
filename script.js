$(document).ready(function(){
    $(window).scroll(function(){
        if(this.scrollY > 20){
            $('.navbar').addClass("sticky");
        }else{
            $('.navbar').removeClass("sticky");

        }
        if(this.scrollY > 500){
            $('.scroll-up-btn').addClass("show");
        }else{
            $(".scroll-up-btn").removeClass("show")
        }
    });
    // slide-up script 
    $('.scroll-up-btn').click(function(){
        $('html').animate({scrollTop:0});
    });

    // toggle menu/navbar script 
    $('.menu-btn').click(function(){
        $('.navbar .menu').toggleClass("active");
        $('.menu-btn i').toggleClass("active");
    });

    // typing animation script 
    var typed = new Typed(".typing",{
        strings:["IT developer","Student","Front-end developer","Ethical Hacker","Back-end developer"," Video Editor"],
        typeSpeed:100,
        backSpeed:60,
        loop:true
    })
    var typed = new Typed(".typing-2",{
        strings:["IT developer","Student","Front-end developer","Ethical Hacker","Back-end developer"," Video Editor"],
        typeSpeed:100,
        backSpeed:60,
        loop:true
    })

    // owl carousel script 
    $('.carousel').owlCarousel({
        margin:20,
        loop:true,
        autoplayTimeOut:2000,
        autoplayHoverPause:true,
        responsive:{
            0:{
                items:1,
                nav:false
            },
            600:{
                items:2,
                nav:false

            },
            1000:{
                items:3,
                nav:false
            }
        }


    });
});


let clickHistory = [];
let hoverTimer;
const ATTENTION_THREHOLD = 500;

document.addEventListener('click', (e)=>{
    clickHistory.push({e: e.pageX , y: e.pageY, type:'click'});
    console.log("Click saved");
});


document.addEventListener('mousemovr', (e)=>{
    clearTimeOut(hoverTimer);

    hoverTime = setTimeout(()=>{
        clickHistory.push({x: e.pageX, Y: e.pageY, type:'hover'});
        console.log("Attention saved at this spot");
    },ATTENTION_THRESHOLD);
});

async function captureFullReport(){
    if(clickHitory.length === 0) return;

    console.log("Capturing website iamge... please wait.");

    const siteScreenshot = await html2canvas(document.body,{
        useCORS:true,
        allowTaint:true,
        logging:false,
        scale:1
    });

    const ctx = siteScreenShot.getContext('2d');

    clickHistory.forEach(point =>{
        const radius = point.type === 'click' ? 60:40;

        const alpha = point.type === 'click' ? 0.6 : 0.3;

        const grad = ctx.createRadialGradient(point.x, point.y , 0, point.x, point.y, radius);
        grad.addColorStop(0, `rgba(255,0,0, ${alpha})`);
        grad.addColorStop(1, `rgba(255,0,0,0)`);

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(point.x, point.y, radius,0, Math.PI * 2);
        ctx.fill();
    });
    const link = document.createElement('a');
    link.download = `Heatmap_Report_${Date.now()}.png`;
    link.href = siteScreenshot.toDataURL('image/png');
    link.click();
}

window.addEventListener('beforeunload', ()=>{
    captureFullReport();
})