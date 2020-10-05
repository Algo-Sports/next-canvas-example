import Head from 'next/head'
import styles from '../styles/Home.module.css'
import CanvasLayout from './components/CanvasLayout'
import GameCanvas from './components/GameCanvas'


export default function Home() {
  return (
    <CanvasLayout>
      <GameCanvas canvasWidth = "1000" canvasHeight = "400">
      </GameCanvas>
    </CanvasLayout>
  )
}
