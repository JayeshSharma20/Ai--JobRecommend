import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

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
      console.log("Extracted Resume Text:", res.data.content);
      setPdfText(res.data.content);
    } catch (err) {
      console.error(err);
      alert("Upload failed.");
    }
  };

  return (
    <div className=" flex flex-col items-center justify-center px-4">
      <div className="w-full flex justify-between items-center py-4 px-6 shadow-sm fixed top-0 bg-white z-10">
        <div className="text-purple-500 text-2xl font-bold">
          Job.<span className="text-gray-800">Recommend</span>
        </div>
        <div className="flex items-center space-x-6 text-gray-600 font-medium">
          <span className="hover:underline cursor-pointer">Blog</span>
          <span className="hover:underline cursor-pointer">Help</span>
          <span className="hover:underline cursor-pointer">Pricing</span>
          <button className="bg-gradient-to-r from-purple-500 to-blue-500 text-white font-semibold px-5 py-2 rounded-full hover:opacity-90 transition"
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
      <div className="flex flex-col items-center justify-center mt-20">
        <h1 className="text-5xl font-extrabold text-black mb-6">PDF Upload</h1>

        <label
          htmlFor="pdf-upload"
          className="cursor-pointer bg-blue-600 text-white font-semibold py-3 px-6 rounded-full hover:bg-blue-700 transition mb-2"
        >
          Upload PDF →
          <input
            type="file"
            accept="application/pdf"
            id="pdf-upload"
            className="hidden"
            onChange={handleFileChange}
          />
        </label>
        <button
          onClick={handleUpload}
          className="mt-4 bg-purple-600 text-white font-semibold py-2 px-4 rounded-full hover:bg-purple-700 transition"
        >
          Upload  
        </button>
        <p className="text-gray-500 text-sm mt-1">⚡ 500,000+ happy users</p>

        {pdfText && (
          <div className="mt-8 w-full max-w-3xl bg-gray-100 p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4 text-purple-600">
              Extracted Resume Content:
            </h2>
            <pre className="whitespace-pre-wrap text-gray-800">{pdfText}</pre>
          </div>
        )}
      </div>
    </div>
  );
};

export default PdfUpload;
