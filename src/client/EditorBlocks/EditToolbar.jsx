const EditToolbar = ({
  element,
  handleEditElement,
  handleRemoveElement,
  handleDragStartExisting,
  editElement,
  handleConfirmEdit,
  color,
  text,
  width,
  height,
  alt,
  img,
  link,
}) => {
  return (
    <div className="editor__editToolbar">
      <div className="editor__toolbarTitle">{element.type}</div>
      <div
        className={
          editElement != element.id
            ? "editor__toolbarButtonContainer"
            : "editor__toolbarButtonContainer editor__toolbarButtonContainer--selected"
        }
      >
        {editElement != element.id ? (
          <button
            data-id={element.id}
            onClick={handleEditElement}
            className="editor__editComponentButton editor__editComponentButton--edit"
          >
            &#xf044;
          </button>
        ) : (
          <button
            data-id={element.id}
            onClick={(e) =>
              handleConfirmEdit(e, color, text, width, height, alt, img, link)
            }
            className="editor__editComponentButton editor__editComponentButton--editConfirm"
          >
            &#xf00c;
          </button>
        )}
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
          draggable
          onDragStart={handleDragStartExisting}
          className="editor__editComponentButton editor__editComponentButton--handlePull"
        >
          &#xf01db;
        </button>
      </div>
    </div>
  );
};

export default EditToolbar;
