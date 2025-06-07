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
    return(
    <div >
        {notes.length === 0 ? (
            <p>没有找到笔记数据</p>
        ) : (
            notes.map((note) => (
                <NoteCard note={note} key={note.$id} />
            ))
        )}
    </div>
    )
}
export default NotesPage;