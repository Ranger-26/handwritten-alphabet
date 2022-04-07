window.addEventListener('load', ()=>{
    document.addEventListener('mousedown', startPainting);
    document.addEventListener('mouseup', stopPainting);
    document.addEventListener('mousemove', sketch);
});
const canvas = document.querySelector('#myCanvas');
const ctx = canvas.getContext('2d');
const dummyCanvas = document.querySelector('#dummyCanvas');
const dummyCanvasctx = dummyCanvas.getContext('2d');


let coord = {x:0 , y:0};

let dict = {0:"a", 1:"b", 2:"c", 3:"d", 4:"e", 5:"f", 6:"g", 7:"h", };

let paint = false;

function getPosition(event){
  coord.x = event.clientX - canvas.offsetLeft;
  coord.y = event.clientY - canvas.offsetTop;
}

function startPainting(event){
  paint = true;
  getPosition(event);
}
function stopPainting(){
  paint = false;
}

function sketch(event){
  if (!paint) return;
  ctx.beginPath();
  ctx.lineWidth = 10;
  ctx.lineCap = 'round';
  ctx.strokeStyle = '#000000';
  ctx.moveTo(coord.x, coord.y);
  getPosition(event);
  ctx.lineTo(coord.x , coord.y);
  ctx.stroke();
}

function ClearCanvas(){
  console.log("calling..")
  predictImage();
}
  
const modelURL = 'http://127.0.0.1:5000/model';
  


function predictImage()
{
  resizeImageData()
  var tensor = tf.browser.fromPixels(dummyCanvasctx.getImageData(0, 0, 28, 28), 4);
  tensor = tensor.split(4, axis=2)[3];
  tensor = tensor.reshape([1,28,28,1]);
  tf.loadLayersModel(modelURL).then(model => {
    var pred = model.predict(tensor).argMax(-1);
    var string = pred.toString().replace("[","");
    string = string.replace("]","");
    string = string.replace("Tensor", "").trim();
    console.log("Digit: " + String.fromCharCode(97+parseInt(string)));
  });
}

function resizeImageData () {
  dummyCanvas.width = 28;
  dummyCanvas.height = 28;
  dummyCanvasctx.scale(0.1, 0.1);
  dummyCanvasctx.drawImage(canvas, 0, 0);
}