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
// --- DANIEL'S FULL VANILLA JS HEATMAP SYSTEM ---

// 1. DATABASE: Store every click coordinate in an array
let clickHistory = [];

// 2. CANVAS SETUP: Get the drawing context
const canvas = document.getElementById('heatmapCanvas');
const ctx = canvas.getContext('2d');

// Function to make canvas match the total scrollable height of your portfolio
function resizeCanvas() {
    canvas.width = document.documentElement.scrollWidth;
    canvas.height = document.documentElement.scrollHeight;
}

// Ensure the canvas is the right size on load and when window changes
window.addEventListener('load', resizeCanvas);
window.addEventListener('resize', resizeCanvas);

// 3. THE COLLECTOR: Record clicks and draw live feedback
document.addEventListener('click', (e) => {
    // Save coordinates to our list
    clickHistory.push({ x: e.pageX, y: e.pageY });
    
    // Log to console for debugging
    console.log("Click recorded at:", e.pageX, e.pageY);

    // Draw the "heat" spot immediately on the screen
    drawHeatSpot(ctx, e.pageX, e.pageY);
});

// 4. THE BRUSH: Logic for drawing the radial "glow"
function drawHeatSpot(context, x, y) {
    const radius = 50; 
    
    // Create the gradient "recipe" (center to edge)
    const grad = context.createRadialGradient(x, y, 0, x, y, radius);
    
    // Red core (0) fading to transparent yellow/blue (1)
    grad.addColorStop(0, 'rgba(255, 0, 0, 0.6)'); 
    grad.addColorStop(1, 'rgba(255, 255, 0, 0)');

    context.fillStyle = grad;
    context.beginPath();
    // Draw a full 360-degree circle
    context.arc(x, y, radius, 0, Math.PI * 2);
    context.fill();
}

// 5. THE SCREENSHOT GENERATOR: Creates the final image file
function generateScreenshot() {
    // Safety check: Don't download if no clicks were made
    if (clickHistory.length === 0) return;

    // Create a virtual canvas for the final "Screenshot"
    const reportCanvas = document.createElement('canvas');
    const reportCtx = reportCanvas.getContext('2d');
    
    const w = document.documentElement.scrollWidth;
    const h = document.documentElement.scrollHeight;
    reportCanvas.width = w;
    reportCanvas.height = h;

    // Draw a dark background to represent your site layout
    reportCtx.fillStyle = "#111111"; 
    reportCtx.fillRect(0, 0, w, h);

    // Re-draw every saved click onto the final report image
    clickHistory.forEach(click => {
        drawHeatSpot(reportCtx, click.x, click.y);
    });

    // Create a unique filename with a timestamp
    const timestamp = Date.now();
    
    // Download the file automatically
    const link = document.createElement('a');
    link.download = `Daniel_Heatmap_Report_${timestamp}.png`;
    link.href = reportCanvas.toDataURL('image/png');
    link.click();
    
    // Print the data list in the console
    console.log("Automatic Report Generated:");
    console.table(clickHistory);
}

// 6. THE AUTO-TRIGGER: Run when the user leaves the page
window.addEventListener('beforeunload', () => {
    generateScreenshot();
});
