// file for common function
async function downloadModel(){
  await model.save('localstorage://my-model');
}

function enableDownloadButton() {
  document.getElementById("downloadButton").disabled = false;
}

function enableTrainingButton() {
  document.getElementById("trainingButton").disabled = false;
}

document.addEventListener('DOMContentLoaded', enableTrainingButton);