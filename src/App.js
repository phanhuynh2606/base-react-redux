import "./App.scss";
import Header from "./components/Header/Header";

// class App extends React.Component {
//   render() {
//     return (
//       <>
//         <div>
//           <MyComponent />
//         </div>
//       </>
//     );
//   }
// }

const App = () => {
  return (
    <>
      <div className="app-container">
        <Header/>
      </div>
    </>
  );
};
export default App;
