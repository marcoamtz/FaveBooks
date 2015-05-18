var bookList = Alloy.Collections.books,
	addBook = function () {
		var book = Alloy.createModel(
			'books', 
			{
				title : $.titleInput.value,
				author : $.authorInput.value
			}
		);

		bookList.add(book);
		book.save();

		$.addbook.close();
	};

$.insertBookButton.addEventListener('click', addBook);