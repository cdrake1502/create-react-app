import React, { useState } from 'react';

function CopyQuiz(text) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1000); // Optional: Show copied message for 1 second
    } catch (err) {
      console.error('Failed to copy text:', err);
    }
  };

  return { copied, copyToClipboard };
}

export default CopyQuiz;