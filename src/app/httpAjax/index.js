export const httpAjax = (method, url, response_type, body = null) => {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open(method, url, true);
        xhr.responseType = response_type;
        xhr.setRequestHeader("Accept", "text/html");
        xhr.setRequestHeader("Content-type", "text/html; charset=utf-8");
        xhr.onload = () =>
            xhr.status >= 400 ? reject(xhr.response) : resolve(xhr.response);
        xhr.onerror = () => reject(xhr.response);
        xhr.send(JSON.stringify(body));
    });
};

