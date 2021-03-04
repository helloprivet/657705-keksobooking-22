const getData = (url, onSuccess, onFail) => {
  fetch(url)
    .then((response) => {
      if (response.ok) {
        response.json().then((data) => {
          onSuccess(data);
        });
      } else {
        onFail();
      }
    })
    .catch(() => {
      onFail();
    });
};

const sendData = (url, popupMessage, onFail, body, defaulReset) => {
  fetch(url, {
    method: 'POST',
    body,
  })
    .then((response) => {
      if (response.ok) {
        popupMessage(response.ok);
        defaulReset();
      } else {
        popupMessage();
      }
    })
    .catch(() => {
      onFail();
    });
};

export {getData, sendData};
