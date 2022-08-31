import AvlSpreadSheet from "Components/AVLSpreadSheet";

const Home = () => {
  return (
    <div style={{margin: 40}}>
        <AvlSpreadSheet numberOfDays={10} numberOfHours={10} />
    </div>
    )
  }
  
  export default Home;