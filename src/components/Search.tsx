import { ChangeEvent } from "react";

type searchPropsType = {
    value:string;
    handleClick: ()=>void;
    handleChange: (e:ChangeEvent<HTMLInputElement>)=>void;
}

export default function Search({value,handleClick,handleChange}:searchPropsType) {
    return (
        <section>
            <input type="text"
            value={value}
            placeholder="Escribe el nombre de la radio"
            onChange={handleChange} />
            <button onClick={handleClick}>Buscar</button>
        </section>
    )
}
