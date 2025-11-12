exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: JSON.stringify({ error: 'Method Not Allowed' }) };
  }

  try {
    const { message } = JSON.parse(event.body);
    
    // استخدم fetch بدلاً من axios
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: "You are an expert on the Sahel and Sahara region in Africa. Provide helpful, accurate information about economics, investment, security, climate, and development in the region. Respond in the same language as the user's question."
          },
          {
            role: "user",
            content: message
          }
        ],
        max_tokens: 500,
        temperature: 0.7
      })
    });

    const data = await response.json();
    const aiResponse = data.choices[0].message.content;

    return {
      statusCode: 200,
      body: JSON.stringify({ 
        success: true, 
        response: aiResponse 
      })
    };

  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ 
        success: false, 
        error: "AI service is temporarily unavailable. Please try again later." 
      })
    };
  }
};
