import "./styles/Templates.css";

import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
const Templates = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [errMsg, setErrMsg] = useState(null);
  const [templates, setTemplates] = useState([]);

  useEffect(() => {
    fetchTemplates();
  }, [templates]);

  const fetchTemplates = async () => {
    try {
      const res = await fetch("/api/template");
      if (!res.ok) throw Error("Failed recieve data");
      let templatesList = await res.json();
      setTemplates(templatesList);
      setIsLoading(false);
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <div className="templatesContainer">
      <Link to="/editor" className="templatesContainer__createLink">
        Create template
      </Link>
      <hr className="templatesContainer__ruler" />
      <ul className="templatesContainer__list">
        {isLoading && !errMsg ? (
          <div>Loading...</div>
        ) : !isLoading && errMsg ? (
          <div>{err.message}</div>
        ) : !isLoading && !errMsg ? (
          <>
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
          </>
        ) : null}
      </ul>
    </div>
  );
};

export default Templates;
