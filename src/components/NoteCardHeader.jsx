import Trash from "../icons/Trash";
import Spinner from "../icons/Spinner.jsx";
const NoteCardHeader = ({ colors, saving, onDelete, onMouseDown }) => (
  <div
    className="card-header"
    style={{ backgroundColor: colors.colorHeader }}
    onMouseDown={onMouseDown}
  >
    <span onClick={onDelete} style={{ cursor: 'pointer' }}><Trash /></span>
    {saving && (
      <div className="card-saving">
        <Spinner color={colors.colorText} />
        <span style={{ color: colors.colorText }}>Saving...</span>
      </div>
    )}
  </div>
);
export default NoteCardHeader;