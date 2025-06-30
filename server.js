const express = require('express');
const app = express();
require('dotenv').config();
const port = process.env.PORT || 3003; // Use environment variable or default to 3000

// Middleware to parse JSON bodies
app.use(express.json());

// Sample data (your provided JSON)
const companiesData = [
    {
        "company": "Allstate Corporation",
        "ticker": "ALL",
        "earnings_date": "2025-05-08",
        "questions_answers": [
            {
                "question": "Can you explain the drivers behind the increase in combined ratio this quarter?",
                "answer": "The increase was driven by elevated catastrophe losses and higher claim severity, particularly in auto insurance."
            },
            {
                "question": "What are your expectations for rate increases going forward?",
                "answer": "We anticipate further rate increases in key markets, guided by our actuarial analysis and regulatory approvals."
            },
            {
                "question": "How are you managing auto loss inflation?",
                "answer": "We are leveraging telematics data to optimize underwriting and have launched cost containment programs."
            },
            {
                "question": "Are you seeing any improvements in customer retention?",
                "answer": "Yes, with improved digital servicing and more personalized offerings, we've seen a modest uptick in retention metrics."
            },
            {
                "question": "What's your outlook on catastrophe exposure management?",
                "answer": "We're actively adjusting our geographic footprint and reinsurance structure to reduce net exposure to severe weather events."
            }
        ]
    },
    {
        "company": "Progressive Corporation",
        "ticker": "PGR",
        "earnings_date": "2025-05-10",
        "questions_answers": [
            {
                "question": "What drove strong growth in written premiums this quarter?",
                "answer": "Premium growth was fueled by increased policy count in personal lines and favorable pricing momentum."
            },
            {
                "question": "How is Snapshot telematics influencing pricing and loss ratios?",
                "answer": "Snapshot is allowing more accurate pricing and behavioral segmentation, contributing to better loss performance."
            },
            {
                "question": "What are your strategic priorities in commercial lines?",
                "answer": "We're expanding distribution and investing in technology to improve quote turnaround and agent enablement."
            },
            {
                "question": "How are you navigating the current reinsurance market?",
                "answer": "While rates remain elevated, our risk appetite and retention levels remain stable, thanks to disciplined underwriting."
            },
            {
                "question": "Are you facing any operational headwinds post-COVID?",
                "answer": "Operationally, we’re focused on hybrid work strategies, maintaining service levels, and automation for FNOL processes."
            }
        ]
    },
    {
        "company": "MetLife, Inc.",
        "ticker": "MET",
        "earnings_date": "2025-04-30",
        "questions_answers": [
            {
                "question": "What are the main growth drivers in your international business?",
                "answer": "Emerging markets, especially in Asia, are driving growth through digital channels and expanding middle-class demand."
            },
            {
                "question": "How do you plan to enhance margins in the U.S. Group Benefits segment?",
                "answer": "Margin improvement will come from pricing discipline, cost initiatives, and tech-driven claims processing."
            },
            {
                "question": "Can you elaborate on your capital deployment strategy?",
                "answer": "We're maintaining a balanced approach: reinvestment in the business, strategic M&A, and shareholder return."
            },
            {
                "question": "How do interest rate changes affect your business?",
                "answer": "Higher rates benefit our spread-based businesses, but we remain cautious on reinvestment yields and duration risk."
            },
            {
                "question": "What steps are you taking in ESG and sustainability?",
                "answer": "We're embedding ESG into investment decisions and operations, targeting net-zero goals and social impact initiatives."
            }
        ]
    },
    {
        "company": "Prudential Financial, Inc.",
        "ticker": "PRU",
        "earnings_date": "2025-05-05",
        "questions_answers": [
            {
                "question": "What are your key growth areas in retirement solutions?",
                "answer": "We're focusing on protected income products and expanding distribution partnerships in the U.S. and Japan."
            },
            {
                "question": "How are market conditions impacting your asset management division?",
                "answer": "We're seeing increased demand for fixed income and liability-driven investments amid market volatility."
            },
            {
                "question": "What impact has longevity risk had on your annuity book?",
                "answer": "We're monitoring longevity trends closely and have hedging strategies in place for our older annuity cohorts."
            },
            {
                "question": "How is your digital transformation progressing?",
                "answer": "We're deploying AI in underwriting and chatbots in servicing, leading to faster response times and lower costs."
            },
            {
                "question": "What are you doing to de-risk your balance sheet?",
                "answer": "We've reduced equity exposure and increased high-grade credit allocation to better align with liability profiles."
            }
        ]
    }
];



