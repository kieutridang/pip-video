const request = new XMLHttpRequest();
const { getAPI } = require('./api');
const { ipcRenderer } = require('electron');

const requestUl = document.getElementById('request-ul');

getAPI('https://randomuser.me/api').then(response => {
  const result = response.results[0];
  for(let key in result) {
    const liElement = document.createElement('li');
    if(typeof result[key] != 'string') continue;
    liElement.innerHTML = `${key}: ${result[key]}`;
    ipcRenderer.send('log', result[key]);
    requestUl.append(liElement);
  }
});