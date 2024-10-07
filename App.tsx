import * as React from 'react'
import CodeMirror from '@uiw/react-codemirror'
import { langs } from '@uiw/codemirror-extensions-langs'
import { EditorView, Decoration } from '@codemirror/view'
import { StateField } from '@codemirror/state'

export const CodeMirrorCustomHighlighting = (): JSX.Element => {
    //State to hold the code
    const [code, setCode] = React.useState<string>()
    const handleChangeContent = (val: string): void => {
        setCode(val)
    }
    //Regex to find all input between !{}!
    const regex = /!\{(.*?)\}!/g

    //StateField to highlight the code
    //This will trigger the update function whenever the code changes
    //The update function will find all the matches of the regex and highlight them
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

    //CodeMirror component
    //Make sure to wrap the CodeMirror component with a wrapper div for better styling with other components
    return (
        <CodeMirror
            theme={'dark'}
            placeholder={`Write your javascript code here...`}
            value={code}
            height="40vh"
            onChange={(val, _viewUpdate) => handleChangeContent(val)}
            extensions={[langs['javascript'](), highlight_extension]}
        />
    )
}
