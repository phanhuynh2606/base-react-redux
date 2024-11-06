// class component
//functional component
import React, { useState } from "react";
import AddUser from "./AddUser";
import DisplayInfor from "./DisplayInfor";

// class MyComponent extends React.Component {
//   state = {
//     listUsers: [
      // {
      //   id: 1,
      //   name: "Huynh Phan",
      //   age: 21,
      // },
      // {
      //   id: 2,
      //   name: "Hoi Dan IT",
      //   age: 22,
      // },
      // {
      //   id: 3,
      //   name: "HarryPham Dev",
      //   age: 23,
      // },
//     ],
//   };
//   handleAddUser = (user) => {
//     this.setState({ listUsers: [user, ...this.state.listUsers] });
//   };
//   handleDeleteUser = (id) => {
//     const newListUser = this.state.listUsers.filter((user) => user.id !== id);
//     this.setState({ listUsers: newListUser });
//   }

//   handleLimitUser = (users) =>{
//     this.setState({listUsers: users});
//   }

//   //JSX
//   render() {
//     return (
//       <>
//         {"Hello World"}
//         <AddUser handleAddUser={this.handleAddUser} />
//         <br /> <br />
//         <DisplayInfor users={this.state.listUsers} handleDeleteUser={this.handleDeleteUser} handleLimitUser={this.handleLimitUser}/>
//       </>
//     );
//   }
// }

const MyComponent = () => {
  const [listUsers, setListUsers] = useState([ 
    { id: 1, name: "Huynh Phan", age: 21,},
    { id: 2, name: "Hoi Dan IT", age: 22,},
    { id: 3, name: "HarryPham Dev",age: 23,}]);
    const handleAddUser = (user) => {
      setListUsers([user, ...listUsers]);
    }
    const handleDeleteUser = (id) => {
      const newListUser = listUsers.filter((user) => user.id !== id);
      setListUsers(newListUser);
    }
  return (
    <>
      {"Hello World"}
      <AddUser handleAddUser={handleAddUser}/>
      <br /> <br />
      <DisplayInfor users={listUsers} handleDeleteUser={handleDeleteUser}/>
    </>
  );
}
export default MyComponent;
