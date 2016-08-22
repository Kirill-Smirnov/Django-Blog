/*
* Created by Kirill Smirnov
*/


class AJAX {

	static send(settings) {
		const xhr = new XMLHttpRequest();

		xhr.open(settings.method, settings.url, true);
		
		if (settings.method === "POST") {
			for (let header in settings.headers) {
				xhr.setRequestHeader(header, settings.headers[header]);
			}

			xhr.send(settings.body)
		}

		else
			xhr.send()

		var response = this.isValid(xhr);

		// if (!response.status) {
		// 	throw new Error(`server responsed ${response.code}`)
		// }
	}

	static isValid(xhr) {
		return {
			status: xhr.status === 200,
			code: xhr.status
		};
	}
}