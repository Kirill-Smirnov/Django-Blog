/*
* Created by Kirill Smirnov
*/

const isRequestValid = (req) => req.status >= 200 && req.status < 400;

var setRequestHeaders = (req, headers) => {
    for (let header in headers) {
        req.setRequestHeader(header, headers[header]);
    }
    return req;
}

class AJAX {

    static send(settings) {
        this.xhr = new XMLHttpRequest();

        this.xhr.open(settings.method, settings.url, true);
        
        if (settings.method === "POST") {
            this.xhr = setRequestHeaders(this.xhr, settings.headers);

            this.xhr.send(settings.body);
        }

        else {
            this.xhr.send();
        }

        if (!isRequestValid()) {
            throw new Error(`server responsed ${response.code}`)
        }
    }
}
