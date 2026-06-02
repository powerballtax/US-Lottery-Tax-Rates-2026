const fs = require('fs');

// 1. 读取你的 JSON 数据
const rawData = fs.readFileSync('2026_state_tax_rates.json');
const taxData = JSON.parse(rawData);

// 2. 遍历数据，生成 50 个州的静态 <a> 标签
let linksHtml = "";
taxData.forEach(state => {
  const slug = state.name.toLowerCase().replace(/\s+/g, '-');
  const formattedRate = (state.taxRate * 100).toFixed(2);
  linksHtml += `
            <div class="state-item">
                <a href="https://www.powerballtax.com/tax/${slug}">${state.name} Powerball Tax Calculator (${formattedRate}% Rate)</a>
            </div>`;
});

// 3. 准备 HTML 模板，并将链接插入到对应位置
const htmlTemplate = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Powerball After Taxes Data: 2026 State Rates & Federal Withholding</title>
    <meta name="description" content="Open-source JSON data to calculate your exact Powerball after-tax take-home payout. Includes 2026 state lottery tax rates, 24% federal withholding, and lump sum vs annuity rules.">
    <style>
        body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; line-height: 1.6; color: #333; max-width: 800px; margin: 0 auto; padding: 2rem; background-color: #f9fafb; }
        h1, h2, h3 { color: #111827; }
        .container { background: white; padding: 2rem; border-radius: 8px; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1); }
        a { color: #2563eb; text-decoration: none; font-weight: 500; }
        a:hover { text-decoration: underline; }
        .code-block { background-color: #1e293b; color: #f8fafc; padding: 1rem; border-radius: 6px; font-family: monospace; overflow-x: auto; }
        .state-list { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 1rem; margin-top: 1rem; }
        .state-item { background: #f1f5f9; padding: 1rem; border-radius: 6px; border-left: 4px solid #3b82f6; }
    </style>
</head>
<body>
    <div class="container">
        <h1>🇺🇸 2026 US Lottery Tax Data & Calculation Guide</h1>
        <p>Welcome to the open-source repository for US lottery state and federal tax rates. This dataset is maintained to help developers, journalists, and financial analysts accurately calculate take-home payouts for massive jackpots like Powerball and Mega Millions.</p>
        
        <h2>🚀 The Ultimate Calculation Tool</h2>
        <p>If you don't want to parse the JSON data or write your own code, we have built a free, lightning-fast web application using this exact dataset. You can instantly calculate the 24% federal withholding, the 37% tax bracket gap, and specific state taxes.</p>
        <p><strong>👉 Calculate your exact net payout here: <a href="https://www.powerballtax.com/powerball-after-taxes">Powerball After Taxes: How Much You Actually Take Home (2026)</a></strong></p>
        <hr>

        <h2>📍 State-by-State Tax Calculators</h2>
        <p>Different states have wildly different tax rules for lottery winnings. Select your state below to see the exact state tax rate and calculate your final cash payout:</p>
        
        <div class="state-list">
${linksHtml}
        </div>

        <hr>

        <h2>💻 API / JSON Data Usage</h2>
        <p>You can fetch the raw <code>2026_state_tax_rates.json</code> directly from this repository:</p>
        <div class="code-block">
<pre><code>fetch('https://raw.githubusercontent.com/powerballtax/US-Lottery-Tax-Rates-2026/main/2026_state_tax_rates.json')
  .then(response => response.json())
  .then(data => {
    // Example: Find New York's rate
    const nyRate = data.find(state => state.name === 'New York').taxRate;
    console.log(\`New York State Tax Rate is: \${(nyRate * 100).toFixed(2)}%\`);
  });
</code></pre>
        </div>
    </div>
</body>
</html>`;

// 4. 将生成的 HTML 写入 index.html 文件
fs.writeFileSync('index.html', htmlTemplate);
console.log('Successfully generated index.html!');
