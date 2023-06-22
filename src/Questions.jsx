import { useState } from "react";
import React from 'react'
import axios from 'axios'

function Questions() {
    
    

    return (
    <>
        <form className="questionForm">
            <input 
            type="text" 
            placeholder="Enter your question here:">
            </input>
            <input 
                type='submit' 
                value="Submit">
            </input>
        </form>
        <form className="answerForm">
            <input 
            type="text" 
            placeholder="Enter your answer here:">
            </input>
            <input 
                type='submit' 
                value="Submit">
            </input>
        </form>
    </>
        // <form onSubmit={handleSubmit}>
        //     <input
        //     type="text"
        //     onChange={handleInputChange}
        //     placeholder="Enter your question here"/>
        //     <button type="Submit your question"> </button>
        // </form>
        
    )
}

export default Questions