import '../css/app.scss';
import $ from "jquery";
import '../node_modules/bootstrap/dist/js/bootstrap.min.js';
import 'waypoints';
import 'scrollTo';
import {fabric} from "fabric";

let imgExportPosition = {};
window.canvas = new fabric.Canvas("canvas");
var edgedetection = 8;
canvas.selection = false;

window.addEventListener('resize', resizeCanvas, false);

function resizeCanvas() {
  canvas.setHeight(window.innerHeight);
  canvas.setWidth(window.innerWidth);
  canvas.renderAll();
}

// resize on Init
resizeCanvas();

// Initialize Everything
init();

// Add event to exportBtn
$('#exportBtn').on('click', saveImg);

function saveImg() {
  window.open(canvas.toDataURL({
    left: imgExportPosition.left,
    top: imgExportPosition.top,
    width: imgExportPosition.width,
    height: imgExportPosition.height
  }));
}


function init(top, left, width, height, fill) {

  var bg = new fabric.Rect({
      left: 0,
      top: 0,
      fill:  "#eee",
      width: window.innerWidth,
      height: 75,
      lockRotation: true,
      maxHeight: document.getElementById("canvas").height,
      maxWidth: document.getElementById("canvas").width,
      selectable: false,
  });

  var squareBtn = new fabric.Rect({
      top: 10,
      left: 18,
      width: 40,
      height: 40,
      fill: '#af3',
      lockRotation: true,
      originX: 'left',
      originY: 'top',
      cornerSize: 15,
      hasRotatingPoint: false,
      perPixelTargetFind: true,
  });

  var circleBtn = new fabric.Circle({
      radius: 20,
      fill: '#f55',
      top: 10,
      left: 105
  });

  var triangleBtn = new fabric.Triangle({
    width: 40,
    height: 35,
    fill: 'blue',
    top: 15,
    left: 190,
  });

  var shadow = {
      color: 'rgba(0,0,0,0.6)',
      blur: 3,
      offsetX: 0,
      offsetY: 2,
      opacity: 0.6,
      fillShadow: true,
      strokeShadow: true
  };

  // Set load image to canvas
  fabric.Image.fromURL("images/input.jpg", (img) => {
    img.scaleToHeight(canvas.height * 0.6);
    img.scaleToWidth(canvas.width * 0.6);

    window.canvas.add(img);
    window.canvas.moveTo(img, 0);
    window.canvas.centerObject(img);
    window.canvas.renderAll();

    //Set position to export Image position
    imgExportPosition.height = img.getHeight();
    imgExportPosition.width = img.getWidth();
    imgExportPosition.top = img.top;
    imgExportPosition.left = img.left;
  }, {selectable: false});

  window.canvas.add(bg);
  bg.setShadow(shadow);
  window.canvas.add(squareBtn);
  window.canvas.add(circleBtn);
  window.canvas.add(triangleBtn);
  canvas.forEachObject(function(e) {
    e.hasControls = e.hasBorders = false;
  });

  function draggable(object) {
    object.on('mousedown', function () {
      // Add control to new object
      if (this.hasControls == false) {
        this.set({
          hasControls: true,
          hasBorders: true
        });
      }
      var temp = this.clone();
      canvas.add(temp);
      draggable(temp);
    });

    object.on('mouseup', function () {
      this.off('mousedown');

      if (this.top <=75) {
        canvas.remove(this);
      }
    });
  }

  draggable(squareBtn);
  draggable(circleBtn);
  draggable(triangleBtn);
}
