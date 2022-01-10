import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import { useState } from "react";

export default function App() {
    const [pokeNumber, setPokeNumber] = useState(1)
    const [pokemon, setPokemon] = useState(null)

    function Button({value}) {
        return <button onClick={()=>{handleClick()}}>{value}</button>
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
        let response_data = response.json()
        setPokemon(response_data["name"])
    }

    useEffect(() => {
        makeAPICall()
        document.title = `It is Number ${pokeNumber} - ${pokemon}`
    })

    return (
        <div>
            <h3>What is in the tall grass?</h3>
            <Button value="What is it???"></Button>
        </div>
    )
}

ReactDOM.render(
    <App />,
    document.getElementById("root")
);