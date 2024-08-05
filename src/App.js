import React, { useState, useRef } from 'react';
import html2pdf from 'html2pdf.js';
import './App.css';
import Handlebars from "handlebars";

function App() {
  const [pdfBlob, setPdfBlob] = useState(null);
  const contentRef = useRef(null);

  const data = { title: "Dynamic Title", message: "This is a dynamic message." };

  const convertToPdf = async () => {
    const response = await fetch('/test.hbs');
    const templateSource = await response.text();

    const template = Handlebars.compile(templateSource);
    const renderedHtml = template(data);

    const options = {
      filename: 'my-document.pdf',
      margin: 1,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: {
        unit: 'in',
        format: 'letter',
        orientation: 'portrait',
      },
    };

    html2pdf().set(options).from(renderedHtml).save();
  };

  return (
      <div className="App">
        <header className="App-header">
          <div ref={contentRef}>
            <h1>Hello, PDF!</h1>
            <p>
              This is a simple example of HTML-to-PDF conversion using
              React and html2pdf.
            </p>
          </div>
          <button onClick={convertToPdf}>Convert to PDF</button>
        </header>
      </div>
  );
}

export default App;
