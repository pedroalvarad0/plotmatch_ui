import OpenAI from 'openai';
import { env } from '$env/dynamic/private';

if (!env.PRIVATE_OPENAI_API_KEY) {
    throw new Error('OPENAI_API_KEY is not set in environment variables');
}

const openai = new OpenAI({
    apiKey: env.PRIVATE_OPENAI_API_KEY
});

/**
 * Generates an embedding for the given text using OpenAI's API
 * @param {string} text - The text to generate an embedding for
 * @returns {Promise<number[]>} The embedding vector
 */
export async function generateEmbedding(text) {
    try {
        const response = await openai.embeddings.create({
            model: "text-embedding-3-small",
            input: text,
        });

        return response.data[0].embedding;
    } catch (error) {
        console.error('Error generating embedding:', error);
        throw error;
    }
} 