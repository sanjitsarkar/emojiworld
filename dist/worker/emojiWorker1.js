
onmessage =  function(e) {
    // console.log('Message received from main script');
    // var workerResult = 'Result: ' + (e.data[0] * e.data[1]);
    // console.log('Posting message back to main script');
    const result =  e.data[0].filter(_emoji => {
      if((_emoji.category.toLowerCase().includes(e.data[1].toLowerCase()) || _emoji.description.toLowerCase().includes(e.data[1].toLowerCase() || _emoji.aliases.toLowerCase().includes(e.data[1].toLowerCase()))))
      {
        return true
      }
      return false
    
    })
    postMessage(result);
  }