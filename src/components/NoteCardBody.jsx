import { bodyParser } from "../utils";

const NoteCardBody = ({ colors, note, textAreaRef, handleKeyUp, setZIndex }) => {
    const handleInput = () => {
        if (textAreaRef.current) {
            textAreaRef.current.style.height = "auto";
            textAreaRef.current.style.height = textAreaRef.current.scrollHeight + "px";
        }
    };

    const handleFocus = () => {
        setZIndex();
    };

    return (
        <div className="card-body">
            <textarea
                style={{ 
                    color: colors?.colorText || "#18181A",
                    backgroundColor: 'transparent',
                    border: 'none',
                    outline: 'none',
                    resize: 'none',
                    width: '100%',
                    minHeight: '60px',
                    fontFamily: 'inherit',
                    fontSize: '14px',
                    lineHeight: '1.5'
                }}
                defaultValue={bodyParser(note?.body || '')}
                ref={textAreaRef}
                onInput={handleInput}
                onFocus={handleFocus}
                onKeyUp={handleKeyUp}
                placeholder="在这里输入笔记内容..."
            />
        </div>
    );
};

export default NoteCardBody;