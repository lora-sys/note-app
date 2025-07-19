import { bodyParser } from "../utils";

const NoteCardBody = ({ colors, note, textAreaRef, handleKeyUp, setZIndex }) => (
  <div className="card-body">
    <textarea
      style={{ color: colors.colorText }}
      defaultValue={bodyParser(note.body)}
      ref={textAreaRef}
      onInput={() => {
        if (textAreaRef.current) {
          textAreaRef.current.style.height = "auto";
          textAreaRef.current.style.height = textAreaRef.current.scrollHeight + "px";
        }
      }}
      onFocus={setZIndex}
      onKeyUp={handleKeyUp}
    />
  </div>
);
export default NoteCardBody;