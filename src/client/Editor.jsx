import "./styles/Editor.css";

import EditorHeader from "./EditorBlocks/EditorHeader";
import EditorView from "./EditorBlocks/EditorView";
import EditorComponentsPanel from "./EditorBlocks/EditorComponentsPanel";
import EditorButtonPanel from "./EditorBlocks/EditorButtonPanel";

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Editor = () => {
  const { id } = useParams();

  // Init

  const [isLoading, setIsLoading] = useState(true);
  const [errMsg, setErrMsg] = useState(null);
  const [mailData, setMailData] = useState();

  // Functionality

  const [isDragging, setIsDragging] = useState(false);
  const [draggedElement, setDraggedElement] = useState(null);
  const [dropPlace, setDropPlace] = useState(null);
  const [isEditMode, setEditMode] = useState(false);
  const [editElement, setEditElement] = useState(null);

  // Dependency

  useEffect(() => {
    fetchMailData();
  }, []);

  const fetchMailData = async () => {
    try {
      if (id) {
        const res = await fetch(`/api/template/${id}`);
        if (!res.ok) throw Error("Failed recieve data");
        let resMailData = await res.json();
        setMailData(resMailData);
        setIsLoading(false);
      } else {
        setMailData({
          Sender: "",
          Recipient: "",
          Subject: "",
          Date: "",
          bodyColor: "#ffffff",
          template: [],
        });
        setIsLoading(false);
      }
    } catch (err) {
      setErrMsg(err.message);
    }
  };

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
      ...mailData[Number(e.target.dataset.pos) - 1],
      alreadyExists: true,
      pos: Number(e.target.dataset.pos),
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
    setDropPlace(Number(e.currentTarget.pos));
  };

  const handleDrop = (e) => {
    e.preventDefault();
    // console.log("Dropping on:" + dropPlace);
    let newMailTemplate;
    if (draggedElement.alreadyExists) {
      let newPos;
      if (dropPlace) {
        newPos = dropPlace;
        // console.log(dropPlace);
      } else {
        newPos = mailData.template[mailData.template.length - 1].pos;
      }
      newMailTemplate = mailData.template.map((element) => {
        if (element.pos === draggedElement.pos) {
          element.pos = newPos;
        } else if (element.pos === newPos) {
          element.pos = draggedElement.pos;
        }
        return element;
      });
      // console.log(newMailTemplate[draggedElement.id]);
    } else {
      // console.log(dropPlace);
      if (dropPlace) {
        draggedElement.pos = dropPlace;
      } else if (mailData.template.length === 0) {
        draggedElement.pos = 1;
      } else {
        draggedElement.pos =
          mailData.template[mailData.template.length - 1].pos + 1;
      }
      newMailTemplate = mailData.template.map((element) => {
        if (draggedElement.pos <= element.pos) {
          element.pos = element.pos + 1;
        }
        return element;
      });
      newMailTemplate.push(draggedElement);
      // console.log(newMailTemplate[draggedElement.id]);
    }
    newMailTemplate.sort((a, b) => a.pos - b.pos);
    setMailData({ ...mailData, template: newMailTemplate });
    // console.log(draggedElement);
    // console.log(newMailTemplate);
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
    setEditElement(Number(e.target.dataset.pos));
    // console.log(mailData.template[Number(e.target.dataset.id - 1)]);
    // console.log(e.target.dataset.id);
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
      return element.pos !== Number(e.target.dataset.pos);
    });
    newMailTemplate.sort((a, b) => a.pos - b.pos);
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

  const handleInputBackground = (e) => {
    setMailData({ ...mailData, bodyColor: e.target.value });
  };

  // Header "get date" button
  const handleDate = (e) => {
    e.preventDefault();
    const date = new Date().toUTCString();
    setMailData({ ...mailData, Date: date });
  };

  // Form the final eml

  const handleEmlDownload = () => {};

  return isLoading ? (
    <div>Loading...</div>
  ) : !isLoading && errMsg ? (
    <div>{errMsg}</div>
  ) : (
    <form className="editor">
      <EditorHeader
        mailData={mailData}
        handleInputSender={handleInputSender}
        handleInputRecipient={handleInputRecipient}
        handleInputSubject={handleInputSubject}
        handleInputDate={handleInputDate}
        handleDate={handleDate}
        handleInputBackground={handleInputBackground}
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
