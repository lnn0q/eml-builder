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
      <ul className="templatesContainer__list">
        {templates.map((template) => (
          <Link
            to={`/editor/${template.id}`}
            className="templatesContainer__link"
          >
            <li className="templatesContainer__listItem" key={template.id}>
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
