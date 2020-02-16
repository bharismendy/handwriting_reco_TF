let modelJson = null;

async function loadModel(){
    let url = window.location.href.replace(window.location.href.substring(window.location.href.lastIndexOf('/') + 1),'');
    modelJson = await tf.loadLayersModel( url + 'data/my-model.json' );
}
function guessIt(imageToGuess){
  const img = document.getElementById('imageResult')
   img.onload = function(){
   let inputTensor = tf.browser.fromPixels(document.getElementById('imageResult'), 1)// imageResult is an <img/> tag
      .reshape([1, 28, 28, 1])
      .cast('float32').sub(127).div(127);
    let predictionResult =  modelJson.predict(inputTensor).dataSync();
    let recognizedDigit = predictionResult.indexOf(Math.max(...predictionResult));
    let resultSpan = document.getElementById("result");
    resultSpan.textContent="Result :"+ recognizedDigit+" at "+Math.round(predictionResult[recognizedDigit]*100)+"%";
  }
}

document.addEventListener('DOMContentLoaded', loadModel);
