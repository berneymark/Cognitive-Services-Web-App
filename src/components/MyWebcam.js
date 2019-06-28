import React from 'react';
import Webcam from 'react-webcam';

class MyWebcam extends React.Component {
    constructor(props) {
        super(props);
        this.timerId = null;
        this.isCapturing = false;
    }
    
    setRef = webcam => {
        this.webcam = webcam; 
    }
    
    startCapturing = () => {
        this.isCapturing = true;
        this.timerId = setInterval(() => {
            const image = this.webcam.getScreenshot();
            const byteArrayImage = this.convertToByteArray(image);
            this.fetchData(byteArrayImage);
        }, 1000);
    }

    convertToByteArray = (image) => {
        const base64 = require('base64-js');
        const base64string = image.split(',')[1];

        return base64.toByteArray(base64string);
    }

    fetchData = (byteArray) => {
        const apiKey = '5fc2fa40176b44e199807bc0a14b7478';
        const apiEndpoint = 'https://australiaeast.api.cognitive.microsoft.com/face/v1.0/detect?returnFaceAttributes=emotion';
        fetch(apiEndpoint, {
            body: byteArray,
            headers: {'cache-control': 'no-cache', 'Ocp-Apim-Subscription-Key': apiKey, 'Content-Type': 'application/octet-stream'},
            method: 'POST'
        }).then(response => {
            console.log(response.status);
        })
    }

    render() {
        const videoContraints = {
            width: 750,
            height: 500,
            facingMode: 'user'
        };

        return(
            <div>
                <div>
                    <Webcam 
                        ref = {this.setRef}
                        audio = {false}
                        height = {250}
                        width = {375}
                        screenshotFormat = "image/jpeg"
                        videoConstraints = {videoContraints}/>
                </div>
                <button variant = 'primary' onClick = {this.startCapturing}>Start Game</button>
            </div>
        )
    }
}

export default MyWebcam;