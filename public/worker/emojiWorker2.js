
onmessage = async function(e) {
  
    postMessage(e.data[0].find((_emoji)=>_emoji.emoji==e.data[1]));
  }