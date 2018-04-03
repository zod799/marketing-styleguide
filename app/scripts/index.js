import '../styles/index.scss'
import '../styles/templates.scss'

//Start index.js scripts

/* Script to add highlighting to specific non-string codeblock items
 * Token (one at start, one at end): ##
 */
document.onreadystatechange = function () {
  if (document.readyState === 'complete') {

    var Arr = document.getElementsByClassName('hljs-string');
    for (let index in Arr){
      if (Arr.hasOwnProperty(index)) {
        if(Arr[index].textContent.indexOf('##') > 0) {
          let sliceStr = Arr[index].innerHTML.slice(Arr[index].innerHTML.indexOf('##'),Arr[index].innerHTML.lastIndexOf('##') + 2)
          let html = '<span class="important-code">' + sliceStr.replace(/##/g,'') + '</span>'
          Arr[index].innerHTML = Arr[index].innerHTML.replace(sliceStr,html);
        }
      }
    }

  }
}

/* Creates clipboard functionality for the code snippets
 * Uses: Clipboard.js
 */
var clipboard = new Clipboard('.clipboardBtn', {
    target: function(trigger) {
        return trigger.nextElementSibling.firstElementChild;
    }
});
clipboard.on('success', function(event) {
  event.clearSelection();
  var copyConfirmed = document.createElement('span');
  copyConfirmed.setAttribute('id', 'copiedClipboard');
  copyConfirmed.setAttribute('class', 'copied');
  copyConfirmed.innerHTML = 'Copied';
  event.trigger.appendChild(copyConfirmed);
  window.setTimeout(function() {
    document.getElementById('copiedClipboard').remove();
  }, 500);
});