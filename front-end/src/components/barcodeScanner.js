import React, { Component } from 'react'
import Quagga from 'quagga';

export default class barcodeScanner extends Component {
    state = {
        _scannerIsRunning:false
    }

    quaggaScanner = () =>{
        console.log("scan method fired")

        if (this.state._scannerIsRunning) {
            Quagga.stop();
            this.setState({_scannerIsRunning:false});
        } else {

            Quagga.init({
                inputStream: {
                    name: "Live",
                    type: "LiveStream",
                    target: document.querySelector('#scanner-container'),
                    constraints: {
                        width: 480,
                        height: 320,
                        facingMode: "environment"
                    },
                },
                decoder: {
                    readers: [
                        // "code_128_reader",
                        // "ean_reader",
                        // "ean_8_reader",
                        // "code_39_reader",
                        // "code_39_vin_reader",
                        // "codabar_reader",
                         "upc_reader",
                        "upc_e_reader",
                        // "i2of5_reader"
                    ],
                    debug: {
                        showCanvas: true,
                        showPatches: true,
                        showFoundPatches: true,
                        showSkeleton: true,
                        showLabels: true,
                        showPatchLabels: true,
                        showRemainingPatchLabels: true,
                        boxFromPatches: {
                            showTransformed: true,
                            showTransformedBox: true,
                            showBB: true
                        }
                    }
                },

            }, (err) => {
                if (err) {
                    console.log(err);
                    return
                }

                console.log("Initialization finished. Ready to start");
                Quagga.start();

                // Set flag to is running
                this.setState({_scannerIsRunning:true});
            });

            Quagga.onProcessed( (result) => {
                var drawingCtx = Quagga.canvas.ctx.overlay,
                drawingCanvas = Quagga.canvas.dom.overlay;

                if (result) {
                    if (result.boxes) {
                        drawingCtx.clearRect(0, 0, parseInt(drawingCanvas.getAttribute("width")), parseInt(drawingCanvas.getAttribute("height")));
                        result.boxes.filter((box) => {
                            return box !== result.box;
                        }).forEach( (box) => {
                            Quagga.ImageDebug.drawPath(box, { x: 0, y: 1 }, drawingCtx, { color: "green", lineWidth: 2 });
                        });
                    }

                    if (result.box) {
                        Quagga.ImageDebug.drawPath(result.box, { x: 0, y: 1 }, drawingCtx, { color: "#00F", lineWidth: 2 });
                    }

                    if (result.codeResult && result.codeResult.code) {
                        Quagga.ImageDebug.drawPath(result.line, { x: 'x', y: 'y' }, drawingCtx, { color: 'red', lineWidth: 3 });
                    }
                }
            });


            Quagga.onDetected( (result) => {
                //console.log("Barcode detected and processed : [" + result.codeResult.code + "]", result);
                console.log(result.codeResult.code)
            });
        }
    }

  render() {
    return (
    <div className="barcodeScanner">
        <div id="scanner-container"></div>
        <input type="button" id="btn" value="Start/Stop the scanner" onClick={this.quaggaScanner} />
    </div>

    )
  }
}
