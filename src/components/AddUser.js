import React, { useState } from "react";

// class AddUser extends React.Component {
//   state = {
//     name: "",
//     age: "",
//   };

//   handleOnChange = (event) => {
//     const { name, value } = event.target;
//     this.setState({
//       [name]: value,
//     });
//   };
//   handleOnSubmit = (event) => {
//     event.preventDefault();
//     this.props.handleAddUser({
//       id: Math.floor(Math.random() * 1000) + '-random',
//       name: this.state.name,
//       age: this.state.age,
//     });
//   };
//   render() {
//     return (
//       <div>
//         <form onSubmit={(event) => this.handleOnSubmit(event)}>
//           <label>Your Name:</label>
//           <input
//             type="text"
//             name="name"
//             value={this.state.name}
//             onChange={(event) => this.handleOnChange(event)}
//           />
//         <label>Your Age:</label>
//           <input
//             type="text"
//             name="age"
//             value={this.state.age}
//             onChange={(event) => this.handleOnChange(event)}
//           />
//           <button>Submit</button>
//         </form>
//       </div>
//     );
//   }
// }

const AddUser = (props) => {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const handleOnChange = (event) => {
    const { name, value } = event.target;
    if(name === "name"){
      setName(value);
    } else {
      setAge(value);
    }
  };
  const handleOnSubmit = (event) => {
    event.preventDefault();
    props.handleAddUser({
      id: Math.floor(Math.random() * 1000) + '-random',
      name: name,
      age: age,
    });
  };
  return (
    <div>
      <form onSubmit={(event) => handleOnSubmit(event)}>
        <label>Your Name:</label>
        <input
          type="text"
          name="name"
          value={name}
          onChange={(event) => handleOnChange(event)}
        />
        <label>Your Age:</label>
        <input
          type="text"
          name="age"
          value={age}
          onChange={(event) => handleOnChange(event)}
        />
        <button>Submit</button>
      </form>
    </div>
  );
  
}
export default AddUser;
