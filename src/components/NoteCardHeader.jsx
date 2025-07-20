import Trash from "../icons/Trash";
import Spinner from "../icons/Spinner.jsx";

const NoteCardHeader = ({ colors, saving, onDelete, onMouseDown }) => (
  <div
    className="card-header"
    style={{ 
      backgroundColor: colors.colorHeader,
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '8px 12px'
    }}
    onMouseDown={onMouseDown}
  >
    <div style={{ flex: 1 }}></div>
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
      {saving && (
        <div className="card-saving" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          <Spinner color={colors.colorText} />
          <span style={{ color: colors.colorText, fontSize: '12px' }}>Saving...</span>
        </div>
      )}
      <span 
        onClick={onDelete} 
        style={{ 
          cursor: 'pointer',
          padding: '4px',
          borderRadius: '4px',
          transition: 'background-color 0.2s'
        }}
        onMouseEnter={(e) => {
          e.target.style.backgroundColor = 'rgba(255, 0, 0, 0.1)';
        }}
        onMouseLeave={(e) => {
          e.target.style.backgroundColor = 'transparent';
        }}
        title="删除笔记"
      >
        <Trash />
      </span>
    </div>
  </div>
);

export default NoteCardHeader;