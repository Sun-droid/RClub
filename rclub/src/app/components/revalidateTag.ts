import { revalidateTag } from 'next/cache'

export default async function actionRevalidate() {
  revalidateTag('reservations')
}