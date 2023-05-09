const PersonForm = ({addNewName, newName, newPhone, handleNameChange, handlePhoneChange}) => {
    return(
      <form onSubmit={addNewName}>
      <div>
        name: <input value={newName} onChange={handleNameChange}/>
      </div>
      <div>
        <div>number: <input value={newPhone} onChange={handlePhoneChange}/></div>
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
    )
  }
export default PersonForm;