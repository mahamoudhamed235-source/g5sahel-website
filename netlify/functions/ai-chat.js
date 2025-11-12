exports.handler = async (event, context) => {
  if (event.httpMethod !== 'POST') {
    return { 
      statusCode: 405, 
      body: JSON.stringify({ error: 'Method Not Allowed' }) 
    };
  }

  try {
    const { message } = JSON.parse(event.body);
    
    // ردود ذكية مخصصة لمنطقة الساحل
    const sahelResponses = {
      'security': '🔒 The security situation in the Sahel region is complex and evolving. For current updates, consult official sources like UN missions and regional security agencies.',
      'investment': '💼 The Sahel offers investment opportunities in: Agriculture (sustainable farming), Renewable Energy (solar projects), Mining (gold, uranium), and Infrastructure development.',
      'climate': '🌡️ Climate patterns show increasing desertification but also opportunities in: Water management, Drought-resistant crops, and Solar energy development.',
      'tourism': '🏜️ Tourism potential includes: Cultural heritage sites, Desert adventures, Eco-tourism, and Cultural festivals across the Sahel nations.',
      'niger': '🇳🇪 Niger: Uranium mining, Agriculture (livestock, crops), Renewable energy projects, and Cross-border trade opportunities.',
      'chad': '🇹🇩 Chad: Oil production, Livestock farming, Agriculture development, and Regional trade initiatives.',
      'mali': '🇲🇱 Mali: Gold mining, Cultural heritage tourism, Agricultural products (cotton), and Artisan crafts market.',
      'burkina': '🇧🇫 Burkina Faso: Gold mining, Cotton production, Agricultural development, and Growing tech sector.',
      'mauritania': '🇲🇷 Mauritania: Fisheries, Iron ore mining, Desert tourism, and Renewable energy potential.',
      'default': '🌍 Thank you for your interest in the Sahel region! For detailed AI-powered analysis of economics, security, investment, or development topics, our full AI integration is coming soon. 🚀'
    };

    let aiResponse = sahelResponses.default;
    const lowerMessage = message.toLowerCase();
    
    // تحليل السؤال وإرجاع رد مخصص
    if (lowerMessage.includes('security') || lowerMessage.includes('mali') || lowerMessage.includes('attack')) {
      aiResponse = sahelResponses.security;
    } else if (lowerMessage.includes('investment') || lowerMessage.includes('economy') || lowerMessage.includes('business')) {
      aiResponse = sahelResponses.investment;
    } else if (lowerMessage.includes('climate') || lowerMessage.includes('weather') || lowerMessage.includes('water')) {
      aiResponse = sahelResponses.climate;
    } else if (lowerMessage.includes('tourism') || lowerMessage.includes('travel') || lowerMessage.includes('visit')) {
      aiResponse = sahelResponses.tourism;
    } else if (lowerMessage.includes('niger')) {
      aiResponse = sahelResponses.niger;
    } else if (lowerMessage.includes('chad')) {
      aiResponse = sahelResponses.chad;
    } else if (lowerMessage.includes('mali')) {
      aiResponse = sahelResponses.mali;
    } else if (lowerMessage.includes('burkina') || lowerMessage.includes('faso')) {
      aiResponse = sahelResponses.burkina;
    } else if (lowerMessage.includes('mauritania')) {
      aiResponse = sahelResponses.mauritania;
    }

    return {
      statusCode: 200,
      body: JSON.stringify({
        success: true,
        response: aiResponse,
        type: "sahel_smart_assistant"
      })
    };

  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        success: false,
        error: "Service is currently being enhanced. Please try again later."
      })
    };
  }
};
