import getConfig from 'next/config';
import firebase from 'firebase/app'
// import { userService } from 'services';

const { publicRuntimeConfig } = getConfig();

export const fetchWrapper = {
    get,
    post,
    put,
    delete: _delete
};

export function getAPIDomain() {
    const local = process.env.NEXT_PUBLIC_ENV === 'local'
    if (local) {
        return "127.0.0.1:8000"
    } else {
        return ""
    }
}

export function getAPIURL(uri) {
    let protocol = (location.protocol === "https:") ? "https://" : "http://";
    return protocol + getAPIDomain() + uri;
}

function get(url) {
    return getAuthHeader().then(headers => {
        const requestOptions = {
            method: 'GET',
            headers: headers,
        };
        console.log(requestOptions)
        return fetch(url, requestOptions).then(handleResponse).catch(error => {
            console.log(error);
        })
    });
}

function post(url, body) {
    // const requestOptions = {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json', ...authHeader(url) },
    //     credentials: 'include',
    //     body: JSON.stringify(body)
    // };
    // return fetch(url, requestOptions).then(handleResponse);
    return getAuthHeader().then(headers => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', ...headers },
            credentials: 'include',
            body: JSON.stringify(body)
        };
        return fetch(url, requestOptions).then(handleResponse).catch(error => {
            console.log(error);
        });
    });
}

function put(url, body) {
    // const requestOptions = {
    //     method: 'PUT',
    //     headers: { 'Content-Type': 'application/json', ...authHeader(url) },
    //     body: JSON.stringify(body)
    // };
    // return fetch(url, requestOptions).then(handleResponse);  
    return getAuthHeader().then(headers => {
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json', ...headers },
            body: JSON.stringify(body)
        };
        return fetch(url, requestOptions).then(handleResponse).catch(error => {
            console.log(error);
        });
    });
}

// prefixed with underscored because delete is a reserved word in javascript
function _delete(url) {
    // const requestOptions = {
    //     method: 'DELETE',
    //     headers: authHeader(url)
    // };
    // return fetch(url, requestOptions).then(handleResponse);
    return getAuthHeader().then(headers => {
        const requestOptions = {
            method: 'DELETE',
            headers: headers
        };
        return fetch(url, requestOptions).then(handleResponse).catch(error => {
            console.log(error);
        });
    });
}

// helper functions

async function getAuthHeader() {
    let token;
    if (!token) {
        try {
            token = await firebase.auth().currentUser.getIdToken( /* forceRefresh */ true);
        } catch (e) {
            alert(e);
            return {};
        }
    }
    if (token) {
        return { 'Authorization': `JWT ${token}` };
    } else {
        return {};
    }
}

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if ([401, 403].includes(response.status)) {
                // auto logout if 401 Unauthorized or 403 Forbidden response returned from api
                alert(text);
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }
        return data;
    });
}