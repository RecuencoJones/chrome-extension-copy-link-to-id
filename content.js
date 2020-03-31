let contextElement = null;

function flashSuccessMessage() {
  const notificationContainer = document.createElement('div');
  const notification = document.createElement('span');

  notificationContainer.style.display = 'flex';
  notificationContainer.style.placeContent = 'center';
  notificationContainer.style.position = 'fixed';
  notificationContainer.style.top = 0;
  notificationContainer.style.left = 0;
  notificationContainer.style.right = 0;
  notification.style.fontFamily = 'Avenir,Helvetica,Arial,sans-serif';
  notification.style.padding = '.5rem 1rem';
  notification.style.background = '#68cd86';
  notification.style.color = '#ffffff';
  notification.style.borderLeft = '.25rem solid #42a85f';
  notification.textContent = 'Copied!';

  notificationContainer.appendChild(notification);
  document.body.appendChild(notificationContainer);

  setTimeout(() => {
    document.body.removeChild(notificationContainer);
  }, 1000);
}

window.addEventListener('contextmenu', (event) => {
  contextElement = event.path.find((el) => el.id) || event.target;
}, true);

chrome.runtime.onMessage.addListener((request) => {
  if (request == 'copyAnchorToContextElement' && contextElement?.id) {
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
