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

var addBookHandler = function () {
	console.log('CLICK');
	var myAddBook = Alloy.createController('addbook', {}).getView();
	if (OS_IOS) {
		$.navGroupWin.openWindow(myAddBook);
	}
	if (OS_ANDROID) {
		myAddBook.open();
	}
};

if (OS_IOS) {
	console.log('menuItem', $.addBook);
	$.addBook.addEventListener('click', addBookHandler);
	$.navGroupWin.open();
}
if (OS_ANDROID) {
	console.log('View', $.index);
	$.index.addEventListener('open', function () {
		var activity = $.getView().activity;
		activity.onCreateOptionsMenu = function (e) {
			var menuItem = e.menu.add({
	            title : 'Add book',
	            showAsAction : Ti.Android.SHOW_AS_ACTION_IF_ROOM
	        });
	        console.log('menuItem', menuItem);

	        menuItem.addEventListener('click', addBookHandler);
        };
        activity.invalidateOptionsMenu();
        console.log('ACT', activity);	
	});
	$.index.open();
}
