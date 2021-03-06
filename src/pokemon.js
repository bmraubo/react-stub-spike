import React, { useEffect } from "react";

import { useState } from "react";

export default function App() {
    const [pokeNumber, setPokeNumber] = useState(null)
    const [pokemon, setPokemon] = useState(null)

    function Button({value}) {
        return <button onClick={()=>{handleClick()}}>{value}</button>
    }

    function DisplayResult() {
        if (pokemon == null) {
            let resultString = `Its unknown!`
            return (
                <h3 data-testid="Display">{resultString}</h3>
            )
        } else {
            let resultString = `Its ${pokemon}`
            return (
                <h3 data-testid="Display">{resultString}</h3>
            )
        }
        
    }

    function handleClick() {
        setPokeNumber(generateRandomNumber())
    }

    function generateRandomNumber() {
        return Math.floor(Math.random() * 151) + 1;
    }

    async function makeAPICall() {
        let url = `https://pokeapi.co/api/v2/pokemon/${pokeNumber}`;
        let response = await fetch(url);
        let response_data = await response.json()
        setPokemon(response_data["name"]);
    }

    useEffect(() => {
        if (pokeNumber != null) {
            makeAPICall()
        }
        document.title = `It is Number ${pokeNumber} - ${pokemon}!!!`
    })

    return (
        <div>
            <h3>What is in the tall grass?</h3>
            <Button value="What is it???"></Button>
            <DisplayResult></DisplayResult>
        </div>
    )
}