import React, { useState, useRef } from 'react';
import html2pdf from 'html2pdf.js';
import './App.css';

function App() {
  const [pdfBlob, setPdfBlob] = useState(null);
  const contentRef = useRef(null);

  const convertToPdf = async () => {
    const response = await fetch('/test.html');
    const content = await response.text();

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

    html2pdf().set(options).from(content).save();
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
