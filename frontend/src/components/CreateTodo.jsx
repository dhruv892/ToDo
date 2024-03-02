import { useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";

import { useRecoilValue } from "recoil";
import { tokenAtom } from "./store/atoms.jsx";

export function CreateTodo({ handleRefreshTodos }) {
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const token = useRecoilValue(tokenAtom);

    // console.log(token);
    // const decodedToken = jwtDecode(token);
    // const userId = `${decodedToken.id}`;

    return (
        <div className="flex justify-center">
            <div className="flex flex-col">
                <div className="flex justify-center">
                    <h1 className="text-2xl text-white"> Create ToDo</h1>
                </div>
                <div>
                    <input
                        id="title"
                        value={title}
                        type="text"
                        placeholder="Enter Title"
                        className="pl-4 mt-2 bg-slate-700 rounded-md border-0 text-stone-200"
                        onChange={(e) => {
                            setTitle(e.target.value);
                        }}
                    />
                    <br />
                    <input
                        id="desc"
                        value={desc}
                        type="text"
                        placeholder="Enter Description"
                        className="pl-4 mt-2 bg-slate-700 rounded-md border-0 text-stone-200"
                        onChange={(e) => {
                            setDesc(e.target.value);
                        }}
                    />{" "}
                    <br />
                </div>
                <div className="flex justify-center">
                    <button
                        onClick={async () => {
                            await axios.post(
                                `http://localhost:3000/todo`,
                                {
                                    title: title,
                                    description: desc,
                                },
                                {
                                    headers: {
                                        Authorization: `Bearer ${token}`,
                                    },
                                }
                            );
                            setTitle("");
                            setDesc("");
                            await handleRefreshTodos();
                        }}
                        // style={{ marginTop: 5 }}
                        className="pl-4 pr-4 mt-2 rounded-lg border-0 bg-cyan-700"
                    >
                        {" "}
                        Enter{" "}
                    </button>
                </div>
            </div>
        </div>
    );
}

//Prop validation
CreateTodo.propTypes = {
    handleRefreshTodos: PropTypes.func.isRequired,
};
