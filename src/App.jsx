import { useState } from "react";
import axios from "axios";

const API_URL = import.meta.env.VITE_BACKEND_URL;
function App() {
  const [file, setFile] = useState(null);
  const [prediction, setPrediction] = useState("");
  const [loading, setLoading] = useState(false);

  const handleUpload = async () => {
    if (!file) {
      alert("Please upload an image first!");
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await axios.post(
        `{API_URL}/predict`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      setPrediction(res.data.prediction);
    } catch (err) {
      console.error(err);
      alert("Error predicting. Try again!");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-start p-8">
      {/* Heading */}
      <h1 className="text-4xl  font-mono font-bold mb-6  text-center">
        Oral Cancer Prediction
      </h1>

      {/* Instructions */}
      <div className="mb-6 w-full font-mono max-w-md ">
        <p className=" mb-2">Image Upload Guidelines:</p>
        <ul className="list-disc list-inside space-y-1 text-sm">
          <li>
            Upload a clear image showing the{" "}
            <strong>inner view of the mouth</strong>.
          </li>
          <li>
            Ensure the{" "}
            <strong>tongue, teeth, gums, and surrounding oral cavity</strong>{" "}
            are visible.
          </li>
          <li>The image should be well-lit and focused.</li>
          <li>Remove any obstructions such as hands, food, or objects.</li>
          <li>Preferably use a recent image to get accurate results.</li>
        </ul>
      </div>

      {/* File Input with Label */}
      <div className="mb-4 w-full max-w-md flex flex-col">
        <label className="mb-2 font-medium text-gray-700" htmlFor="fileInput">
          Select Mouth Image:
        </label>
        <input
          id="fileInput"
          type="file"
          accept="image/*"
          // capture="environment" // rear camera
          onChange={(e) => setFile(e.target.files[0])}
          className="border border-gray-300 rounded px-3 py-2"
        />
      </div>

      {/* Predict Button */}
      <button
        onClick={handleUpload}
        disabled={loading}
        className="mb-4 w-full max-w-md px-6 py-3 bg-green-500 hover:bg-green-600 text-white font-semibold rounded shadow disabled:opacity-50"
      >
        {loading ? "Predicting..." : "Predict"}
      </button>

      {/* Prediction Result */}
      {prediction && (
        <p className="mt-4 text-xl font-medium text-gray-700 text-center max-w-md">
          Prediction:{" "}
          <span className="font-bold text-red-600">{prediction}</span>
        </p>
      )}

      {/* Prompt when no file uploaded */}
      {!file && (
        <p className="mt-2 text-gray-500 text-center max-w-md">
          Please upload an image to start prediction.
        </p>
      )}
    </div>
  );
}

export default App;
