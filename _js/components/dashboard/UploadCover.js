import React from 'react';
// import { validate, formValid } from '../../plugins/validation';

const UploadCover = props => {
  const { author, title, coverFile, handleChange, coverAdd } = props;

  return (
    <div>
      <h4><span>Step 1.</span> Upload Cover Art</h4>
      <ul className="field-list field-list-split">
        <li>
          <div className="copy">
            <p>Preview</p>
          </div>
          <div className="book-blocks book-blocks-single book-blocks-preview">
            <ul>
              <li>
                <div className="content-block content-block-book">
                  <figure>
                    <Cover title={title} coverFile={coverFile} />
                    <Caption title={title} author={author} />
                  </figure>
                </div>
              </li>
            </ul>
          </div>
        </li>
        <li>
          <Information
            title={title}
            handleChange={handleChange}
            coverAdd={coverAdd}
          />
        </li>
      </ul>
    </div>
  );
};

const Caption = ({ title, author, stars = 5 }) => (
  <figcaption>
    <BookTitle title={title} />
    <AuthorName author={author} />
    <Rating stars={stars} />
  </figcaption>
);

export const Cover = ({ coverFile }) => (
  <div className="cover">
    <div className="flex">
      <img src={coverFile} alt="defaultCoverFile" />
    </div>
  </div>
);

const BookTitle = ({ title }) => <h4>{title || 'Title Area'}</h4>;
const AuthorName = ({ author }) => <p>by {author || '[Author Name]'}</p>;

const Rating = ({ stars = 5 }) => {
  const starsRated = [];
  for (let i = 0; i < stars; i += 1) {
    starsRated.push(<li key={i} />);
  }
  return (
    <ul className="rating-display">
      {starsRated}
    </ul>
  );
};

const Information = ({ title, handleChange, coverAdd, validate }) => (
  <div className="copy">
    <p>Add Basic Information</p>
    <div id="coverForm">
      <ul className="inner-fields">
        <li>
          <label htmlFor="title"><span>*</span>Book Title</label>
          <input
            id="title" name="title" type="text" onBlur={validate}
            onChange={handleChange} value={title} data-validation="name, required"
          />
        </li>
        <li>
          <label htmlFor="cover"><span>*</span>Upload Cover Art</label>
          <input id="cover" type="file" onChange={coverAdd} />
          <small>
            Max size of 15 MB<br />
            Dimensions are X by X<br />
            Needs to be jpg, png, or gif
            </small>
          <button id="coverSubmit" type="submit" style={{ display: 'none' }} />
        </li>
      </ul>
    </div>
  </div>
);

export default UploadCover;