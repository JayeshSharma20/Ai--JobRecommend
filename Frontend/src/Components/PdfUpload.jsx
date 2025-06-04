import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import '../Style/Custom.css';

const PdfUpload = () => {
  const [file, setFile] = useState(null);
  const [pdfText, setPdfText] = useState("");
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    console.log("handleFileChange triggered");
    // console.log("Selected File:", selected);
    setFile(selected);
  };

  const handleUpload = async () => {
    if (!file) return alert("Please select a file");

    const formData = new FormData();
    formData.append("resume", file);
    try {
      const res = await axios.post(
        "http://localhost:5000/upload-resume",
        formData
      );
      console.log(res);
      // console.log("Extracted Resume Text:", res.data.content);
      console.log("File uploaded successfully:");;
      setPdfText(res.data.content);
    } catch (err) {
      console.error(err);
      console.log("Upload failed.");
    }
  };

  return (
    // <div className=" flex flex-col items-center justify-center px-4 bg-gray-700 min-h-screen">
    //   <div className="w-full flex justify-between items-center py-4 px-6 shadow-sm fixed top-0 bg-white z-10">
    //     <div className="text-purple-500 text-xl sm:text-2xl font-bold">
    //       Job.<span className="text-gray-800">Recommend</span>
    //     </div>
    //     <div className="flex items-center space-x-6 text-gray-600 font-medium">
    //       <button className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-4 py-2 rounded-full hover:opacity-90 transition"
    //         onClick={() => {
    //           localStorage.removeItem("user");
    //           localStorage.removeItem("token");
    //           navigate("/");
    //         }}
    //       >
    //         Logout
    //       </button>
    //     </div>
    //   </div>
    //   <div className="flex flex-col items-center justify-center">
    //     <h1 className="text-2xl sm:text-4xl font-extrabold text-purple-400 mb-12">PDF Upload</h1>
    //     <label  
    //       htmlFor="pdf-upload"
    //       className="relative w-50 sm:w-100 flex flex-col items-center justify-center border-2 border-dashed border-blue-400 rounded-lg p-6 cursor-pointer hover:border-blue-600 transition mb-2 bg-white shadow-sm"
    //     >
    //       <input
    //         type="file"
    //         accept="application/pdf"
    //         id="pdf-upload"
    //         className="hidden"
    //         onChange={handleFileChange}
    //       />

    //       <div className="text-center">
    //         <svg
    //           className="mx-auto h-8 w-8 text-blue-600"
    //           fill="none"
    //           stroke="currentColor"
    //           strokeWidth="2"  
    //           viewBox="0 0 24 24"
    //         >
    //           <path
    //             strokeLinecap="round"
    //             strokeLinejoin="round"
    //             d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1M12 12V4m0 0l-4 4m4-4l4 4"
    //           />
    //         </svg>
    //         <p className="mt-2 text-sm text-blue-700 font-semibold">
    //           {file ? `📄 ${file.name}` : "Click to upload PDF"}
    //         </p>
    //         <p className="text-xs text-gray-500">Only PDF files are supported</p>
    //       </div>
    //     </label>

    //     <button
    //       onClick={handleUpload}
    //       className="mt-4 bg-gradient-to-r from-purple-500 to-blue-500 text-white font-semibold py-2 px-4 rounded-full hover:bg-purple-700 transition"
    //     >
    //       Upload  
    //     </button>
    //     <p className="text-gray-900 text-sm mt-1">⚡ 500,000+ happy users</p>

    //     {pdfText && (
    //       <div className="mt-8 w-full max-w-3xl bg-gray-100 p-6 rounded-lg shadow-md">
    //         <h2 className="text-xl font-semibold mb-4 text-purple-600">
    //           Extracted Resume Content:
    //         </h2>
    //         <pre className="whitespace-pre-wrap text-gray-800">{pdfText}</pre>
    //       </div>
    //     )}
    //   </div>
    // </div>
    <div className="upload-page">
      <div className="navbar">
        <div className="logo">
          Job.<span className="logo-dark">Recommend</span>
        </div>
        <div className="nav-actions">
          <button
            className="logout-button"
            onClick={() => {
              localStorage.removeItem("user");
              localStorage.removeItem("token");
              navigate("/");
            }}
          >
            Logout
          </button>
        </div>
      </div>

      <div className="upload-container">
        <h1 className="upload-title">PDF Upload</h1>
        <label htmlFor="pdf-upload" className="upload-box">
          <input
            type="file"
            accept="application/pdf"
            id="pdf-upload"
            className="hidden"
            onChange={handleFileChange}
          />

          <div className="upload-instructions">
            <svg className="upload-icon" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1M12 12V4m0 0l-4 4m4-4l4 4"
              />
            </svg>
            <p className="upload-filename">
              {file ? `📄 ${file.name}` : "Click to upload PDF"}
            </p>
            <p className="upload-note">Only PDF files are supported</p>
          </div>
        </label>

        <button onClick={handleUpload} className="upload-btn">
          Upload
        </button>
        <p className="user-count">⚡ 500,000+ happy users</p>

        {pdfText && (
          <div className="resume-preview">
            <h2 className="resume-title">Extracted Resume Content:</h2>
            <pre className="resume-content">{pdfText}</pre>
          </div>
        )}
      </div>
    </div>

  );
};

export default PdfUpload;
