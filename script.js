window.onload = () => {
    /** @type {HTMLCanvasElement} */
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');

    const gridSpacing = 40;
    const snapPointRadius = 2;

    function drawGrid(){
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = 'grey';
        for (let i = gridSpacing / 2; i < canvas.width; i += gridSpacing){
            for (let j = gridSpacing / 2; j < canvas.height; j += gridSpacing){
                ctx.beginPath();
                ctx.arc(i, j, snapPointRadius, 0, Math.PI * 2);
                ctx.fill();
            }
        }
    }

    function drawAll() {
        drawGrid();
        drawRods();
    }

    drawAll();
};
