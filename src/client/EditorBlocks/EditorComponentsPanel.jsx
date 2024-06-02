const EditorComponentsPanel = ({
  isEditMode,
  handleDragStartNew,
  handleDragEnd,
}) => {
  return (
    <div
      className={
        isEditMode
          ? "editor__componentsPanel editor__componentsPanel--editMode"
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
  );
};

export default EditorComponentsPanel;
