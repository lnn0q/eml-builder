import { useEffect } from "react";

const Preview = ({ eml }) => {
  // const eml = `
  //     From: test@test.com
  //     To: testrec@test.com
  //     Subject: Test
  //     Date: 12.12.2024
  //     Content-Type: text/html
  //
  //     <!DOCTYPE html>
  //     <html>
  //     <head>
  //       <style>
  //         body {
  //           background-color: #f0f0f0;
  //         }
  //       </style>
  //     </head>
  //     <body>
  //     </body>
  //     </html>`;

  useEffect(() => {
    parseHtml(eml);
  }, [eml]);

  const mailHeaders = {};

  // parse body
  const parseHtml = (emlFile) => {
    if (emlFile) {
      const htmlStart = emlFile.indexOf("<!DOCTYPE html>");
      const htmlContent = emlFile.substring(htmlStart);
      const parser = new DOMParser();
      const mailContent = parser.parseFromString(htmlContent, "text/html");
      const serializedBody = new XMLSerializer().serializeToString(mailContent);
      const iframe = document.getElementById("template-view");
      iframe.srcdoc = serializedBody;
    }
  };

  parseHtml();

  return (
    <>
      <div>
        <div>From:</div>
        <div>To:</div>
        <div>Subject:</div>
        <div>Date:</div>
      </div>
      <iframe className="preview__view" id="template-view" />
    </>
  );
};

export default Preview;
