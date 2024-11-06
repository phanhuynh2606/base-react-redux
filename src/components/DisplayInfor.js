import React, { useEffect, useState } from "react";
import "./DisplayInfor.scss";
// class DisplayInfor extends React.Component {

//   // constructor(props){
//   //   super(props);
//   //   console.log("==> constructor : 1");
//   //   this.state = {
//   //     isShow: true,
//   //     limit: false
//   //   };
//   // }

//   // handleShowHide = () => {
//   //   this.setState({
//   //     isShow: !this.state.isShow,
//   //   });
//   // };
//   handleDelete = () => {
//     this.props.handleDeleteUser();
//   }
//   // componentDidMount(){
//   //   console.log("==> componentDidMount");
//   //   setTimeout(() => {
//   //     document.title = "Huynh Phan"
//   //   }, 2000);
//   // }

//   // componentDidUpdate(prevProps, prevState, snapshot){
//   //   console.log("==> componentDidUpdate");
//   //   if(this.props.users.length !== prevProps.users.length){
//   //     if(this.props.users.length === 6){
//   //       alert("You have reached the limit of 5 users");
//   //       this.props.handleLimitUser(prevProps.users)
//   //     }
//   //   }
//   // }
//   render() {
//     console.log("==> render");
//     const { users } = this.props;
//     return (
//       <div className="user-container">
//         {/* <div>
//           <span
//             onClick={() => {
//               this.handleShowHide();
//             }}
//           >
//             {" "}
//             Hide List Users{" "}
//           </span>
//         </div> */}
//         {true && (
//           <div>
//             {users.map((user) => {
//               return (
//                 <div key={user.id} className={user.age >= 22 ? "green" : "red"}>
//                   <p>Name: {user.name}</p>
//                   <p>Age: {user.age}</p>
//                   <button onClick={() => this.props.handleDeleteUser(user.id)}>Delete</button>
//                   <hr />
//                 </div>
//               );
//             })}
//           </div>
//         )}
//       </div>
//     );
//   }
// }

const DisplayInfor = (props) => {
  const { users } = props;
  const [isShow, setIsShow] = useState(true);
  const handleShowHide = () => {
    setIsShow(!isShow);
  }

  useEffect(() => {
    if(users.length === 6){
      alert("You have reached the limit of 5 users");
    }
    console.log("call me useEffect");
  },[users,isShow]);

  return (
    <div className="user-container">
      <div>
        <span onClick={() => handleShowHide()}>
          {isShow ? "Hide List Users" : "Show List Users"}</span>
        </div> 
      <div>
        {isShow &&
        <>
        {users.map((user) => {
        return (
          <div key={user.id} className={user.age >= 22 ? "green" : "red"}>
            <p>Name: {user.name}</p>
            <p>Age: {user.age}</p>
            <button onClick={() => props.handleDeleteUser(user.id)}>Delete</button>
            <hr />
          </div>
        );
      })}
        </>}
      </div>
    </div>
  );
}

export default DisplayInfor;
