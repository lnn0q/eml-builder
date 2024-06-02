const EditorComponent = ({
  element,
  isEditMode,
  handleDragOverDroppable,
  handleEditElement,
  handleRemoveElement,
  handleDragStartExisting,
}) => {
  return (
    <>
      <div
        id={element.id}
        onDragOver={handleDragOverDroppable}
        className={
          isEditMode
            ? "editor__dragComponent editor__dragComponent--editMode"
            : "editor__dragComponent"
        }
      >
        {isEditMode ? (
          <div className="editor__editToolbar">
            <div className="editor__toolbarTitle">{element.type}</div>
            <div className="editor__toolbarButtonContainer">
              <button
                data-id={element.id}
                onClick={handleEditElement}
                className="editor__editComponentButton editor__editComponentButton--edit"
              >
                &#xf044;
              </button>
              <button
                data-id={element.id}
                onClick={handleRemoveElement}
                onDragStart={handleDragStartExisting}
                className="editor__editComponentButton editor__editComponentButton--remove"
              >
                &#xf01b4;
              </button>
              <button
                onClick={(e) => {
                  e.preventDefault();
                }}
                data-id={element.id}
                draggable={isEditMode ? true : false}
                onDragStart={handleDragStartExisting}
                className="editor__editComponentButton editor__editComponentButton--handlePull"
              >
                &#xf01db;
              </button>
            </div>
          </div>
        ) : null}

        {element.type === "text" ? (
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
          <a src={element.link}>{element.text}</a>
        ) : null}
      </div>
    </>
  );
};

export default EditorComponent;
