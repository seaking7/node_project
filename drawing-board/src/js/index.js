console.log('hi')

class DrawingBoard{
    MODE = "NONE";
    IsMouseDown = false;
    errserColor = "#FFFFFF";
    backgroundColor = "#FFFFFF";
    constructor() {
        this.assignElement();
        this.initContext();
        this.initCanvasBackgroundColor();
        this.addEvent();

    }

    assignElement() {
        this.containerEl = document.getElementById("container");
        this.canvasEl = this.containerEl.querySelector("#canvas");
        this.toolbarEl = this.containerEl.querySelector("#toolbar");
        this.brushEl = this.toolbarEl.querySelector("#brush");
        this.colorPickerEl = this.toolbarEl.querySelector("#colorPicker");
        this.brushPanelEl = this.containerEl.querySelector("#brushPanel");
        this.brushSliderEl = this.brushPanelEl.querySelector("#brushSize");
        this.brushSizePreviewEl = this.brushPanelEl.querySelector("#brushSizePreview");
        this.eraserEl = this.toolbarEl.querySelector("#eraser");

    }

    initContext(){
        this.context = this.canvasEl.getContext("2d");
    }

    initCanvasBackgroundColor(){
        this.context.fillStyle = this.backgroundColor;
        this.context.fillRect(0, 0, this.canvasEl.width, this.canvasEl.height);
    }

    addEvent(){
        this.brushEl.addEventListener("click", this.onClickBrush.bind(this));
        this.canvasEl.addEventListener("mousedown", this.onMouseDown.bind(this));
        this.canvasEl.addEventListener("mousemove", this.onMouseMove.bind(this));
        this.canvasEl.addEventListener("mouseup", this.onMouseUp.bind(this));
        this.canvasEl.addEventListener("mouseout", this.onMouseOut.bind(this));
        this.brushSliderEl.addEventListener("input", this.onChangeBrushSize.bind(this));
        this.colorPickerEl.addEventListener("input", this.onChangeColor.bind(this));
        this.eraserEl.addEventListener("click", this.onClickEraser.bind(this));
    }

    onClickEraser(){
        const isActive = event.currentTarget.classList.contains("active");
        this.MODE = isActive ? "NONE" : "ERASER";
        this.canvasEl.style.cursor = isActive ? "default" : "crosshair";
        this.brushPanelEl.classList.add("hide");
        this.eraserEl.classList.toggle("active");
        this.brushEl.classList.remove("active");
    }

    onChangeColor(event) {
        this.brushSizePreviewEl.style.background = event.target.value;
    }

    onChangeBrushSize(event){
        this.brushSizePreviewEl.style.width = `${event.target.value}px`
        this.brushSizePreviewEl.style.height = `${event.target.value}px`

    }

    onMouseDown(event) {
        if(this.MODE === "NONE") return;
        this.IsMouseDown = true;
        const currentPosition = this.getMousePosition(event);
        this.context.beginPath();
        this.context.moveTo(currentPosition.x, currentPosition.y);
        this.context.lineCap = "round";

        if(this.MODE === "BRUSH"){
            this.context.strokeStyle = this.colorPickerEl.value;
            this.context.lineWidth = this.brushSliderEl.value;
        } else if(this.MODE === "ERASER"){
            this.context.strokeStyle = this.errserColor;
            this.context.lineWidth = this.brushSliderEl.value;
        }


        // this.context.lineTo(400, 400);
        // this.context.stroke();

    }

    onMouseUp(event) {
        if(this.MODE === "NONE") return;
        this.IsMouseDown = false;
    }

    onMouseOut(){
        if(this.MODE === "NONE") return;
        this.IsMouseDown = false;
    }

    onMouseMove(event) {
        if(!this.IsMouseDown) return;
        const currentPosition = this.getMousePosition(event);
        this.context.lineTo(currentPosition.x, currentPosition.y);
        this.context.stroke();
    }



    getMousePosition(event) {
        const boundaries = this.canvasEl.getBoundingClientRect();
        return {
            x: event.clientX - boundaries.left,
            y: event.clientY - boundaries.top,
        };
    }

    onClickBrush(event) {
        console.log(event);
        const isActive = event.currentTarget.classList.contains("active");
        this.MODE = isActive ? "NONE" : "BRUSH";
        this.canvasEl.style.cursor = isActive ? "default" : "crosshair";
        this.brushPanelEl.classList.toggle("hide");
        this.brushEl.classList.toggle("active");
        this.eraserEl.classList.remove("active");
    }
}

const drawingBoard = new DrawingBoard();