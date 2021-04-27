import { Dialog, Button } from '@material-ui/core';
import React, { useState } from 'react'
import Axios from 'axios'
import CardTableForum from './Cards/CardTableForum';


export default function UpdatePopup(props) {
    const { openPopup, setOpenPopup } = props;

    const [newAuthor, setNewAuthor] = useState("");
    const [newTitle, setNewTitle] = useState("");
    const [newDescription, setNewDescription] = useState("");
    const [idd]= useState();

    const updateForum = (id) => {
        Axios.put("http://localhost:3001/forum/update",

            {
                id: id,
                author: newAuthor,
                title: newTitle,
                description: newDescription
            });
    };


    return (

        <Dialog open={openPopup}
        >
            <div className="ml-auto">
                <Button
                    color="secondary"

                    onClick={() => setOpenPopup(false)}
                >
                    <div style={{ diplay: ' flex' }}> x</div>

                </Button>
            </div>
            <div className="w-full lg:w-12/12 px-12">
                <div className="relative w-full mb-3">
                    <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="grid-password"
                    >
                        Username
              </label>
                    <input
                        type="text"
                        placeholder="Enter your new username"
                        onChange={(event) => {
                            setNewAuthor(event.target.value);
                        }}
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    />
                </div>
            </div>

            <div className="w-full lg:w-12/12 px-12">
                <div className="relative w-full mb-3">
                    <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="grid-password"
                    >
                        Title
              </label>
                    <input
                        type="text"
                        placeholder="Enter your new title"
                        onChange={(event) => {
                            setNewTitle(event.target.value);
                        }}
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    />
                </div>
            </div>

            <div className="w-full lg:w-12/12 px-12">
                <div className="relative w-full mb-3">
                    <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="grid-password"
                    >
                        Description
              </label>
                    <textarea
                        type="text"
                        placeholder="Enter your new description"
                        onChange={(event) => {
                            setNewDescription(event.target.value);
                        }}
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    />
                </div>
            </div>


            <Button onClick={()=>updateForum(idd)} color="primary">
                Submit
          </Button>
         
        </Dialog>

    )
}
