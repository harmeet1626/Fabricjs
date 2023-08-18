<template>
  <div>
    <div class="canvasMain">
      <div class="sidenav">
        <!-- <v-btn @click="toggleDraw()" stacked variant="outlined" :color='isDrawing ? "error" : "primary"'>
          Draw &#9998;
        </v-btn>
        <v-btn @click="brushOn()" stacked variant="outlined" color='primary'>
          Brush
        </v-btn>
        <v-btn @click="createRectangle()" stacked variant="outlined" color='primary'>
          Rect &#9982;
        </v-btn>
        <v-btn @click="createTextbox()" stacked variant="outlined" color='primary'>
          Text box
        </v-btn>
        <v-btn @click="deleteObject()" stacked variant="outlined" color='primary'>
          Delete &#10006
        </v-btn> -->
        <v-btn @click="handleFileChange()" stacked variant="outlined" color='primary'>
          Add image
        </v-btn>
        <v-btn @click="Clear()" stacked variant="outlined" color='primary'>
          Clear
        </v-btn>
        <v-btn @click="eraser()" stacked variant="outlined" color='primary'>
          Eraser &#9998;
        </v-btn>
        <v-btn @click="undo()" variant="outlined" color='primary'>Undo</v-btn>
        <v-btn @click="redo()" variant="outlined" color='primary'>Redo</v-btn>
        <input v-model="brushWidth" type="number">
        <!-- <input type="file" @change="handleFileChange" /> -->
        <!-- <v-btn @click="crop()" stacked variant="outlined" color='primary'>
          Crop
        </v-btn> -->
        <v-btn @click="test()" stacked variant="outlined" color='primary'>
          Download
        </v-btn>
        <div class="text-center">

        </div>
      </div>
      <div>
        <canvas id="demoCanvas"></canvas>

      </div>
    </div>
  </div>
