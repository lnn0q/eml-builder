import React from "react";

const EditorHeader = ({
  mailData,
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
          value={mailData.Sender}
          onChange={handleInputSender}
          required
        />
      </div>
      <div className="editor__headerField">
        <div>To:</div>
        <input
          type="email"
          name="recipient"
          value={mailData.Recipient}
          onChange={handleInputRecipient}
          required
        />
      </div>
      <div className="editor__headerField">
        <div>Subject:</div>
        <input
          type="text"
          name="subject"
          value={mailData.Subject}
          onChange={handleInputSubject}
          required
        />
      </div>
      <div className="editor__headerField editor__headerField--date">
        <div>Date:</div>
        <div className="editor__headerDateContainer">
          <input
            type="text"
            name="date"
            value={mailData.Date}
            onChange={handleInputDate}
          />
          <button className="editor__headerDateButton" onClick={handleDate}>
            &#xf16e2;
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditorHeader;
