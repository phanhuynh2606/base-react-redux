import { useState } from "react";


const Test = () => {
    const [state, setState] = useState({
        name: 'Huynh Phan',
        address: 'Hung Yen',
        age: 21
    });
    return (
        <div>
            <h1>Test</h1>
            <h1>My name is {state.name}</h1>
            <h1>My address is {state.address}</h1>
            <button onClick={() => setState({name: 'Huynh'})}>Click me</button>
        </div>
    );
};
export default Test;