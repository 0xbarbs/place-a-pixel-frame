import { getFrameMetadata } from 'frog/next'
import type { Metadata } from 'next'

import styles from './page.module.css'

export async function generateMetadata(): Promise<Metadata> {
  const frameTags = await getFrameMetadata(
    `${process.env.NEXT_PUBLIC_URL || "http://localhost:3000"}/api`,
  );
  return {
    title: "Farcanvas",
    description: 'The Farcaster driven pixel canvas',
    other: frameTags,
  };
}

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.center}>
        <h1>Homepage coming soon ❤️</h1>
      </div>
    </main>
  )
}
