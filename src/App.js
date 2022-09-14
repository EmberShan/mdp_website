import { buildQueries, getByPlaceholderText } from "@testing-library/react";
import Body from "./components/Body/Body";
import { RecoilRoot } from 'recoil';

const App = () =>{
  return (
    <RecoilRoot>
      <div className="container">
        <Body />
      </div>
    </RecoilRoot>
  )
}

export default App;
