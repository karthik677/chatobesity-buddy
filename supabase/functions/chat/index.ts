
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { message } = await req.json();

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: 'You are a helpful assistant specialized in obesity reduction and healthy lifestyle advice. Only provide information related to weight management, nutrition, exercise, and healthy living. If asked about unrelated topics, politely redirect the conversation to obesity reduction and health-related matters. Keep responses concise and practical.'
          },
          { role: 'user', content: message }
        ],
      }),
    });

    const data = await response.json();
    console.log('OpenAI response:', data);

    if (data.error) {
      if (data.error.code === 'insufficient_quota') {
        return new Response(
          JSON.stringify({
            error: "The AI service is currently unavailable due to high demand. Please try again later or contact support if the issue persists."
          }),
          {
            status: 429,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          }
        );
      }
      throw new Error(data.error.message || 'Error from OpenAI API');
    }

    return new Response(
      JSON.stringify({ answer: data.choices[0].message.content }), 
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error('Error:', error);
    const errorMessage = error.message.includes('quota') 
      ? "The AI service is currently unavailable due to high demand. Please try again later or contact support if the issue persists."
      : error.message;
      
    return new Response(
      JSON.stringify({ error: errorMessage }), 
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
