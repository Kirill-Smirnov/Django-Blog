class Post {
	static delete(id, token) {
		// $.ajax({
		// 	url: `/delete/${id}/`,
		// 	csrfmiddlewaretoken: `${token}`,
		// 	method: 'POST',
		// 	headers: {
		// 		"X-CSRFToken": $.cookie("csrftoken"),
		// 	},
		// });

		AJAX.send({
			method: 'POST',
			url: `/delete/${id}/`,
			body: `csrfmiddlewaretoken=${token}`,
			headers: {
				"X-CSRFToken": Cookies.get("csrftoken"),
			}
		});

		window.location.redirectTo('/');
	};
}