let contextElement = null;

function flashSuccessMessage() {
  const div = document.createElement('div');
  const span = document.createElement('span');

  div.style.display = 'flex';
  div.style.placeContent = 'center';
  div.style.position = 'fixed';
  div.style.top = 0;
  div.style.left = 0;
  div.style.right = 0;
  span.style.fontFamily = 'Avenir,Helvetica,Arial,sans-serif';
  span.style.padding = '.5rem 1rem';
  span.style.background = '#68cd86';
  span.style.color = '#ffffff';
  span.style.borderLeft = '.25rem solid #42a85f';
  span.textContent = 'Copied!';

  div.appendChild(span);
  document.body.appendChild(div);

  setTimeout(() => {
    document.body.removeChild(div);
  }, 1000);
}

window.addEventListener('contextmenu', (event) => {
  contextElement = event.path.find((el) => el.id) || event.target;
}, true);

chrome.runtime.onMessage.addListener((request) => {
  if (request == 'copyAnchorToContextElement' && contextElement && contextElement.id) {
    const url = new URL(window.location.href);

    url.hash = contextElement.id;

    navigator.clipboard.writeText(url.href)
    .then(() => {
      console.log('Copied', url.href);

      flashSuccessMessage();
    })
    .catch((e) => {
      console.warn('Unable to copy anchor', url.href, e);
    });
  }
});
