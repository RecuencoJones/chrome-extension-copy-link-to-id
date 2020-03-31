function onclick(info, tab) {
  chrome.tabs.sendMessage(tab.id, 'copyAnchorToContextElement');
}

chrome.contextMenus.create({
  title: 'Copy link to anchor ID',
  contexts: [ 'selection' ],
  onclick
});
