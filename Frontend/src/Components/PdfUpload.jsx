import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import '../Style/Custom.css';
import Button from "../Utils/Button";

const PdfUpload = () => {
  const [file, setFile] = useState(null);
  const [pdfText, setPdfText] = useState("");
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    console.log(selected, "handleFileChange triggered");
    setFile(selected);
  };
  const handleUpload = async () => {
    if (!file) return alert("Please select a file");

    const formData = new FormData();
    console.log('formData:', formData);
    formData.append("resume", file);
    try {
      const res = await axios.post(
        "http://localhost:5000/upload-resume",
        formData
      );
      console.log(res);
      // console.log("Extracted Resume Text:", res.data.content);
      console.log("File uploaded successfully:");;
      // setPdfText(res.data.content);
    } catch (err) {
      console.error(err);
      console.log("Upload failed.");
    }
  };

  return (
    <div className="upload-page">
      <div className="navbar">
        <div className="logo">
          Smart.<span className="logo-dark">Hire</span>
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
