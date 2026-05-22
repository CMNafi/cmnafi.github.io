import type { APIRoute } from 'astro';
import nowData from '../../data/now.json';

export const GET: APIRoute = async () => {
  return new Response(JSON.stringify(nowData), {
    status: 200,
    headers: {
      'Content-Type': 'application/json'
    }
  });
};
