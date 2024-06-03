import React from "react";

const EditorHeader = ({
  mailData,
  handleInputSender,
  handleInputRecipient,
  handleInputSubject,
  handleInputDate,
  handleDate,
  handleInputBackground,
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
          className="editor__headerInput"
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
          className="editor__headerInput"
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
          className="editor__headerInput"
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
            className="editor__headerInput"
          />
          <button className="editor__headerDateButton" onClick={handleDate}>
            &#xf16e2;
          </button>
        </div>
      </div>
      <div className="editor__headerField">
        <div className="editor__headerColorContainer">
          <div className="editor__headerLabelColor">Background:</div>
          <input
            type="color"
            value={mailData.bodyColor}
            onChange={handleInputBackground}
            className="editor__headerInputColor"
          />
        </div>
      </div>
    </div>
  );
};

export default EditorHeader;
