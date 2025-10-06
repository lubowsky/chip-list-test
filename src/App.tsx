import './App.css'
import { ChipList } from './components/ChipList/ChipList'

const items = ["React", "TypeScript", "JavaScript", "Node.js", "GraphQL", "CSS", "HTML"]

const App = () => {
  return (
    <div className='main-container'>
      <ChipList
        items={items}
        defaultSelected={["React"]}
        onChange={(selected) => {
          console.log("Выбраны:", selected)
        }}
      />
    </div>
  )
}

export default App
