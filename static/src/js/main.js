window.Location.prototype.setHref = href => window.location.href = href;
window.Location.prototype.redirectTo = pathname => window.location.pathname = pathname;

var NodeListToArray = list => [].slice.call(list);

;(function() {
	const posts = document.getElementsByClassName('post');
	const postList = NodeListToArray(posts);

	postList.forEach((item, i, arr) => {
		var deleteBtn = item.getElementsByClassName('post__delete')[0];
		var id = item.getElementsByClassName('post__id')[0];

		if (deleteBtn)
			deleteBtn.onclick = () => Post.delete(id.innerHTML, '');
	});

})();