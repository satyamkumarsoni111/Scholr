import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ArticleDetailView({ onBack }) {
  // Screenshot-matched Clive Thompson article content
  const screenshotArticle = {
    content: [
      "A man typing on a laptop. Photo by Ono Kosuki from Pexels.",
      "I’ve spent enough time online to notice people becoming confident about their ability to spot AI writing on sight, which probably explains why every few days somebody publishes a thread exposing fraudsters. One person focuses on punctuation. Another gets suspicious of articles that sound too structured. And lately, I’ve seen more people treating completely normal literary techniques like evidence somebody secretly opened ChatGPT halfway through writing.",
      "==Earlier this morning, I read one of those articles out of curiosity. The examples were all over the place. One section pointed to similes as an obvious AI tell. Another warned readers to watch out for metaphors and descriptive qualifiers. Which would’ve been surprising news to basically every novelist, essayist, and columnist from the last hundred years.",
      "Then things got even more ridiculous.",
      "The author started breaking down phrases like “slightly confusing” or “remarkably difficult” as though qualifying descriptors were invented by OpenAI. It was a bizarre display of revisionist history—as if clear, structured, or vivid writing was a machine-only domain, and human writers should only produce fragmented, unstructured prose to prove their humanity.",
      "In reality, the search for AI tells is becoming a form of online paranoia. Instead of evaluating writing on its merits, substance, or factual accuracy, we are teaching people to fear good style."
    ]
  };

  // Helper function to render backticks as <code> blocks
  const parseInlineCode = (text) => {
    const parts = text.split(/(`[^`]+`)/g);
    return parts.map((part, index) => {
      if (part.startsWith('`') && part.endsWith('`')) {
        return <code key={index}>{part.slice(1, -1)}</code>;
      }
      return part;
    });
  };

  // Helper to render body content (supports paragraph lists and markdown-like parsing)
  const renderBodyContent = () => {
    return screenshotArticle.content.map((paragraph, index) => {
      if (index === 0 && paragraph.includes('Photo by')) {
        return (
          <div key={index} className="detail-image-caption">
            {paragraph}
          </div>
        );
      }
      if (paragraph.startsWith('==')) {
        const text = paragraph.replace(/^==/, '');
        return (
          <div key={index} className="detail-highlighted-paragraph-container">
            <p className="detail-highlighted-paragraph">
              {parseInlineCode(text)}
            </p>
            <div className="paragraph-comment-bubble">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
              </svg>
              <span>3</span>
            </div>
          </div>
        );
      }
      return (
        <p key={index}>
          {parseInlineCode(paragraph)}
        </p>
      );
    });
  };

  return (
    <div className="article-detail-wrapper" style={{ paddingTop: '60px' }}>
      {/* Back Button */}
      <div className="back-button-container">
        <motion.button 
          onClick={onBack} 
          className="back-btn"
          whileHover={{ x: -2 }}
        >
          <ArrowLeft size={16} />
          <span>Back to Feed</span>
        </motion.button>
      </div>

      {/* Article Body Content */}
      <div className="article-detail-body">
        {renderBodyContent()}
      </div>
    </div>
  );
}
