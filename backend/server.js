const express = require('express');
const { OpenAI } = require('openai');
const { createClient } = require('@supabase/supabase-js');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../frontend')));

// Clients
let openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

let supabase;
if (process.env.SUPABASE_URL && process.env.SUPABASE_URL.startsWith('http')) {
    supabase = createClient(
        process.env.SUPABASE_URL,
        process.env.SUPABASE_ANON_KEY
    );
} else {
    console.warn('Supabase URL is missing or invalid. DB logging will be disabled.');
}

// Routes
app.post('/api/analyze', async (req, res) => {
    const { text } = req.body;

    if (!text || text.trim() === '') {
        return res.status(400).json({ error: '텍스트를 입력해주세요.' });
    }

    try {
        // OpenAI Sentiment Analysis
        const response = await openai.chat.completions.create({
            model: "gpt-4o",
            messages: [
                {
                    role: "system",
                    content: "You are a sentiment analyzer. Analyze the sentiment of the provided text and return a JSON object with: sentiment (Positive, Negative, or Neutral), confidence (0-100), and reason (a brief explanation in Korean)."
                },
                {
                    role: "user",
                    content: text
                }
            ],
            response_format: { type: "json_object" }
        });

        const result = JSON.parse(response.choices[0].message.content);

        // Save to Supabase
        if (supabase) {
            const { data, error } = await supabase
                .from('emotion_logs')
                .insert([
                    {
                        text: text,
                        sentiment: result.sentiment,
                        confidence: result.confidence,
                        reason: result.reason,
                        created_at: new Date()
                    }
                ]);

            if (error) {
                console.error('Supabase Error:', error);
            }
        }

        res.json(result);
    } catch (err) {
        console.error('API Error:', err);
        res.status(500).json({ error: '분석 중 오류가 발생했습니다.' });
    }
});

// Static files are handled by express.static above

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
