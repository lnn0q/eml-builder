import ComponentEditor from "./ComponentEditor";
import EditToolbar from "./EditToolbar";

import { useEffect, useState } from "react";

const EditorComponent = ({
  element,
  isEditMode,
  handleDragOverDroppable,
  handleEditElement,
  handleRemoveElement,
  handleDragStartExisting,
  editElement,
  handleConfirmEdit,
}) => {
  const [color, setColor] = useState(element.color);
  const [text, setText] = useState(element.text);
  const [width, setWidth] = useState(element.width);
  const [height, setHeight] = useState(element.height);
  const [alt, setAlt] = useState(element.alt);
  const [img, setImg] = useState(element.img);
  const [link, setLink] = useState(element.link);

  useEffect(() => {
    setColor(element.color);
    setText(element.text);
    setWidth(element.width);
    setHeight(element.height);
    setAlt(element.alt);
    setImg(element.img);
    setLink(element.link);
  }, [element]);

  const handleInputColor = (e) => {
    setColor(e.target.value);
  };
  const handleInputText = (e) => {
    setText(e.target.value);
  };
  const handleInputWidth = (e) => {
    setWidth(e.target.value);
  };
  const handleInputHeight = (e) => {
    setHeight(e.target.value);
  };
  const handleInputAlt = (e) => {
    setAlt(e.target.value);
  };
  const handleInputImg = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      const base64Image = reader.result;
      setImg(base64Image);
    };
    reader.readAsDataURL(file);
  };
  const handleInputLink = (e) => {
    setLink(e.target.value);
  };

  return (
    <div
      pos={element.pos}
      onDragOver={handleDragOverDroppable}
      className={
        isEditMode
          ? "editor__dragComponent editor__dragComponent--editMode"
          : "editor__dragComponent"
      }
    >
      {isEditMode ? (
        <EditToolbar
          element={element}
          handleRemoveElement={handleRemoveElement}
          handleDragStartExisting={handleDragStartExisting}
          handleEditElement={handleEditElement}
          editElement={editElement}
          handleConfirmEdit={handleConfirmEdit}
          color={color}
          text={text}
          width={width}
          height={height}
          alt={alt}
          img={img}
          link={link}
        />
      ) : null}

      {editElement === element.pos ? (
        <ComponentEditor
          element={element}
          color={color}
          text={text}
          width={width}
          height={height}
          alt={alt}
          img={img}
          link={link}
          handleInputColor={handleInputColor}
          handleInputText={handleInputText}
          handleInputWidth={handleInputWidth}
          handleInputHeight={handleInputHeight}
          handleInputAlt={handleInputAlt}
          handleInputImg={handleInputImg}
          handleInputLink={handleInputLink}
        />
      ) : element.type === "text" ? (
        <div style={{ color: element.color }}>{element.text}</div>
      ) : element.type === "img" ? (
        <img
          src={element.img}
          alt={element.alt}
          width={element.width}
          height={element.height}
          style={{ objectFit: "cover" }}
        />
      ) : element.type === "link" ? (
        <a src={element.link} style={{ color: element.color }}>
          {element.text}
        </a>
      ) : null}
    </div>
  );
};

export default EditorComponent;
