const { OpenAI } = require('openai');
const { openAI } = require('../config');

let openai = false;

/**
 * Init OpenAI
 */
function initOpenAi() {
    if (`${openAI.privateKey}`.length < 15) {
        return;
    }
    openai = new OpenAI({
        apiKey: openAI.privateKey,
    });
}

/**
 * Get a suggestion from OpenAI
 * @param prompt {string}
 * @returns {*|string}
 */
async function getOpenAiSuggestion(prompt) {
    if (openai === false) {
        initOpenAi();
    }

    // detect if openai is not configured
    if (openai === false) {
        // introduce a small delay, so users feel the AI doing it's job
        await new Promise((resolve) => setTimeout(resolve, 2000));
        return (
            `Dummy response for prompt: ${prompt}\n` +
            `Please configure OpenAI to get real responses.`
        );
    }

    const chatCompletion = await openai.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [{ role: 'user', content: prompt }],
    });
    return chatCompletion.choices[0].message.content;
}

module.exports = {
    getOpenAiSuggestion,
};
