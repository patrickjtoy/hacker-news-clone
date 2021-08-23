import * as React from "react"
import { constant, pipe } from "fp-ts/function"

import { render } from "utils"

const Greet = pipe(<h1>Hello, fp-ts!</h1>, constant)
pipe(document.getElementById("app"), render(<Greet />))
