import { run, model } from "./script.js";

// file for common function
async function downloadModel(){
  if (model !== undefined){
    await model.save('downloads://my-model');
  }
}

function enableDownloadButton() {
  document.getElementById("downloadButton").disabled = false;
}

function enableTrainingButton() {
  document.getElementById("trainingButton").disabled = false;
}

async function startTraining (){
  run().then(()=>{
    enableDownloadButton();
  });
}
document.addEventListener('DOMContentLoaded', enableTrainingButton);

//we bind the main function to the click event
document.getElementById("trainingButton").addEventListener("click", startTraining);
document.getElementById("downloadButton").addEventListener("click", downloadModel);
