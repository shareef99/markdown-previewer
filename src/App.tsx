import { ChangeEvent, useState } from "react";
import ReactMarkdown from "react-markdown";
import "./App.css";

const App = () => {
    const [editorText, setEditorText] = useState<string>(
        `# Welcome to my React Markdown Previewer!

## This is a sub-heading...
### And here's some other cool stuff:
Heres some code, \`<div></div>\`, between 2 backticks.
\`\`\`
// this is multi-line code:

function anotherExample(firstLine, lastLine) {
  if (firstLine == '\`\`\`' && lastLine == '\`\`\`') {
    return multiLineCode;
  }
}
\`\`\`
You can also make text **bold**... whoa!

Or _italic_.

Or... wait for it... **_both!_**

And feel free to go crazy ~~crossing stuff out~~.
There's also [links](https://www.freecodecamp.org), and
> Block Quotes!


- And of course there are lists.
  - Some are bulleted.
     - With different indentation levels.
        - That look like this.


1. And there are numbered lists too.
1. Use just 1s if you want!
1. And last but not least, let's not forget embedded images:

![freeCodeCamp Logo](https://cdn.freecodecamp.org/testable-projects-fcc/images/fcc_secondary.svg)`
    );

    const editorHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
        e.preventDefault();
        setEditorText(e.target.value);
    };

    console.log(editorText);

    return (
        <section className="main">
            <form>
                <div className="editor-wrapper">
                    <span className="editorHeading">Editor</span>
                    <textarea
                        name="editor"
                        id="editor"
                        value={editorText}
                        onChange={editorHandler}
                        cols={30}
                        rows={10}
                    ></textarea>
                </div>
            </form>
            <div>
                <article>
                    <span className="previewHeading">Preview</span>
                    <div className="previewBody" id="preview">
                        <ReactMarkdown
                            components={{
                                p: ({ node, children }) => {
                                    if (
                                        (node.children[0] as any).tagName ===
                                        "img"
                                    ) {
                                        const image: any = node.children[0];
                                        return (
                                            <div className="image-container">
                                                <img
                                                    className="image"
                                                    src={image.properties.src}
                                                    alt={image.properties.alt}
                                                />
                                            </div>
                                        );
                                    }
                                    // Return default child if it's not an image
                                    return <p>{children}</p>;
                                },
                                h1: ({ children }) => {
                                    return (
                                        <h1 className="heading1">{children}</h1>
                                    );
                                },
                                pre: ({ children }) => {
                                    return (
                                        <pre className="pre">{children}</pre>
                                    );
                                },
                            }}
                        >
                            {editorText}
                        </ReactMarkdown>
                    </div>
                </article>
            </div>
        </section>
    );
};

export default App;
