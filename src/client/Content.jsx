import "./styles/Content.css";
import Editor from "./Editor";
import Templates from "./Templates";

import { useEffect, useState } from "react";

import { Routes, Route } from "react-router-dom";

const Content = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [errMsg, setErrMsg] = useState(null);
  const [templates, setTemplates] = useState([]);

  useEffect(() => {
    fetchTemplates();
  }, []);

  const fetchTemplates = async () => {
    try {
      const res = await fetch("/api/template");
      if (!res.ok) throw Error("Failed recieve data");
      let templatesList = await res.json();
      setTemplates(templatesList);
      setIsLoading(false);
      console.log(templates);
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <main>
      <Routes>
        <Route path="/editor" element={<Editor />} />
        <Route path="/editor/:id" element={<Editor templates={templates} />} />
        <Route
          path="/"
          element={
            <Templates
              isLoading={isLoading}
              errMsg={errMsg}
              templates={templates}
            />
          }
        />
      </Routes>
    </main>
  );
};

export default Content;
