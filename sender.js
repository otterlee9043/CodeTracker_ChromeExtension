var video = document.getElementsByClassName("video-stream")[0];

function printCurrentTime() {
  const time = video.currentTime;
  //console.log(time);
  chrome.runtime.sendMessage({ currVideoTime: time }, function (response) {
    //console.log(response.res) ;
  });
}

setInterval(printCurrentTime, 1000);

//console.dir(video);
