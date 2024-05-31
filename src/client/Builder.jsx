// import "./styles/Builder.css";
import { useEffect } from "react";

const Builder = () => {
  const emlFile = `
      From: test@test.com
      To: testrec@test.com
      Subject: Test
      Date: 12.12.2024
      Content-Type: text/html

      <!DOCTYPE html>
      <html>
      <head>
      </html>`;

  // extract headers

  const mailHeaders = {
    mailSender: null,
    mailRecipient: null,
    mailDate: null,
    mailSubject: null,
  };

  // parse body
  const parseHtml = async () => {
    const htmlStart = emlFile.indexOf("<!DOCTYPE html>");
    const htmlContent = emlFile.substring(htmlStart);
    const parser = new DOMParser();
    const mailContent = await parser.parseFromString(htmlContent, "text/html");
    // const mailBody = await mailContent.getElementsByTagName("body")[0];
    // document.getElementById("template-view").innerHTML = await mailBody.innerHTML;
    const serializedBody = new XMLSerializer().serializeToString(mailContent);
    const iframe = document.getElementById("template-view");
    iframe.srcdoc = serializedBody;
  };

  parseHtml();

  return (
    <>
      <iframe className="builder__view" id="template-view" />
    </>
  );
};

export default Builder;
