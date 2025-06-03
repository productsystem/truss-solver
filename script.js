window.onload = () => {
    /** @type {HTMLCanvasElement} */
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');

    const gridSpacing = 40;
    const snapPointRadius = 2;
    const snapRadius = 15;
    const jointRadius = 7;

    const points = [];
    const rods = [];

    let selectIndex = null;

    function drawGrid(){
        ctx.clearRect(0,0,canvas.width,canvas.height);
        ctx.fillStyle = 'grey';
        for(let i = gridSpacing/2; i < canvas.width; i += gridSpacing){
            for(let j = gridSpacing/2; j < canvas.height; j += gridSpacing){
                ctx.beginPath();
                ctx.arc(i,j,snapPointRadius,0,Math.PI*2);
                ctx.fill();
            }
        }
    }

    function drawRods(){
        ctx.strokeStyle = 'black';
        ctx.lineWidth = 2;
        rods.forEach(([i1,i2]) =>{
            const p1 = points[i1];
            const p2 = points[i2];
            ctx.beginPath();
            ctx.moveTo(p1.x,p1.y);
            ctx.lineTo(p2.x,p2.y);
            ctx.stroke();
        });
    }

    function drawJoints(){
        points.forEach((p,i) => {
            if(i == selectIndex){
                ctx.fillStyle = 'yellow';
            }
            else{
                ctx.fillStyle = 'red';
            }
            ctx.beginPath();
            ctx.arc(p.x,p.y,jointRadius,0,Math.PI*2);
            ctx.fill();
        });
    }

    drawGrid();

    canvas.addEventListener('click', (e) =>{
        const rect = canvas.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        let snapX = Math.round((mouseX - gridSpacing / 2)/ gridSpacing) * gridSpacing + gridSpacing/2;
        let snapY = Math.round((mouseY - gridSpacing / 2)/gridSpacing) * gridSpacing + gridSpacing/2;

        const dx = mouseX - snapX;
        const dy = mouseY - snapY;
        const distSqr = dx*dx + dy*dy;

        if(distSqr < snapRadius * snapRadius) {
            if(!points.some(p=>p.x == snapX && p.y == snapY)){
                points.push({x: snapX, y : snapY});
            }
            const selectedPoint = points.find(p=>p.x == snapX && p.y == snapY);
            if(selectIndex == null){
                selectIndex = points.indexOf(selectedPoint);
            }
            else if(selectIndex != points.indexOf(selectedPoint)){
                const exists = rods.some(([i1, i2]) =>  (i1 === selectIndex && i2 === points.indexOf(selectedPoint)) ||(i2 === selectIndex && i1 === points.indexOf(selectedPoint)));
                if(!exists){
                    rods.push([selectIndex, points.indexOf(selectedPoint)]);
                }
                selectIndex = null;
            } else{
                selectIndex = null;
            }
            drawGrid();
            drawJoints();
            drawRods();
        }
        
    });
    // ctx.fillStyle = 'red';
    // ctx.beginPath();
    // ctx.arc(100,100,5,0,Math.PI*2);
    // ctx.fill();
};