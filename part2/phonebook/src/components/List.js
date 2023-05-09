const List = ({persons, newSearch, handleDelete}) => {
    return(persons.filter(person=>person.name
        .toLowerCase()
        .includes(newSearch.toLowerCase()))
        .map((person) => 
        <li key={person.id}>{person.name} {person.number} <button onClick={() => handleDelete(person.id, person.name)}>delete</button></li>))
  }
export default List;
