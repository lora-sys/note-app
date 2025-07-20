// import {fakeData as notes} from "../assets/fakeData.js"
import { useEffect, useState } from "react";
import NoteCard  from "../components/NoteCard.jsx";
// import  {databases} from "../appwrite/config"
import {db} from "../appwrite/data.jsx"

const NotesPage=()=>{
    const [notes,setNotes]=useState([]);
    const [isCreating, setIsCreating] = useState(false);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    
    // useEffect(()=>{
    //     init();
    // },[]);
    useEffect(() => {
        console.log("当前环境变量：", {
          endpoint: import.meta.env.VITE_APPWRITE_ENDPOINT,
          projectId: import.meta.env.VITE_APPWRITE_PROJECT_ID,
          databaseId: import.meta.env.VITE_DATABASE_ID,
          collectionId: import.meta.env.VITE_COLLECTION_NOTES_ID
        });
        init();
      }, []);
      
      const init = async () => {
        try {
            const response = await db.notes.list();
            console.log("API响应:", response);
            setNotes(response.documents);
        } catch (error) {
            console.error("API请求失败:", {
                message: error.message,
                type: error.type,
                code: error.code
            });
            // 可以在这里添加用户友好的错误提示
            if (error.code === 'network_error') {
                alert('网络连接失败，请检查网络后刷新页面');
            } else {
                alert('加载笔记失败，请刷新页面重试');
            }
        }
    };
    
    const handleDelete = (id) => {
      setNotes((prev) => prev.filter((note) => note.$id !== id));
    };
    
    const handleCreate = async () => {
        try {
            const newNote = await db.notes.create({
                body: '',
                colors: JSON.stringify({ colorHeader: '#FED0FD', colorBody: '#FEE5FD', colorText: '#18181A' }),
                position: JSON.stringify({ x: 100, y: 100 })
            });
            setNotes((prev) => [...prev, newNote]);
        } catch (error) {
            console.error('创建笔记失败:', error);
            alert('创建笔记失败，请检查网络连接后重试');
        }
    };
    
    if (isLoading) {
        return (
            <div style={{ 
                display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'center', 
                height: '100vh',
                fontSize: '18px',
                color: '#666'
            }}>
                加载中...
            </div>
        );
    }
    
    return(
    <div style={{ padding: '20px' }}>
        <div style={{ 
            marginBottom: '20px', 
            display: 'flex', 
            alignItems: 'center', 
            gap: '10px' 
        }}>
            <button 
                onClick={handleCreate}
                disabled={isCreating}
                style={{
                    padding: '10px 20px',
                    backgroundColor: '#007bff',
                    color: 'white',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: isCreating ? 'not-allowed' : 'pointer',
                    opacity: isCreating ? 0.6 : 1,
                    fontSize: '16px',
                    fontWeight: 'bold'
                }}
            >
                {isCreating ? '创建中...' : '➕ 新建笔记'}
            </button>
            {error && (
                <span style={{ color: 'red', fontSize: '14px' }}>
                    {error}
                </span>
            )}
        </div>
        
        {notes.length === 0 ? (
            <div style={{ 
                textAlign: 'center', 
                padding: '40px',
                color: '#666'
            }}>
                <p>还没有笔记，点击上方按钮创建第一个笔记吧！</p>
            </div>
        ) : (
            notes.map((note) => (
                <NoteCard note={{ ...note, onDelete: handleDelete }} key={note.$id} />
            ))
        )}
    </div>
    )
}

export default NotesPage;