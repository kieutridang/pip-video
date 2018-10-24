const getAPI = (url, options) => {
  const method = options && options.method || 'GET'
  const promise = new Promise((resolve, reject) => {
    const request = new XMLHttpRequest();
    request.onreadystatechange = () => {
      try {
        if (request.readyState == 4 && request.status == 200) {
          // Typical action to be performed when the document is ready:
          const data = JSON.parse(request.responseText);
          resolve(data);
        }
      } catch (error) {
        reject(error);
      }
    }
    request.open(method, url);
    request.send();
  })
  return promise;
}

module.exports.getAPI = getAPI;