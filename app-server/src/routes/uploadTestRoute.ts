import { Router } from "express";

const router = Router();

router.get("/upload-test", (_, res) => {
  res.send(`
    <html>
      <body>
        <h2>Upload CV de test (cu token)</h2>
        <form id="uploadForm" enctype="multipart/form-data">
          <label for="token">JWT Token:</label><br />
          <input type="text" id="token" name="token" required style="width: 500px;" /><br /><br />

          <label for="cv">Fișier CV:</label><br />
          <input type="file" id="cv" name="cv" accept=".pdf,.doc,.docx" required /><br /><br />

          <button type="submit">Upload</button>
        </form>

        <div id="result" style="margin-top: 20px;"></div>

        <script>
          document.getElementById("uploadForm").addEventListener("submit", async function (e) {
            e.preventDefault();

            const form = document.getElementById("uploadForm");
            const formData = new FormData();
            const fileInput = document.getElementById("cv");
            const tokenInput = document.getElementById("token");

            formData.append("cv", fileInput.files[0]);

            const response = await fetch("/api/upload", {
              method: "POST",
              body: formData,
              headers: {
                "Authorization": "Bearer " + tokenInput.value
              }
            });

            const resultDiv = document.getElementById("result");

            if (response.ok) {
              const data = await response.json();
              resultDiv.innerHTML = "<strong>Succes:</strong> CV salvat la <code>" + data.cvUrl + "</code>";
            } else {
              const err = await response.json();
              resultDiv.innerHTML = "<strong>Eroare:</strong> " + (err.error || "Upload failed");
            }
          });
        </script>
      </body>
    </html>
  `);
});

export default router;
