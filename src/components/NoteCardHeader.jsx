import Trash from "../icons/Trash";
import Spinner from "../icons/Spinner.jsx";

const NoteCardHeader = ({ colors, saving, onDelete, onMouseDown }) => {
    const handleDelete = (e) => {
        e.stopPropagation(); // 防止触发拖拽
        onDelete();
    };

    return (
        <div
            className="card-header"
            style={{ 
                backgroundColor: colors?.colorHeader || "#FED0FD",
                cursor: 'grab',
                userSelect: 'none'
            }}
            onMouseDown={onMouseDown}
        >
            <span 
                onClick={handleDelete} 
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
            >
                <Trash />
            </span>
            {saving && (
                <div className="card-saving">
                    <Spinner color={colors?.colorText || "#18181A"} />
                    <span style={{ color: colors?.colorText || "#18181A" }}>保存中...</span>
                </div>
            )}
        </div>
    );
};

export default NoteCardHeader;