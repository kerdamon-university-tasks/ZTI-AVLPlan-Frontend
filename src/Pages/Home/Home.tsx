import AvlSpreadSheet from "Components/AVLSpreadSheet";

const Home = () => {
  return (
    <div style={{margin: 10}}>
        <AvlSpreadSheet numberOfDays={5} numberOfHours={10} />
    </div>
    )
  }
  
  export default Home;