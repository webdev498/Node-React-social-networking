import React from 'react';
import Book from './book';

const BookRow = props => (
	<div className={props.smallBooks?'book-blocks book-blocks-small':'book-blocks'}>
		{props.title?(<div className="title-row">
				<h3>{props.title}</h3>
				<a className="expand-control" href={props.link}>All {props.title}</a>
		</div>): ''}
			{props.books?(
				<ul>
					{props.books.map((book, key)=>(
						<Book userBooks={props.userBooks} book={book} key={key} user={props.user} followBook={props.followBook} unfollowBook={props.unfollowBook}/>
					))}
					<li></li>
					<li></li>
				</ul>
			):''}
	</div>
)

export default BookRow;