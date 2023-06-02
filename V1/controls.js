var isDown = false;
var mouseStartX, mouseStartY;
var offsetX, offsetY;
var mainCanvas;
var gridX, gridY;
const cellSize = 100;
var gridSizeX, gridSizeY;
var divhelp;

window.onload = function () 
{
    mainCanvas = document.getElementById('mainCanvas');
    divhelp = document.getElementById("help");
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);
    mouseStartX = 0;
    mouseStartY = 0;
    gridX = 0;
    gridY = 0;
    gridSizeX = Math.ceil(window.innerWidth/cellSize) + 4;
    gridSizeY = Math.ceil(window.innerHeight/cellSize) + 4;
    mainCanvas.width  = cellSize * gridSizeX;
    mainCanvas.height = cellSize * gridSizeY;
    offsetX = (window.innerWidth - mainCanvas.width) / 2;
    offsetY = (window.innerHeight - mainCanvas.height) / 2;
    mainCanvas.style.left =  offsetX + "px";
    mainCanvas.style.top = offsetY + "px";
    isDown = false;

    drawCanvas();
    
}

function handleMouseMove(e)
{
    var posX = offsetX + e.clientX - mouseStartX;
    var posY = offsetY + e.clientY - mouseStartY;
    if (isDown) 
    {
        if (posX > 0)
        {
            offsetX -= cellSize * 2;
            posX -= cellSize * 2;
            gridX -= 2;
            drawCanvas();
        }

        if (posY > 0)
        {
            offsetY -= cellSize * 2;
            posY -= cellSize * 2;
            gridY -= 2;
            drawCanvas();
        }

        if (posX < -2 * cellSize)
        {
            offsetX += cellSize * 2;
            posX += cellSize * 2;
            gridX += 2;
            drawCanvas();
        }

        if (posY < -2 * cellSize)
        {
            offsetY += cellSize * 2;
            posY += cellSize * 2;
            gridY += 2;
            drawCanvas();
        }

        mainCanvas.style.left = (posX) + "px";
        mainCanvas.style.top  = (posY) + "px";
    }  

    divhelp.innerText = offsetX + " " + offsetY; 
}

function handleMouseDown(e)
{
    isDown = true;
    mouseStartX = e.clientX;
    mouseStartY = e.clientY;    
}

function handleMouseUp(e)
{
    isDown = false;
    offsetX += (e.clientX - mouseStartX);
    offsetY += (e.clientY - mouseStartY);
    mouseStartX = 0;
    mouseStartY = 0;
}

function drawCanvas()
{
    var ctx = mainCanvas.getContext("2d");
    ctx.clearRect(0, 0, mainCanvas.width, mainCanvas.height);
    ctx.beginPath();
    ctx.lineWidth = 1;
    ctx.strokeStyle  = "black";
    ctx.font = "24px serif";

    for (let i = 0; i < gridSizeX + 1; i++) {
        ctx.moveTo(i * cellSize, 0);
        ctx.lineTo(i * cellSize, cellSize * gridSizeY);
    }

    for (let i = 0; i < gridSizeY + 1; i++) {
        ctx.moveTo(0, i * cellSize);
        ctx.lineTo(cellSize * gridSizeX, i * cellSize);
    }
    ctx.stroke();

    for (let i = 0; i < gridSizeX + 1; i++)
        for (let j = 0; j < gridSizeX + 1; j++)
            ctx.fillText((gridX + i) +"," + (gridY + j), i * cellSize + 40, j * cellSize + 40);
}