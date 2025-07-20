import { bodyParser } from "../utils";

const NoteCardBody = ({ colors, note, textAreaRef, handleKeyUp, setZIndex }) => (
  <div className="card-body" style={{ padding: '12px' }}>
    <textarea
      style={{ 
        color: colors.colorText,
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
      defaultValue={bodyParser(note.body)}
      ref={textAreaRef}
      placeholder="开始输入你的笔记..."
      onInput={() => {
        if (textAreaRef.current) {
          textAreaRef.current.style.height = "auto";
          textAreaRef.current.style.height = textAreaRef.current.scrollHeight + "px";
        }
      }}
      onFocus={setZIndex}
      onKeyUp={handleKeyUp}
      onKeyDown={(e) => {
        // 支持 Ctrl+Enter 保存
        if (e.ctrlKey && e.key === 'Enter') {
          handleKeyUp();
        }
      }}
    />
  </div>
);

export default NoteCardBody;