import "./styles/Editor.css";
import { useEffect, useState } from "react";

const Editor = () => {
  const [mailData, setMailData] = useState({
    Sender: "John Doe",
    Recipient: "James Johnson",
    Subject: "Test Subject",
    Date: "12.12.2024",
    bodyColor: "#ffffff",
    template: [
      {
        type: "text",
        text: "Some random text.",
        color: "#000fff",
        id: 1,
      },
      {
        type: "img",
        alt: "img",
        img: "",
        id: 2,
      },
      {
        type: "link",
        text: "Redirect",
        color: "#000000",
        link: "",
        id: 3,
      },
    ],
  });

  // useEffect(() => {}, [mailData]);

  const [isDragging, setIsDragging] = useState(false);
  const [draggedElement, setDraggedElement] = useState(null);
  const [dropPlace, setDropPlace] = useState(null);
  const [isEditMode, setEditMode] = useState(false);

  const handleDragStartNew = (e) => {
    setIsDragging(true);
    const element = e.target;
    let elementProps;

    switch (element.dataset.type) {
      case "text":
        elementProps = { type: "text", text: "Text", color: "#000000" };
        break;
      case "img":
        elementProps = { type: "img", alt: "img", img: "" };
        break;
      case "link":
        elementProps = {
          type: "link",
          text: "link",
          color: "#000000",
          link: "",
        };
        break;
    }
    setDraggedElement(elementProps);
  };

  const handleDragStartExisting = (e) => {
    setIsDragging(true);
    setDraggedElement({
      alreadyExists: true,
      id: e.target.id,
    });
  };

  const handleDragEnd = (e) => {
    setIsDragging(false);
    setDraggedElement(null);
    setDropPlace(null);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    let newMailTemplate;
    if (draggedElement.alreadyExists) {
      let newId;
      if (dropPlace) {
        newId = dropPlace;
        // console.log(dropPlace);
      } else {
        newId = mailData.template[mailData.template.length - 1].id;
      }
      newMailTemplate = mailData.template.map((element) => {
        if (element.id == draggedElement.id) {
          element.id = newId;
        } else if (element.id == newId) {
          element.id = draggedElement.id;
        }
        return element;
      });
    } else {
      // console.log(dropPlace);
      if (dropPlace) {
        draggedElement.id = dropPlace;
      } else {
        draggedElement.id =
          mailData.template[mailData.template.length - 1].id + 1;
      }
      newMailTemplate = mailData.template.map((element) => {
        if (draggedElement.id <= element.id) {
          element.id = element.id + 1;
        }
        return element;
      });
      newMailTemplate.push(draggedElement);
    }
    newMailTemplate.sort((a, b) => a.id - b.id);
    setMailData({ ...mailData, template: newMailTemplate });
    setIsDragging(false);
    setDraggedElement(null);
    setDropPlace(null);
    // console.log(dropPlace);
    // console.log(newMailTemplate);
    // console.log(isDragging + " " + draggedElement);
  };

  const checkPosition = (e) => {
    const element = e.target;
    const rect = element.getBoundingClientRect();
    const mouseY = e.clientY - rect.top;

    if (mouseY <= rect.height / 2) {
      setDropPlace(e.target.id);
    } else {
      setDropPlace(e.target.id);
    }
    // console.log("Check position ID - " + e.currentTarget.id);
  };

  const handleEditMode = (e) => {
    e.preventDefault();
    setEditMode(true);
  };

  const handleEditClose = (e) => {
    e.preventDefault();
    setEditMode(false);
  };

  const handleInputSender = (e) => {
    setMailData({ ...mailData, Sender: e.target.value });
  };

  const handleInputRecipient = (e) => {
    setMailData({ ...mailData, Recipient: e.target.value });
  };

  const handleInputSubject = (e) => {
    setMailData({ ...mailData, Subject: e.target.value });
  };

  const handleInputDate = (e) => {
    setMailData({ ...mailData, Date: e.target.value });
  };

  const handleDate = (e) => {
    e.preventDefault();
  };

  return (
    <form className="editor">
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
          <input type="text" name="date" onChange={handleInputDate} />
          <button className="editor__headerDateButton" onClick={handleDate}>
            &#xf16e2;
          </button>
        </div>
      </div>
      <div
        className="editor__view"
        id="view-drop"
        style={{ backgroundColor: mailData.bodyColor }}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        {mailData.template.map((element) => {
          return element.type === "text" ? (
            <div
              key={element.id}
              id={element.id}
              style={{ color: element.color }}
              onDragOver={checkPosition}
              draggable={isEditMode ? true : false}
              onDragStart={handleDragStartExisting}
              className={
                isEditMode
                  ? "editor__dragComponent editor__dragComponent--editMode"
                  : "editor__dragComponent"
              }
            >
              {element.text}
            </div>
          ) : element.type === "img" ? (
            <div
              key={element.id}
              id={element.id}
              onDragOver={checkPosition}
              draggable={isEditMode ? true : false}
              onDragStart={handleDragStartExisting}
              className={
                isEditMode
                  ? "editor__dragComponent editor__dragComponent--editMode"
                  : "editor__dragComponent"
              }
            >
              <img src={element.img} alt={element.alt} />
            </div>
          ) : element.type === "link" ? (
            <div
              key={element.id}
              id={element.id}
              style={{ color: element.color }}
              onDragOver={checkPosition}
              draggable={isEditMode ? true : false}
              onDragStart={handleDragStartExisting}
              className={
                isEditMode
                  ? "editor__dragComponent editor__dragComponent--editMode"
                  : "editor__dragComponent"
              }
            >
              <a>{element.text}</a>
            </div>
          ) : null;
        })}
        <div className="editor__editButtonContainer">
          {isEditMode ? (
            <button
              className="editor__editButton editor__editButton--confirm"
              onClick={handleEditClose}
            >
              &#xf42e;
            </button>
          ) : (
            <button
              className="editor__editButton editor__editButton--edit"
              onClick={handleEditMode}
            >
              &#xf11e7;
            </button>
          )}
        </div>
      </div>
      <div
        className={
          isEditMode
            ? "editor__componentsPanel editor__componentsPanel--edit"
            : "editor__componentsPanel"
        }
      >
        {isEditMode ? (
          <>
            <div
              data-type="text"
              draggable
              onDragStart={handleDragStartNew}
              onDragEnd={handleDragEnd}
            >
              text
            </div>
            <div
              data-type="img"
              draggable
              onDragStart={handleDragStartNew}
              onDragEnd={handleDragEnd}
            >
              img
            </div>
            <div
              data-type="link"
              draggable
              onDragStart={handleDragStartNew}
              onDragEnd={handleDragEnd}
            >
              link
            </div>
          </>
        ) : null}
      </div>
      <div className="editor__buttonPanel">
        <button>Save</button>
        <button>Preview</button>
        <button>Download</button>
      </div>
    </form>
  );
};

export default Editor;
