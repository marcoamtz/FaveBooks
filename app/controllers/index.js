var bookList = Alloy.Collections.books,
	book = Alloy.createModel('books', {
		title : 'Un título',
		author : 'Un autor'
	});

bookList.add(book);
book.save();

$.itemList.addEventListener('itemclick', function (e) {
	var section = e.section,
		item = section.getItemAt(e.itemIndex),

		bookView = Alloy.createController(
			'bookdetails', 
			{
				title : item.properties.title,
				author : item.properties.author
			}
		).getView();

	if (OS_IOS) {
		$.navGroupWin.openWindow(bookView);
	}
	if (OS_ANDROID) {
		bookView.open();
	}
	
});

console.log('menuItem', $.addBook);
var initMenuItemListener = function () {
		$.addBook.addEventListener('click', function () {
		console.log('CLICK');
		var myAddBook = Alloy.createController('addbook', {}).getView();
		if (OS_IOS) {
			$.navGroupWin.openWindow(myAddBook);
		}
		if (OS_ANDROID) {
			myAddBook.open();
		}
	});
}


if (OS_IOS) {
	initMenuItemListener();
	$.navGroupWin.open();
}
if (OS_ANDROID) {
	var activity = $.getView().activity;
	activity.onCreateOptionsMenu = initMenuItemListener;
	console.log('ACT', activity);
	// $.index.open();
	$.getView().open();
}
