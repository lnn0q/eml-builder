import "./styles/Editor.css";

import EditorHeader from "./EditorBlocks/EditorHeader";
import EditorView from "./EditorBlocks/EditorView";
import EditorComponentsPanel from "./EditorBlocks/EditorComponentsPanel";
import EditorButtonPanel from "./EditorBlocks/EditorButtonPanel";

import { useEffect, useState } from "react";

const Editor = () => {
  const [mailData, setMailData] = useState({
    Sender: "John Doe",
    Recipient: "James Johnson",
    Subject: "Test Subject",
    Date: "Thu, 3 Mar 2024 12:00:00 +0100",
    bodyColor: "#ffffff",
    template: [
      {
        type: "text",
        text: "Test",
        color: "#000fff",
        id: 1,
      },
      {
        type: "text",
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        color: "#000000",
        id: 2,
      },
      {
        type: "img",
        alt: "img",
        width: "250px",
        height: "250px",
        img: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.xn--perrosrazapequea-lub.com%2Fwp-content%2Fuploads%2F2018%2F05%2Fpug-2048x1398.jpg&f=1&nofb=1&ipt=2a85679831aec9a8cf93ee897cd5ea6810323781b89c5655a5cfacf43fbf1ed7&ipo=images",
        id: 3,
      },
      {
        type: "link",
        text: "Redirect",
        color: "#000000",
        link: "#",
        id: 4,
      },
    ],
  });

  // useEffect(() => {}, [mailData]);

  const [isDragging, setIsDragging] = useState(false);
  const [draggedElement, setDraggedElement] = useState(null);
  const [dropPlace, setDropPlace] = useState(null);
  const [isEditMode, setEditMode] = useState(false);
  const [editElement, setEditElement] = useState(null);

  // DnD functions

  const handleDragStartNew = (e) => {
    setIsDragging(true);
    const element = e.target;
    let elementProps;

    switch (element.dataset.type) {
      case "text":
        elementProps = { type: "text", text: "Text", color: "#000000" };
        break;
      case "img":
        elementProps = {
          type: "img",
          alt: "img",
          img: "",
          width: "250px",
          height: "250px",
        };
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
      id: e.target.dataset.id,
    });
    // console.log("Dragging id: " + e.target.dataset.id);
  };

  const handleDragEnd = (e) => {
    setIsDragging(false);
    setDraggedElement(null);
    setDropPlace(null);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDragOverDroppable = (e) => {
    e.preventDefault();
    setDropPlace(e.currentTarget.id);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    // console.log("Dropping on:" + dropPlace);
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
      } else if (mailData.template.length === 0) {
        draggedElement.id = 1;
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

  // Edit mode hanlders

  const handleEditMode = (e) => {
    e.preventDefault();
    setEditMode(true);
    setTimeout(() => {
      window.scrollTo(0, document.body.scrollHeight);
    }, 300);
  };

  const handleEditClose = (e) => {
    e.preventDefault();
    setEditElement(null);
    setEditMode(false);
  };

  // EditMode Draggable element handlers

  const handleEditElement = (e) => {
    e.preventDefault();
    setEditElement(e.target.dataset.id);
  };

  const handleConfirmEdit = (e, color, text, width, height, alt, img, link) => {
    e.preventDefault();
    const newMailTemplate = mailData.template.map((element) => {
      return element;
    });
    // console.log(newMailTemplate);
    color ? (newMailTemplate[editElement - 1].color = color) : null;
    text ? (newMailTemplate[editElement - 1].text = text) : null;
    width ? (newMailTemplate[editElement - 1].width = width) : null;
    height ? (newMailTemplate[editElement - 1].height = height) : null;
    alt ? (newMailTemplate[editElement - 1].alt = alt) : null;
    img ? (newMailTemplate[editElement - 1].img = img) : null;
    link ? (newMailTemplate[editElement - 1].link = link) : null;
    setMailData({ ...mailData, template: newMailTemplate });
    setEditElement(null);
  };

  const handleRemoveElement = (e) => {
    e.preventDefault();
    const newMailTemplate = mailData.template.filter((element) => {
      return element.id != e.target.dataset.id;
    });
    newMailTemplate.sort((a, b) => a.id - b.id);
    setMailData({ ...mailData, template: newMailTemplate });
  };

  // Input handlers

  // Header inputs
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

  // Header "get date" button
  const handleDate = (e) => {
    e.preventDefault();
  };

  return (
    <form className="editor">
      <EditorHeader
        mailData={mailData}
        handleInputSender={handleInputSender}
        handleInputRecipient={handleInputRecipient}
        handleInputSubject={handleInputSubject}
        handleInputDate={handleInputDate}
        handleDate={handleDate}
      />
      <EditorView
        mailData={mailData}
        isEditMode={isEditMode}
        handleDragStartNew={handleDragStartNew}
        handleDragStartExisting={handleDragStartExisting}
        handleDragEnd={handleDragEnd}
        handleDragOver={handleDragOver}
        handleDragOverDroppable={handleDragOverDroppable}
        handleDrop={handleDrop}
        handleEditMode={handleEditMode}
        handleEditClose={handleEditClose}
        handleRemoveElement={handleRemoveElement}
        editElement={editElement}
        handleEditElement={handleEditElement}
        handleConfirmEdit={handleConfirmEdit}
      />
      <EditorComponentsPanel
        isEditMode={isEditMode}
        handleDragStartNew={handleDragStartNew}
        handleDragEnd={handleDragEnd}
      />
      <EditorButtonPanel />
    </form>
  );
};

export default Editor;
