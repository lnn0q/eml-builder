import "./styles/Content.css";
import Editor from "./Editor";
import Templates from "./Templates";

import { Routes, Route } from "react-router-dom";

const Content = () => {
  return (
    <main>
      <Routes>
        <Route path="/editor/*" element={<Editor />} />
        <Route path="/" element={<Templates />} />
      </Routes>
    </main>
  );
};

export default Content;