</template>
<script>
import downloadDivAsImage from './dowload.ts'
import image from '../assets/image.png'
import { fabric } from 'fabric'
export default {
  data() {
    return {
      myCanvas: null,
      icecreamScoops: [],
      selectedFile: null,
      imageUrl: null,
      color: 'gray',
      isDrawing: false,
      isEraserMode: false,
      brushWidth: 5,
      history: [],
      redoHistory: []
    }
  },
  mounted() {
    this.init()
    this.myCanvas.on('object:added', this.saveHistory);
    this.myCanvas.on('object:removed', this.saveHistory);
    this.myCanvas.on('object:modified', this.saveHistory);
  },
  onUpdated() {
    console.log(this.redoHistory)
    console.log(this.history)
  },
  watch: {
    brushWidth(oldval, newval) {
      this.myCanvas.freeDrawingBrush.width = parseInt(oldval, 10)
    },
    myCanvas(oldval, newval) {
      console.log(oldval, newval)
    }
  },
  methods: {
    test() {
      downloadDivAsImage.downloadDivAsImage()
      // document.getElementsByClassName("upper-canvas").classList.toggle('addedclass');

    },
    brushOn() {
      const canvas_class = document.getElementsByClassName("upper-canvas");
      canvas_class[0].innerHTML = "static";
      canvas_class[0].className = "static";
      const canvas = document.getElementById('demoCanvas')
      // document.canvas.classList.add("addedclass");
      canvas.className = 'addedclass';
      const ctx = canvas.getContext('2d');
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      ctx.strokeStyle = 'red';
      ctx.lineJoin = 'round';
      ctx.lineCap = 'round';
      ctx.lineWidth = 30;
      ctx.globalCompositeOperation = 'multiply';
      let hue = 0;

      let isDrawing = false;
      let lastX = 0;
      let lastY = 0;
      let direction = true;

      function draw(e) {
        if (!isDrawing) return; //Stops the fn from running when not moused down
        // ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;
        ctx.beginPath();
        ctx.moveTo(lastX, lastY);
        ctx.lineTo(e.offsetX, e.offsetY);
        ctx.stroke();
        [lastX, lastY] = [e.offsetX, e.offsetY]; //This is Array Destructuring—see the section below
        hue++;
        // if (hue >= 360) { hue = 0; }
        // if (ctx.lineWidth >= 100 || ctx.lineWidth <= 1) {
        //   direction = !direction;
        // }
        // if (direction) {
        //   ctx.lineWidth--;
        // }
        // else {
        //   ctx.lineWidth++;
        // }
      }

      canvas.addEventListener('mousedown', (e) => {

        isDrawing = true;
        [lastX, lastY] = [e.offsetX, e.offsetY]; //This is Array Destructuring—see the section below
      });
      canvas.addEventListener('mousemove', draw);
      canvas.addEventListener('mouseup', () => isDrawing = false);
      canvas.addEventListener('mousout', () => isDrawing = false);
    },
    handleFileChange(event) {
      var file = event.target.files[0];
      var image
      console.log(file)
      // load image
      const reader = new FileReader();
      reader.onload = (event) => {
        image = new Image();
        image.onload = () => {
          const ctx = this.canvas.getContext('2d');
          ctx.clearRect(0, 0, 0, 0);
          ctx.drawImage(image, 0, 0);
        };
        image.src = event.target.result;
      };
      reader.readAsDataURL(file);
    },
    init() {
      this.myCanvas = new fabric.Canvas("demoCanvas", {
        width: window.innerWidth - 200,
        height: window.innerHeight - 100,
        backgroundColor: "white",
        isDrawingMode: false,
      });
    },
    toggleDraw() {
      this.isDrawing = !this.isDrawing;
      this.myCanvas.freeDrawingBrush.color = 'Black'

      try {
        const canvas_class = document.getElementsByClassName("static");
        canvas_class[0].innerHTML = "upper-canvas";
        canvas_class[0].className = "upper-canvas";
        const canvas = document.getElementById('demoCanvas')
        canvas.className = 'addedclass1';
      } catch (error) {
      }

      this.myCanvas.set({ isDrawingMode: !this.myCanvas.get("isDrawingMode") });
    },

    createRectangle() {
      const rectangle = new fabric.Rect({
        width: 100,
        height: 100,
        fill: this.color
      });
      this.myCanvas.add(rectangle);
    },

    createTextbox() {
      const textbox = new fabric.Textbox("Please enter text", {
        width: 400,
      });
      this.myCanvas.add(textbox);
    },
    deleteObject() {
      if (this.myCanvas.getActiveObject()) {
        this.myCanvas.remove(this.myCanvas.getActiveObject());
      }
    },

    handleFileChange(event) {
      var canvas = this.myCanvas
      fabric.Image.fromURL(image, function (myImg) {
        var img1 = myImg.set({ left: 0, top: 0, width: 300, height: 300 });
        canvas.add(img1);
      });
    },
    Clear() {
      this.init()
    },
    crop() {
      var sourceX = 150;
      var sourceY = 0;
      var sourceWidth = 150;
      var sourceHeight = 150;
      var destWidth = sourceWidth;
      var destHeight = sourceHeight;
      var destX = canvas.width / 2 - destWidth / 2;
      var destY = canvas.height / 2 - destHeight / 2;
      context.drawImage(imageObj, sourceX, sourceY, sourceWidth, sourceHeight, destX, destY, destWidth, destHeight);
    },

    eraser() {
      this.myCanvas.freeDrawingBrush.color = 'white'
      this.myCanvas.freeDrawingBrush.width = parseInt(10, 10)
      this.myCanvas.set({ isDrawingMode: !this.myCanvas.get("isDrawingMode") });
    },
    undo() {
      if (this.history.length > 1) {
        this.redoHistory.push(this.history[this.history.length - 1])
        this.history.pop(); // Remove current state
        const prevState = this.history[this.history.length - 1];
        this.myCanvas.loadFromJSON(prevState);
        this.myCanvas.renderAll();
      }
    },
    redo() {
      if (this.redoHistory.length > 1) {
      const prevState = this.redoHistory[this.redoHistory.length - 1];
      this.myCanvas.loadFromJSON(prevState);
      this.myCanvas.renderAll();
      this.redoHistory.pop();
      }
    },
    saveHistory() {
      const json = this.myCanvas.toJSON();
      this.history.push(json);
    },
    icecreamFunction() {
      const scoops = document.getElementById("scoops").value;
      const scoopRadius = 20;
      let initialPos = 0;
      for (let i = 0; i < scoops; i++) {
        initialPos += scoopRadius / 2;
        const flavour = new fabric.Circle({
          top: -initialPos,
          left: 0,
          radius: scoopRadius,
          fill: this.color,
        });
        this.icecreamScoops.push(flavour);
      }

      const icecreamCone = new fabric.Triangle({
        width: 40,
        height: 80,
        top: scoopRadius,
        left: 0,
        fill: this.color,
        flipY: true,
      });

      const icecream = new fabric.Group([...this.icecreamScoops, icecreamCone], {
        left: 100,
        top: 100,
      })

      this.myCanvas.add(icecream);
    },

  }
}
</script>


<style>
.canvasMain {
  padding-left: 100px;
  width: 50%;
}

.sidenav {
  width: 100px;
  position: fixed;
  top: 40px;
  left: 3px;
  margin-top: 20px;
}

.sidenav button {
  padding-top: 10px;
  margin-top: 10px;
  border: 1px solid #75E6DA;
  font-size: 20px;
  width: 100px;
  color: #189AB4;
  display: block;
}

.sidenav button:hover {
  color: #2a7c74;
}

#demoCanvas {

  box-sizing: border-box;
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
  width: 120px;
  height: 120px;
  /* border: 10px solid #000000; */
  background: #d9dbda;
  margin: 10px;
}

/* .upper-canvas {
  position: static !important;
} */
.static {
  position: static !important;
}

.addedclass1 {
  position: absolute !important;
}
</style>