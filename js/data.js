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

const sendData = (url, onSuccess, onFail, body) => {
  fetch(url, {
    method: 'POST',
    body,
  })
    .then((response) => {
      if (response.ok) {
        console.log(1);
        onSuccess();
      } else {
        console.log(2);
        onFail();
      }
    })
    .catch(() => {
      console.log(3);
      onFail();
    });
};

export {getData, sendData};
