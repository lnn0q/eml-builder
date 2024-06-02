import "../styles/ComponentEditor.css";

import { useState } from "react";

const ComponentEditor = ({
  element,
  color,
  text,
  width,
  height,
  alt,
  img,
  link,
  handleInputColor,
  handleInputText,
  handleInputWidth,
  handleInputHeight,
  handleInputAlt,
  handleInputImg,
  handleInputLink,
}) => {
  return (
    <div className="componentEditor">
      {element.type === "text" ? (
        <>
          <div className="componentEditor__container">
            <div className="componentEditor__label">Color:</div>
            <input
              onChange={handleInputColor}
              type="color"
              value={color}
              className="componentEditor__inputColor"
            />
          </div>
          <div className="componentEditor__container">
            <div className="componentEditor__label">Text:</div>
            <textarea
              style={{ color: color }}
              onChange={handleInputText}
              value={text}
              className="componentEditor__textarea"
            />
          </div>
        </>
      ) : element.type === "img" ? (
        <>
          <div className="componentEditor__container">
            <div className="componentEditor__label">Width:</div>
            <input
              type="text"
              placeholder="250px"
              onChange={handleInputWidth}
              value={width}
              className="componentEditor__input componentEditor__input--imageParam"
            />
            <div className="componentEditor__label">Height:</div>
            <input
              type="text"
              placeholder="250px"
              onChange={handleInputHeight}
              value={height}
              className="componentEditor__input componentEditor__input--imageParam"
            />
            <div className="componentEditor__label">Alt:</div>
            <input
              type="text"
              placeholder="image"
              onChange={handleInputAlt}
              value={alt}
              className="componentEditor__input componentEditor__input--imageParam"
            />
          </div>
          <div>
            <div className="componentEditor__label">Image:</div>
            <input onChange={handleInputImg} type="file" accept="image/*" />
          </div>
          <img alt="imgPreview" src={img} />
        </>
      ) : element.type === "link" ? (
        <>
          <div className="componentEditor__container">
            <div className="componentEditor__label">Color:</div>
            <input
              type="color"
              onChange={handleInputColor}
              value={color}
              className="componentEditor__inputColor"
            />
          </div>
          <div className="componentEditor__container">
            <div className="componentEditor__label">Text:</div>
            <input
              type="text"
              style={{ color: color }}
              onChange={handleInputText}
              value={text}
              className="componentEditor__input"
            />
          </div>
          <div className="componentEditor__container">
            <div className="componentEditor__label">Link:</div>
            <input
              type="text"
              onChange={handleInputLink}
              value={link}
              className="componentEditor__input"
            />
          </div>
        </>
      ) : null}
    </div>
  );
};

export default ComponentEditor;
