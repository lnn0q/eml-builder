import EditorComponent from "./EditorComponent";

const EditorView = ({
  mailData,
  isEditMode,
  handleDragStartNew,
  handleDragStartExisting,
  handleDragEnd,
  handleDragOver,
  handleDragOverDroppable,
  handleDrop,
  handleEditMode,
  handleEditClose,
  handleEditElement,
  handleRemoveElement,
  editElement,
  handleConfirmEdit,
}) => {
  return (
    <div
      className={
        isEditMode ? "editor__view editor__view--editMode" : "editor__view"
      }
      id="view-drop"
      style={{ backgroundColor: mailData.bodyColor }}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      {mailData.template.map((element) => {
        return (
          <EditorComponent
            key={element.pos}
            element={element}
            isEditMode={isEditMode}
            handleDragOverDroppable={handleDragOverDroppable}
            handleEditMode={handleEditMode}
            handleRemoveElement={handleRemoveElement}
            handleDragStartExisting={handleDragStartExisting}
            handleEditElement={handleEditElement}
            editElement={editElement}
            handleConfirmEdit={handleConfirmEdit}
          />
        );
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
            className="editor__editButton editor__editButton--editMode"
            onClick={handleEditMode}
          >
            <div> &#xf11e7;</div>
          </button>
        )}
      </div>
    </div>
  );
};

export default EditorView;
