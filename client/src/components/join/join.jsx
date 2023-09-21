import style from "./join.module.css";
import { Input, Button } from "@mui/material";
import devLogo from "../../assets/devChat.png";
import io from "socket.io-client";
import { useEffect, useRef } from "react";

const Join = ({ state, handShake }) => {
  const usernameref = useRef();

  useEffect(() => {
    usernameref.current.focus();
  });

  const handleSubmit = async () => {
    const username = usernameref.current.value;
    if (!username.trim()) return;

    const socket = await io.connect("http://localhost:3001");
    socket.emit("set_username", username);

    handShake(socket);
    state(true);

    //console.log(`Bem vindo ${username}`);
  };

  const handelkeyPress = (e) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };
  return (
    <>
      <div className={style["dev-logo"]}>
        <img src={devLogo} alt="" />
      </div>
      <div className={style["join-container"]}>
        <h2>Bem vindo ao devChat</h2>
        <Input
          inputRef={usernameref}
          placeholder="nome de usuario..."
          onKeyDown={handelkeyPress}
        />
        <Button
          sx={{ mt: 2, mb: 2 }}
          variant="contained"
          onClick={() => handleSubmit()}
        >
          Entrar
        </Button>
      </div>
    </>
  );
};

export default Join;
