export const runtime = 'edge';

const apiKey = process.env.API_KEY;
const backendUrl = process.env.BACKEND_BASE_URL;

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const response = await fetch(`${backendUrl}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        ...body,
        stream: true,
      }),
    });

    if (!response.ok) {
      return new Response(
        JSON.stringify({
          error: `Backend error: ${response.status} ${response.statusText}`
        }),
        {
          status: response.status,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    return new Response(response.body, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      },
    });
  } catch (error) {
    console.error('API route error:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
}