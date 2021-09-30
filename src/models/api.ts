import { Task } from 'fp-ts/Task'

import { Story, StoryType } from "./story"

export type Api = {
  fetchStory(storyId: number): Task<Story>
  fetchStories(storyType: StoryType): Task<number[]>
}
