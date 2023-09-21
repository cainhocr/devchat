import { useState } from "react";
import "./App.css"
import Chat from "./components/chat/chat"
import Join from "./components/join/join"


const App = () => {
const [handShake, setHandShake] = useState(null);
const [chatvisibility, setchatvisibility] = useState(false);


  return (
    <div className="app">
{chatvisibility ? <Chat socket={handShake} /> : <Join state={setchatvisibility} handShake={setHandShake} />}
    </div>
  );
};

export default App


