import { useNavigate } from "react-router-dom";

const EditorButtonPanel = ({ mailData, id }) => {
  const navigate = useNavigate();

  const postTemplate = async (e) => {
    e.preventDefault();
    try {
      console.log(mailData);
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
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <div className="editor__buttonPanel">
      <button onClick={postTemplate}>Save</button>
      <button>Preview</button>
      <button>Download</button>
    </div>
  );
};

export default EditorButtonPanel;
