window.Location.prototype.setHref = href => window.location.href = href;
window.Location.prototype.redirectTo = pathname => window.location.pathname = pathname;

class Post {
	static delete(id, token) {
		$.ajax({
			url: `/delete/${id}/`,
			csrfmiddlewaretoken: `${token}`,
			method: 'POST',
			headers: {
				"X-CSRFToken": $.cookie("csrftoken"),
			},
		});

		window.location.redirectTo('/');
	};
}

(function() {
	const posts = document.getElementsByClassName('post');

	for (let post of posts) {
		var deleteBtn = post.getElementsByClassName('post__delete')[0];
		var id = post.getElementsByClassName('post__id')[0];

		try {
			deleteBtn.onclick = () => Post.delete(id.innerHTML, '');
		} catch(e) {};
	}
})();