/**
 * THIS FILE SIMULATES REAL API CALLS
 * You can later replace the URLs with your real n8n webhook URLs.
 */

export async function getTopStats() {
  // TODO: Replace this with your real n8n webhook URL
  return {
    countries: [
      {
        code: "ML",
        name: "Mali",
        agri_gdp: "$4.1B",
        opportunities: 28,
        industry_growth: 4.2,
      },
      {
        code: "NE",
        name: "Niger",
        agri_gdp: "$3.7B",
        opportunities: 21,
        industry_growth: 3.8,
      },
      {
        code: "TD",
        name: "Chad",
        agri_gdp: "$2.9B",
        opportunities: 18,
        industry_growth: 2.9,
      },
      {
        code: "BF",
        name: "Burkina Faso",
        agri_gdp: "$5.1B",
        opportunities: 33,
        industry_growth: 4.6,
      },
    ],
    total_opps: 126,
  };
}

export async function getMarkets() {
  // TODO: Connect to real African markets API or n8n feed
  return {
    currencies: [
      { pair: "USD/XOF", price: 650, change: "+0.5%" },
      { pair: "EUR/XOF", price: 720, change: "+0.2%" },
      { pair: "GBP/XOF", price: 840, change: "-0.1%" },
    ],
    commodities: [
      { name: "Gold", price: "1975 USD/oz", change: "-0.3%" },
      { name: "Wheat", price: "345 USD", change: "+1.1%" },
      { name: "Oil Brent", price: "84.21 USD", change: "-0.7%" },
    ],
  };
}

export async function queryAI({ prompt, lang }) {
  /**
   * This function will later send requests to n8n → ChatGPT API
   * For now, it returns a simulated AI response.
   */

  // TODO: Connect to your real n8n webhook for AI
  return {
    answer: `AI Response (${lang}): Based on your question — "${prompt}"`,
  };
}