// app.get('/api/companies/questions', (req, res) => {
//   const response = companiesData.map(company => ({
//       company: company.company,
//       ticker: company.ticker,
//       earnings_date: company.earnings_date,
//       questions_answers: company.questions_answers
//   }));
//   res.json(response);
// });

// // Endpoint to get all questions and answers for a specific company
// app.get('/api/:company/questions', (req, res) => {
//     const companyName = req.params.company;
//     const company = companiesData.find(c => c.company.toLowerCase() === companyName.toLowerCase());
    
//     if (!company) {
//         return res.status(404).json({ error: 'Company not found' });
//     }
    
//     res.json({
//         company: company.company,
//         ticker: company.ticker,
//         earnings_date: company.earnings_date,
//         questions_answers: company.questions_answers
//     });
// });

// // Endpoint to get a specific question and answer for a company
// app.post('/api/question', (req, res) => {
//   const { company, question } = req.body;
  
//   if (!company || !question) {
//       return res.status(400).json({ error: 'Both company and question are required in the request body' });
//   }
  
//   const companyData = companiesData.find(c => c.company.toLowerCase() === company.toLowerCase());
  
//   if (!companyData) {
//       return res.status(404).json({ error: 'Company not found' });
//   }
  
//   const qa = companyData.questions_answers.find(q => 
//       q.question.toLowerCase().includes(question.toLowerCase())
//   );
  
//   if (!qa) {
//       return res.status(404).json({ error: 'Question not found' });
//   }
  
//   res.json(qa.answer);
// });



// Helper function to convert questions_answers array to a flattened object
const convertQuestionsToObject = (questionsAnswers) => {
    const result = {};
    questionsAnswers.forEach((qa, index) => {
        result[`question${index + 1}`] = qa.question;
        result[`answer${index + 1}`] = qa.answer;
    });
    return result;
};

// Endpoint92 to get all companies' questions and answers (no arrays)
app.get('/api/companies/questions', (req, res) => {
    const response = companiesData.reduce((acc, company) => {
        acc[company.company] = {
          company: company.company,
          ticker: company.ticker,
          earnings_date: company.earnings_date,
          questions_answers: convertQuestionsToObject(company.questions_answers)
        };
        return acc;
    }, {});
    res.json(response);
});

// Endpoint to get a specific company's questions and answers (no arrays)
app.get('/api/:company/questions', (req, res) => {
    const companyName = req.params.company;
    const company = companiesData.find(c => c.company.toLowerCase() === companyName.toLowerCase());
    
    if (!company) {
        return res.status(404).json({ error: 'Company not found' });
    }
    
    res.json({
        company: company.company,
        ticker: company.ticker,
        earnings_date: company.earnings_date,
        questions_answers: convertQuestionsToObject(company.questions_answers)
    });
});

// Endpoint to get a specific question and answer for a company (unchanged)
app.post('/api/question', (req, res) => {
    const { company, question } = req.body;
    
    if (!company || !question) {
        return res.status(400).json({ error: 'Both company and question are required in the request body' });
    }
    
    const companyData = companiesData.find(c => c.company.toLowerCase() === company.toLowerCase());
    
    if (!companyData) {
        return res.status(404).json({ error: 'Company not found' });
    }
    
    const qa = companyData.questions_answers.find(q => 
        q.question.toLowerCase().includes(question.toLowerCase())
    );
    
    if (!qa) {
        return res.status(404).json({ error: 'Question not found' });
    }
    
    res.json({ answer: qa.answer });
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
