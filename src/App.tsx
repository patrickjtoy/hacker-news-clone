import React, { useEffect, useMemo, useState } from "react"

import { pipe } from "fp-ts/function"
import * as Array from 'fp-ts/Array'
import * as ROArray from 'fp-ts/ReadonlyArray'
import { sequenceArray } from 'fp-ts/Task'

import makeApi from "api"
import { Story, StoryType } from "models/story"
import { render } from "utils"


function App() {
  const [stories, setStories] = useState<ReadonlyArray<Story>>([])

  const apiClient = useMemo(() => {
    return makeApi()
  }, [])
  const fetchTopStoryIds = apiClient.fetchStories(StoryType.TOP)

  useEffect(() => {
    (async () => {
      const storyIds = await fetchTopStoryIds()
      const tasks = pipe(storyIds, Array.takeLeft(10), Array.map(apiClient.fetchStory))

      const fetchTopStories = sequenceArray(tasks)
      const topStories = await fetchTopStories()
      setStories(topStories)
    })()
  }, [])

  return (
    <>
      <div>Top 10 Stories:</div>
      <ol>
        {pipe(stories, ROArray.map(({ id, title, url }) => (
          <li key={id}>
            <a href={url} target="_blank">{title}</a>
          </li>
        )))}
      </ol>
    </>
  )
}

pipe(document.getElementById("app"), render(<App />))
