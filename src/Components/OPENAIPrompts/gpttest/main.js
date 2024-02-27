const apiKey = "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";
const endpoint = "https://api.openai.com/v1/chat/completions";

async function generateTagline() {
  try {
    
    // Make the API call using Fetch API
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        prompt: 'Give me a 10 question quiz about computer science. 4 multiple choice , 3 fill in the blank and 3 short answer as well as give me the answers to these questions.',
        max_tokens: 500, // Optional: Limit the length of the response
        temperature: 0.7, // Optional: Controls creativity (0.0: deterministic, 1.0: more creative)
        n: 1, // Number of completions to generate (1 in this case)
      })
    });

    // Check if the response is successful
    if (response.ok) {
      const completion = await response.json();
      console.log("Generated tagline:", completion.choices[0].text.trim());
    } else {
      console.error("API call failed with status:", response.status);
    }
  } catch (error) {
    console.error(error);
  }
}

// Call the function to generate and print the tagline
generateTagline();
