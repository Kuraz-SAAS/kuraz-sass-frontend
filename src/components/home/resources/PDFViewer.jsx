// import React, { useState } from "react";
// import { } ;
// import "react-pdf/dist/esm/Page/AnnotationLayer.css";

// const PdfViewer = ({ pdfUrl }) => {
//   const [numPages, setNumPages] = useState(null);
//   const [pageNumber, setPageNumber] = useState(1);

//   const onDocumentLoadSuccess = ({ numPages }) => {
//     setNumPages(numPages);
//   };

//   const goToNextPage = () => {
//     if (pageNumber < numPages) setPageNumber(pageNumber + 1);
//   };

//   const goToPreviousPage = () => {
//     if (pageNumber > 1) setPageNumber(pageNumber - 1);
//   };

//   return (
//     <div className="pdf-viewer-container">
//       <Document
//         file={pdfUrl}
//         onLoadSuccess={onDocumentLoadSuccess}
//         loading="Loading PDF..."
//         className="pdf-document"
//       >
//         <Page pageNumber={pageNumber} />
//       </Document>

//       <div className="pdf-controls">
//         <button onClick={goToPreviousPage} disabled={pageNumber === 1}>
//           Previous
//         </button>
//         <span>
//           Page {pageNumber} of {numPages}
//         </span>
//         <button onClick={goToNextPage} disabled={pageNumber === numPages}>
//           Next
//         </button>
//       </div>
//     </div>
//   );
// };

// export default PdfViewer;
