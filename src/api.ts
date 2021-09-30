import { pipe } from "fp-ts/function"
import * as E from "fp-ts/Either"
import * as T from "fp-ts/Task"
import * as TE from "fp-ts/TaskEither"

import * as io from "io-ts"

import { Api } from "models/api"
import { StoryDecoder } from "models/story"
import { PathReporter } from "io-ts/PathReporter"

function handleError(error: Error | string[]): T.Task<never> {
  console.error(error)
  return T.never
}

function handleSuccess<a>(validation: io.Validation<a>): T.Task<a> {
  const handleValidationError = () => pipe(validation, PathReporter.report, handleError)
  return pipe(validation, E.fold(handleValidationError, T.of))
}

const requests = {
  async get<a>({ decoder, url }: { decoder: io.Decoder<unknown, a>, url: string }) {
    const response = await fetch(url)
    const data = await response.json()

    return decoder.decode(data)
  }
}

export default function makeApi(): Api {
  return {
    fetchStory(storyId) {
      const request = () => requests.get({ decoder: StoryDecoder, url: `https://hacker-news.firebaseio.com/v0/item/${storyId}.json` })
      return pipe(
        TE.tryCatch(request, E.toError),
        TE.fold(handleError, handleSuccess)
      )
    },

    fetchStories(storyType) {
      const request = () => requests.get({ decoder: io.array(io.number), url: "https://hacker-news.firebaseio.com/v0/topstories.json" })
      return pipe(
        TE.tryCatch(request, E.toError),
        TE.fold(handleError, handleSuccess))
    }
  }
}
