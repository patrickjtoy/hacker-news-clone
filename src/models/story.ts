import * as io from "io-ts"

export enum StoryType {
  NEW,
  TOP,
  BEST
}

export const StoryDecoder = io.type({
  id: io.number,
  by: io.string,
  score: io.number,
  time: io.number,
  title: io.string,
  type: io.string,
  url: io.string
})

export type Story = io.TypeOf<typeof StoryDecoder>
