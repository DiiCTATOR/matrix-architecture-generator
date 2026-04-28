const fs = require('fs');
const marked = require('marked');

// Read the markdown content
let markdown = fs.readFileSync('C:/Users/hp15-/.gemini/antigravity/brain/8a83ca3b-ad11-42b1-96f3-f8493b58763c/Project_Report_Matrix.md', 'utf8');

function encodeMermaid(code) {
  return Buffer.from(code).toString('base64');
}

markdown = markdown.replace(/```mermaid([\\s\\S]*?)```/g, (match, p1) => {
  const b64 = encodeMermaid(p1.trim());
  return `![Mermaid Diagram](https://mermaid.ink/img/\${b64})`;
});

// Convert markdown to HTML
let htmlString = marked.parse(markdown);

(async () => {
  const matches = [...htmlString.matchAll(/src="(https:\/\/[^"]+)"/g)];
  for (const match of matches) {
    const url = match[1];
    try {
      console.log("Fetching", url);
      const response = await fetch(url, { headers: { "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36" } });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const arrayBuffer = await response.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      const base64Data = buffer.toString('base64');
      htmlString = htmlString.replace(url, `data:image/png;base64,${base64Data}`);
    } catch (e) {
      console.error("Failed to fetch", url, e.message);
      htmlString = htmlString.replace(new RegExp(`<img[^>]*src="${url.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}"[^>]*>`, 'g'), `<div style="text-align:center; padding:20px; border:1px dashed gray;">[Image failed to load]</div>`);
      htmlString = htmlString.replace(url, "");
    }
  }

  // Force page breaks before all h2 headings
  htmlString = htmlString.replace(/<h2/g, '<br clear=all style="mso-special-character:line-break;page-break-before:always" /><h2');

  // Fix image sizes so they do not overflow in Microsoft Word and maintain aspect ratio
  htmlString = htmlString.replace(/<img /g, '<img width="600" style="display:block; margin:20px auto;" ');

  // Base64 local images
  htmlString = htmlString.replace(/src="(?:file:\/\/\/)?(C:[\\/\\][^"]+)"/g, (match, p1) => {
    try {
      const filePath = p1.replace(/\//g, '\\\\');
      const ext = require('path').extname(filePath).substring(1) || 'png';
      const base64Data = fs.readFileSync(filePath, 'base64');
      return `src="data:image/${ext};base64,${base64Data}"`;
    } catch (e) {
      console.error("Error reading image:", p1, e);
      return match;
    }
  });

  const finalHtml = `
<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:w="urn:schemas-microsoft-com:office:word" xmlns="http://www.w3.org/TR/REC-html40">
<head>
<meta charset="utf-8">
<!--[if gte mso 9]>
<xml>
 <w:WordDocument>
  <w:View>Print</w:View>
  <w:Zoom>100</w:Zoom>
  <w:DoNotOptimizeForBrowser/>
 </w:WordDocument>
</xml>
<![endif]-->
<style>
  @page Section1 {
    mso-header-margin: .5in;
    mso-footer-margin: .5in;
    mso-header: h1;
    mso-footer: f1;
    mso-page-orientation: portrait;
    size: 8.5in 11.0in;
    margin: 1.0in 1.0in 1.0in 1.0in;
  }
  div.Section1 { page: Section1; }
  .header { text-align: right; color: gray; font-size: 10pt; border-bottom: 1px solid #ccc; padding-bottom: 4px; font-family: Calibri, sans-serif; }
  .footer { text-align: center; color: gray; font-size: 10pt; border-top: 1px solid #ccc; padding-top: 4px; font-family: Calibri, sans-serif; }
  body { font-family: "Calibri", sans-serif; font-size: 14pt; line-height: 1.5; }
  h1 { font-size: 24pt; text-align: center; }
  h2 { font-size: 18pt; margin-top: 24px; color: #2e74b5; }
  h3 { font-size: 16pt; text-align: center; }
  table { width: 100%; border-collapse: collapse; border: none; }
  img { max-width: 100%; }
</style>
</head>
<body>
<div class="Section1">
  ${htmlString}
  
  <div style="mso-element:header" id="h1">
    <p class="header">Matrix Architecture Generator - Project Report</p>
  </div>
  <div style="mso-element:footer" id="f1">
    <p class="footer">Yogananda School of AI, Computers and Data Sciences | Page <span style="mso-field-code:' PAGE '"></span></p>
  </div>
</div>
</body>
</html>
  `;

  fs.writeFileSync('Matrix_Project_Report_V10.html', finalHtml);
  console.log("Done! Saved as Matrix_Project_Report_V10.html");
})();
