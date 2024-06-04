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
  padding,
  bgColor,
}) => {
  return (
    <div className="editor__editToolbar">
      <div className="editor__toolbarTitle">{element.type}</div>
      <div
        className={
          editElement != element.pos
            ? "editor__toolbarButtonContainer"
            : "editor__toolbarButtonContainer editor__toolbarButtonContainer--selected"
        }
      >
        {editElement != element.pos ? (
          <button
            data-pos={element.pos}
            onClick={handleEditElement}
            className="editor__editComponentButton editor__editComponentButton--edit"
          >
            &#xf044;
          </button>
        ) : (
          <button
            data-pos={element.pos}
            onClick={(e) =>
              handleConfirmEdit(
                e,
                color,
                text,
                width,
                height,
                alt,
                img,
                link,
                padding,
                bgColor
              )
            }
            className="editor__editComponentButton editor__editComponentButton--editConfirm"
          >
            &#xf00c;
          </button>
        )}
        <button
          data-pos={element.pos}
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
          data-pos={element.pos}
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
