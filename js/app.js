import '../css/app.scss';
import $ from "jquery";
import '../node_modules/bootstrap/dist/js/bootstrap.min.js';
import 'waypoints';
import 'scrollTo';
import {fabric} from "fabric";

let canvas = new fabric.Canvas('canvas');

fabric.Image.fromURL("images/input.jpg", function(img) {
  img.scaleToWidth(canvas.getWidth()).center().setCoords();
  canvas.setBackgroundImage(img);
  canvas.renderAll();
})
