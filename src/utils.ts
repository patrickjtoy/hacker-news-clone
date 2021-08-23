import * as React from 'react'
import * as ReactDOM from "react-dom"

export const render = (element: React.ReactElement) => {
  return (container: ReactDOM.Container | null) => {
    return ReactDOM.render(element, container)
  }
}

