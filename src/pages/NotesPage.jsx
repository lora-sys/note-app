// import {fakeData as notes} from "../assets/fakeData.js"
import { useEffect, useState } from "react";
import NoteCard  from "../components/NoteCard.jsx";
// import  {databases} from "../appwrite/config"
import {db} from "../appwrite/data.jsx"
const NotesPage=()=>{
    const [notes,setNotes]=useState([]);
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
            // const response = await databases.listDocuments(
            //     import.meta.env.VITE_DATABASE_ID,
            //     import.meta.env.VITE_COLLECTION_NOTES_ID
            // );
            const response =await db.notes.list();
            console.log("API响应:", response);
            setNotes(response.documents);
        } catch (error) {
            console.error("API请求失败:", {
                message: error.message,
                type: error.type,
                code: error.code
            });
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
      }
    };
    return(
    <div >
        <button onClick={handleCreate}>新建笔记</button>
        {notes.length === 0 ? (
            <p>没有找到笔记数据</p>
        ) : (
            notes.map((note) => (
                <NoteCard note={{ ...note, onDelete: handleDelete }} key={note.$id} />
            ))
        )}
    </div>
    )
}
export default NotesPage;