import "./styles/Templates.css";

import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
const Templates = ({ isLoading, errMsg, templates }) => {
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
                to={`/editor/${template._id}`}
                className="templatesContainer__link"
                key={template._id}
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
