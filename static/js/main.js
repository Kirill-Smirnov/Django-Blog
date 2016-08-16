window.Location.prototype.setHref = href => window.location.href = href;
window.Location.prototype.redirectTo = pathname => window.location.pathname = pathname;

var NodeListToArray = list => [].slice.call(list)

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
	const postList = NodeListToArray(posts).reverse();

	for (let post of postList) {
		var deleteBtn = post.getElementsByClassName('post__delete')[0];
		var id = post.getElementsByClassName('post__id')[0];

		if (deleteBtn)
			deleteBtn.onclick = () => Post.delete(id.innerHTML, '');
		
	}
})();