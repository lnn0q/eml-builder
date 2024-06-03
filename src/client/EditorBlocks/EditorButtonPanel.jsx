import { useNavigate } from "react-router-dom";

const EditorButtonPanel = ({ mailData, id }) => {
  const navigate = useNavigate();

  const uploadTemplate = async (e) => {
    e.preventDefault();
    try {
      // console.log(mailData);
      let method;
      if (id) {
        method = "PUT";
      } else {
        method = "POST";
      }
      const response = await fetch("/api/template", {
        method: method,
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(mailData),
      });
      if (!response.ok) throw Error("Failed recieve data");
      navigate("/");
      navigate(0);
    } catch (err) {
      console.log(err.message);
    }
  };

  const deleteTemplate = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/template", {
        method: "DELETE",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ id: id }),
      });
      if (!response.ok) throw Error("Failed delete template");
      navigate("/");
      navigate(0);
    } catch (err) {
      console.log(err.message);
    }
  };

  const handleExport = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/export-eml", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(mailData),
      });
      if (!response.ok) throw Error("Failed recieve data");
      const blob = await response.blob();
      const url = window.URL.createObjectURL(new Blob([blob]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "template.eml");
      document.body.appendChild(link);
      link.click();
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <div className="editor__buttonPanel">
      {id ? (
        <>
          <button
            onClick={deleteTemplate}
            className="editor__button editor__button--delete"
          >
            Delete
          </button>
          <button
            onClick={uploadTemplate}
            className="editor__button editor__button--update"
          >
            Update
          </button>
        </>
      ) : (
        <button onClick={uploadTemplate} className="editor__button">
          Save
        </button>
      )}
      {/* <button className="editor__button">Preview</button> */}
      <button onClick={handleExport} className="editor__button">
        Download
      </button>
    </div>
  );
};

export default EditorButtonPanel;
