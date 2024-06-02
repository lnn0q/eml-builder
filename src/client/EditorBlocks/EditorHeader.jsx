import React from "react";

const EditorHeader = ({
  handleInputSender,
  handleInputRecipient,
  handleInputSubject,
  handleInputDate,
  handleDate,
}) => {
  return (
    <div className="editor__headerPanel">
      <div className="editor__headerField">
        <div>From:</div>
        <input
          type="email"
          name="sender"
          onChange={handleInputSender}
          required
        />
      </div>
      <div className="editor__headerField">
        <div>To:</div>
        <input
          type="email"
          name="recipient"
          onChange={handleInputRecipient}
          required
        />
      </div>
      <div className="editor__headerField">
        <div>Subject:</div>
        <input
          type="text"
          name="subject"
          onChange={handleInputSubject}
          required
        />
      </div>
      <div className="editor__headerField editor__headerField--date">
        <div>Date:</div>
        <div className="editor__headerDateContainer">
          <input type="text" name="date" onChange={handleInputDate} />
          <button className="editor__headerDateButton" onClick={handleDate}>
            &#xf16e2;
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditorHeader;
