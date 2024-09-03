import { revalidateTag } from 'next/cache'
import { kv } from '@vercel/kv';
export default async function actionRevalidate() {
    // Fetch data from Vercel KV
    const data = await kv.get('reservations');
  revalidateTag('reservations')
}