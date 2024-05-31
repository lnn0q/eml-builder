import { Link } from "react-router-dom";
import "./styles/Templates.css";

const Templates = () => {
  let templates = [
    {
      name: "Template 1",
      id: 1,
    },
    {
      name: "Template 2",
      id: 2,
    },
    {
      name: "Template 3",
      id: 3,
    },
  ];
  return (
    <div className="templatesContainer">
      <Link to="/editor" className="templatesContainer__createLink">
        Create template
      </Link>
      <hr className="templatesContainer__ruler" />
      <ul className="templatesContainer__list">
        {templates.map((template) => (
          <Link
            to={`/editor/${template.id}`}
            className="templatesContainer__link"
            key={template.id}
          >
            <li className="templatesContainer__listItem">
              <div className="templatesContainer__itemName">
                {template.name}
              </div>
            </li>
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default Templates;
