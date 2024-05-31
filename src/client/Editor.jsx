import "./styles/Editor.css";

const Editor = () => {
  const mailData = {
    Sender: "John Doe",
    Recipient: "James Johnson",
    Subject: "Test Subject",
    Date: "12.12.2024",
    bodyColor: "#ffffff",
    template: [
      {
        type: "text",
        text: "Some random text.",
        color: "#000fff",
        id: 1,
      },
      {
        type: "img",
        alt: "img",
        img: "",
        id: 2,
      },
      {
        type: "button",
        text: "Redirect",
        color: "#000000",
        link: "",
        id: 3,
      },
    ],
  };
  return (
    <form className="editor">
      <div className="editor__headerPanel">
        <div className="editor__headerField">
          <div>From:</div>
          <input type="email" required />
        </div>
        <div className="editor__headerField">
          <div>To:</div>
          <input type="email" required />
        </div>
        <div className="editor__headerField">
          <div>Subject:</div>
          <input type="text" required />
        </div>
        <div className="editor__headerField">
          <div>Date:</div>
          <input type="text" required />
        </div>
      </div>
      <div
        className="editor__view"
        style={{ backgroundColor: mailData.bodyColor }}
      >
        {mailData.template.map((element) => {
          switch (element.type) {
            case "text":
              return (
                <div key={element.id} style={{ color: element.color }}>
                  {element.text}
                </div>
              );
            case "img":
              return (
                <div key={element.id}>
                  <img src={element.img} alt={element.alt} />
                </div>
              );
            case "button":
              return (
                <button key={element.id} style={{ color: element.color }}>
                  {element.text}
                </button>
              );
          }
        })}
      </div>
      <div className="editor__componentsPanel"></div>
      <div className="editor__buttonPanel">
        <button>Save</button>
        <button>Preview</button>
        <button>Download</button>
      </div>
    </form>
  );
};

export default Editor;
