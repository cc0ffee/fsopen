const Hello = (props) => {
  return(
  <div> 
    <p>Hello {props.name}</p>
  </div>)
}    


const App = () => {
  return(
  <div> 
    <p>Greetings</p>
    <Hello name="Kacper" />
  </div>)
}    

export default App;
