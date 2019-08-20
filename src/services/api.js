const apiUrl = 'http://localhost:3000';

export const getUserById = (id) => {
  return fetch(`${apiUrl}/users/${id}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json, application/xml, text/plain, text/html, *.*',
    },
  })
    .then(response => response.json())
    .then(notes => notes)
    .catch(error => console.log(error));
};

export const signup = (user) => {
  return fetch(`${apiUrl}/signup`, {
    method: 'POST',
    body: JSON.stringify(user),
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
    },
  })
    .then(response => {
        return response.json();
    })
    .then(data => {
      if (data.status === 'error') {
        throw new Error(data.message);
      } else {
        return data;
      }
    }
      )
    .catch(error => console.log(error));
};


export const multipart = (data) => {
  return fetch(`${apiUrl}/users`, {
    method: 'POST',
    body: data
  })
    .then(response => {
        return response.json();
    })
    .then(data => {
      if (data.status === 'error') {
        throw new Error(data.message);
      } else {
        return data;
      }
    }
      )
    .catch(error => console.log(error));
};