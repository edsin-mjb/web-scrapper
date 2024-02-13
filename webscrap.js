const express = require("express");
const puppeteer = require("puppeteer");

const app = express();
const port = 3000;

app.get("/scrape", async (req, res) => {
  try {
    // Start a Puppeteer session
    const browser = await puppeteer.launch({
      headless: true, // Change to true for production
      args: ["--no-sandbox"],
    });

    // Open a new page
    const page = await browser.newPage();

    // Navigate to the specified URL
    const response = await page.goto(req.query.url, {
      waitUntil: "domcontentloaded",
    });

    // Send the quotes as a JSON response
    res.json({ data: await response.text() });
    await browser.close();
  } catch (error) {
    // Handle errors
    console.error("Error:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Start the Express server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
