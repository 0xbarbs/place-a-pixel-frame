/** @jsxImportSource frog/jsx */

import { Frog } from 'frog'
import { neynar as nnHub } from "frog/hubs";
import { neynar as nnMiddleware } from "frog/middlewares";
import { devtools } from 'frog/dev'
import { handle } from 'frog/next'
import { serveStatic } from 'frog/serve-static'
import { SelectPixelFrame } from "@/frames/SelectPixelFrame";
import { HomeFrame } from "@/frames/HomeFrame";
import { FRAME_HEIGHT, FRAME_WIDTH } from "@/constants";
import { CanvasFrame } from "@/frames/CanvasFrame";
import { FaqFrame } from "@/frames/FaqFrame";
import { PickColorFrame } from "@/frames/PickColorFrame";

const app = new Frog({
  hub: nnHub({apiKey: process.env.NEYNAR_API_KEY!}),
  assetsPath: "/",
  basePath: "/api",
  imageOptions: {
    width: FRAME_WIDTH,
    height: FRAME_HEIGHT,
    fonts: [
      {
        name: 'VT323',
        weight: 400,
        source: 'google',
      }
    ],
  },
})

const neynarMiddleware = nnMiddleware({
  apiKey: process.env.NEYNAR_API_KEY!,
  features: ['interactor'],
})

app.frame("/", HomeFrame)
app.frame("/faq", FaqFrame)
app.frame("/canvas", CanvasFrame)
app.frame("/select", neynarMiddleware, SelectPixelFrame)
app.frame("/color", neynarMiddleware, PickColorFrame)

devtools(app, { serveStatic })

export const GET = handle(app)
export const POST = handle(app)
