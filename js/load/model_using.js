let modelJson = null;

async function loadModel(){
    let url = window.location.href.replace(window.location.href.substring(window.location.href.lastIndexOf('/') + 1),'');
    modelJson = await tf.loadLayersModel( url + 'data/my-model.json' );
}
function guessIt(imageToGuess){
  let inputTensor = tf.browser.fromPixels(document.getElementById('imageResult'), 1)
    .reshape([1, 28, 28, 1])
    .cast('float32');
  let predictionResult =  modelJson.predict(inputTensor).dataSync();
  let recognizedDigit = predictionResult.indexOf(Math.max(...predictionResult));
  console.log(recognizedDigit);
  console.log(predictionResult);
}

document.addEventListener('DOMContentLoaded', loadModel);
