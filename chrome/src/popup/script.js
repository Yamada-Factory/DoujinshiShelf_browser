function send() {
    const sendMessage = {
        'type': 'Dojinshi',
        'content': {
            'message': ''
        }
    }
    chrome.tabs.query({ active: true, currentWindow: true }, aim_message);
    function aim_message(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, 'Hello World', function(res) {
          console.log(res.contents);
          viewDojin(res)
      });
    }
    console.log('send')
}

document.getElementById('reload').onclick = send

send()


/**
 * @param {array} data 
 */
function viewDojin(data = []) {
    document.getElementById('title').innerHTML = data.contents.title
    document.getElementById('circle').innerHTML = data.info.circle.name
    document.getElementById('author').innerHTML = data.info.author.name
    document.getElementById('main-thumb').src = data.contents.image.main
    document.getElementById('createdat').value = formatDate(new Date())
}

/**
 * @param {Date} dt 
 * @returns {string}
 */
function formatDate(dt) {
    var y = dt.getFullYear();
    var m = ('00' + (dt.getMonth()+1)).slice(-2);
    var d = ('00' + dt.getDate()).slice(-2);
    return (y + '-' + m + '-' + d);
}
