const fs = require('fs');
if (fs.existsSync('./lighthouse-report.json')) {
  const data = JSON.parse(fs.readFileSync('./lighthouse-report.json', 'utf8'));
  const categories = data.categories;
  console.log("Performance:", categories.performance.score * 100);
  console.log("Accessibility:", categories.accessibility.score * 100);
  console.log("Best Practices:", categories['best-practices'].score * 100);
  console.log("SEO:", categories.seo.score * 100);
} else {
  console.log("Report not found yet.");
}
