const axios = require('axios');

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const { message } = JSON.parse(event.body);
    
    const response = await axios.post('https://api.openai.com/v1/chat/completions', {
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
    }, {
      headers: {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json'
      }
    });

    const aiResponse = response.data.choices[0].message.content;

    return {
      statusCode: 200,
      body: JSON.stringify({ 
        success: true, 
        response: aiResponse 
      })
    };

  } catch (error) {
    console.error('Error:', error.response?.data || error.message);
    
    return {
      statusCode: 500,
      body: JSON.stringify({ 
        success: false, 
        error: "AI service is temporarily unavailable. Please try again later." 
      })
    };
  }
};
