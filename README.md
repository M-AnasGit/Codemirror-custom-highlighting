# CodeMirror Custom Syntax Highlighting in React

This project demonstrates how to integrate **CodeMirror** into a React application and implement custom syntax highlighting. The example highlights any text wrapped in `!{}` with a specific style using **CodeMirror's** extensions API.

## Features

- **Custom Syntax Highlighting**: Highlights any text wrapped in `!{}` with a custom background and opacity.
- **React Integration**: Uses `@uiw/react-codemirror` for seamless integration of CodeMirror with React.
- **Regex-based Highlighting**: Dynamically identifies and highlights portions of text based on a regular expression.
- **Customizable Styling**: Modify the appearance of the highlighted text, such as background color or opacity.

## Installation

1. Clone this repository:

    ```bash
    git clone https://github.com/yourusername/codemirror-custom-highlighting.git
    ```

2. Navigate to the project directory:

    ```bash
    cd codemirror-custom-highlighting
    ```

3. Install dependencies:

    ```bash
    npm install
    ```

4. Run the project:

    ```bash
    npm start
    ```

## Usage

The project includes custom syntax highlighting for any text enclosed in `!{}`. You can use the CodeMirror editor to test this feature. 

### Code Example

Here’s the core code for integrating custom highlighting with CodeMirror:

```typescript
import * as React from 'react'
import CodeMirror from '@uiw/react-codemirror'
import { langs } from '@uiw/codemirror-extensions-langs'
import { EditorView, Decoration } from '@codemirror/view'
import { StateField } from '@codemirror/state'

export const CodeMirrorCustomHighlighting = (): JSX.Element => {
    const [code, setCode] = React.useState<string>()

    const handleChangeContent = (val: string): void => {
        setCode(val)
    }

    // Regex to find all input between !{}!
    const regex = /!\{(.*?)\}!/g

    const highlight_extension = StateField.define({
        create() {
            return Decoration.none
        },
        update(_value, transaction) {
            let decorations: any[] = []
            const { state } = transaction
            const text = state.doc.toString()
            let match
            while ((match = regex.exec(text))) {
                const highlight_decoration = Decoration.mark({
                    attributes: {
                        style: `background-color: #000; opacity: 0.5`
                    }
                })
                decorations.push(
                    highlight_decoration.range(match.index, match.index + match[0].length)
                )
            }
            return Decoration.set(decorations)
        },
        provide: (field) => EditorView.decorations.from(field)
    })

    return (
        <CodeMirror
            theme={'dark'}
            placeholder={`Write your JavaScript code here...`}
            value={code}
            height="40vh"
            onChange={(val, _viewUpdate) => handleChangeContent(val)}
            extensions={[langs['javascript'](), highlight_extension]}
        />
    )
}
