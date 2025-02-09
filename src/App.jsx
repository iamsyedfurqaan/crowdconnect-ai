import React, { useState } from 'react';
import { jsPDF } from 'jspdf';
import { saveAs } from 'file-saver';

export default function App() {
  const [businessName, setBusinessName] = useState('');
  const [industry, setIndustry] = useState('');
  const [targetAudience, setTargetAudience] = useState('');
  const [marketingStrategy, setMarketingStrategy] = useState(null);
  const [loading, setLoading] = useState(false);

  const generateStrategy = () => {
    setLoading(true);

    const creativeHooks = [
      `Break the mold in the ${industry} industry with bold, unexpected content!`,
      `Transform how ${targetAudience} engage with your ${industry} brand through storytelling.`,
      `Elevate your ${industry} game by tapping into viral trends and interactive campaigns.`,
      `Zero in on what ${targetAudience} crave most in the ${industry} space—personalized, authentic connections.`
    ];

    const platformAdCopy = {
      Instagram: [
        `Ready to disrupt the ${industry} scene? ${businessName} is helping ${targetAudience} level up their game! #Innovation #${industry.replace(/\s+/g, '')}Vibes`,
        `Visual storytelling is key! Showcase your ${industry} journey with vibrant reels and stories. Let ${businessName} guide you to success. #${businessName.replace(/\s+/g, '')}Magic`
      ],
      LinkedIn: [
        `Are you a ${targetAudience} looking to thrive in ${industry}? ${businessName} offers cutting-edge solutions to elevate your business strategy.`,
        `Professional growth starts with the right tools. Discover how ${businessName} is transforming the ${industry} landscape for ${targetAudience}.`
      ],
      Facebook: [
        `${businessName} is revolutionizing ${industry}! Join our community of ${targetAudience} and explore new opportunities.`,
        `Big news! ${businessName} is launching fresh solutions tailored for ${targetAudience} in the ${industry} space. Get involved today!`
      ]
    };

    const blogTemplates = [
      {
        title: `Why ${targetAudience} are Flocking to ${businessName} for ${industry} Solutions`,
        intro: `In a saturated market, ${businessName} stands out by delivering game-changing ${industry} strategies. Here's why ${targetAudience} can't get enough.`,
        subheadings: [
          `1. Harnessing Data to Drive Results`,
          `2. Making ${industry} Personal Again`,
          `3. Crafting Narratives That Resonate`,
          `4. Innovative Tech That Simplifies Complex Problems`,
          `5. A Community-Centric Approach for ${targetAudience}`
        ],
        conclusion: `In the ever-evolving world of ${industry}, staying ahead means partnering with the best. Discover how ${businessName} can help your ${industry} journey thrive.`
      },
      {
        title: `The Secret Sauce Behind ${businessName}'s Success in ${industry}`,
        intro: `Ever wonder how ${businessName} became a trailblazer in the ${industry} industry? We’re spilling the secrets behind our winning formula.`,
        subheadings: [
          `1. Embracing the Power of Storytelling`,
          `2. Leveraging Emerging Tech for Maximum Impact`,
          `3. Prioritizing Authentic Connections with ${targetAudience}`,
          `4. Continuous Innovation to Stay Ahead`,
          `5. Real-World Case Studies That Inspire`
        ],
        conclusion: `Success in ${industry} is more than just strategy—it's about connection, creativity, and consistency. Let ${businessName} help you rewrite the rules.`
      }
    ];

    const hook = creativeHooks[Math.floor(Math.random() * creativeHooks.length)];
    const selectedBlog = blogTemplates[Math.floor(Math.random() * blogTemplates.length)];
    const instaAd = platformAdCopy.Instagram[Math.floor(Math.random() * platformAdCopy.Instagram.length)];
    const linkedinAd = platformAdCopy.LinkedIn[Math.floor(Math.random() * platformAdCopy.LinkedIn.length)];
    const facebookAd = platformAdCopy.Facebook[Math.floor(Math.random() * platformAdCopy.Facebook.length)];

    const strategy = `
${hook}

Marketing Strategy for ${businessName}:

1. Platform-Specific Ad Copy:
Instagram: "${instaAd}"
LinkedIn: "${linkedinAd}"
Facebook: "${facebookAd}"

2. Ready-to-Use Blog Template:
Title: ${selectedBlog.title}
Intro: ${selectedBlog.intro}
${selectedBlog.subheadings.join('\n')}
Conclusion: ${selectedBlog.conclusion}

3. Creative SEO Tips:
- Experiment with unconventional keywords like "hidden gems of ${industry}" or "underrated tools for ${targetAudience}."
- Craft content around trending topics in ${industry} for organic boosts.

4. Audience Engagement:
- Run a meme contest on Instagram using humor to connect with ${targetAudience}.
- Host a live AMA (Ask Me Anything) session with an industry expert.
- Launch a user-generated content campaign, encouraging ${targetAudience} to share their stories.

5. Hashtags to Use:
#${industry.replace(/\s+/g, '')}Revolution #GrowWith${businessName.replace(/\s+/g, '')} #Empower${targetAudience.replace(/\s+/g, '')}
    `;

    setTimeout(() => {
      setMarketingStrategy(strategy);
      setLoading(false);
    }, 1500);
  };

  const exportPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text(`Marketing Strategy for ${businessName}`, 10, 10);
    doc.setFontSize(12);
    const strategyText = marketingStrategy.split('\n').filter(line => line.trim() !== '');
    let yOffset = 20;
    strategyText.forEach(line => {
      doc.text(line, 10, yOffset);
      yOffset += 8;
    });
    doc.save(`${businessName}_Marketing_Strategy.pdf`);
  };

  const exportCSV = () => {
    const csvContent = `data:text/csv;charset=utf-8,Section,Content\n"Business Name","${businessName}"\n"Industry","${industry}"\n"Target Audience","${targetAudience}"\n\n"${marketingStrategy.replace(/\n/g, ' ')}"`;
    const blob = new Blob([decodeURIComponent(encodeURI(csvContent))], { type: 'text/csv;charset=utf-8;' });
    saveAs(blob, `${businessName}_Marketing_Strategy.csv`);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(marketingStrategy).then(() => {
      alert('Marketing strategy copied to clipboard!');
    });
  };

  return (
    <div style={{ padding: '20px', minHeight: '100vh', backgroundColor: '#000000', color: '#ffffff', fontFamily: 'Arial' }}>
      <h1 style={{ fontSize: '24px', textAlign: 'center' }}>CrowdConnect AI</h1>
      <div style={{ marginBottom: '20px' }}>
        <input type="text" placeholder="Business Name" style={{ width: '100%', padding: '10px', marginBottom: '10px', border: '1px solid #444', borderRadius: '4px', color: '#ffffff', backgroundColor: '#222' }} value={businessName} onChange={(e) => setBusinessName(e.target.value)} />
        <input type="text" placeholder="Industry" style={{ width: '100%', padding: '10px', marginBottom: '10px', border: '1px solid #444', borderRadius: '4px', color: '#ffffff', backgroundColor: '#222' }} value={industry} onChange={(e) => setIndustry(e.target.value)} />
        <input type="text" placeholder="Target Audience" style={{ width: '100%', padding: '10px', marginBottom: '10px', border: '1px solid #444', borderRadius: '4px', color: '#ffffff', backgroundColor: '#222' }} value={targetAudience} onChange={(e) => setTargetAudience(e.target.value)} />
        <button onClick={generateStrategy} disabled={loading} style={{ width: '100%', padding: '10px', backgroundColor: loading ? '#555' : '#007bff', color: '#fff', border: 'none', borderRadius: '4px', cursor: loading ? 'not-allowed' : 'pointer' }}>{loading ? 'Generating...' : 'Generate Marketing Strategy'}</button>
      </div>

      {marketingStrategy && (
        <div style={{ textAlign: 'left', whiteSpace: 'pre-wrap', padding: '20px' }}>
          {marketingStrategy}
          <button onClick={exportPDF} style={{ marginRight: '10px', marginTop: '10px' }}>Export as PDF</button>
          <button onClick={exportCSV} style={{ marginRight: '10px', marginTop: '10px' }}>Export as CSV</button>
          <button onClick={copyToClipboard} style={{ marginTop: '10px' }}>Copy to Clipboard</button>
        </div>
      )}
    </div>
  );
}
