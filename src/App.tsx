import { useState, useEffect } from 'react';
import * as C from './App.styles';
import { Item } from './types/Item';
import { ListItem } from './components/ListItem';
import { AddArea } from './components/AddArea';

const App = () => {
  
  const [list, setList] = useState<Item[]>([]);

  const saveLocalStorage = (list: any) => {
    localStorage.setItem('list', JSON.stringify(list));
  };

  const handleAddTask = (taskName: string) => {
    let newList = [...list];
    newList.push({
      id: list.length + 1,
      name: taskName,
      done: false,
    });
    saveLocalStorage(newList);
    setList(newList);
  };

  const handleItemStatus = (itemChanged: Item) => {
    list.forEach(item => {
      if(item.id === itemChanged.id) {
          itemChanged.done = !item.done;
          return;
      }
  });
    setList([...list]);
    saveLocalStorage([...list]);
  };

  const handleRemoveItem = (itemRemoved: Item) => {
    let newList = [...list];
    newList.forEach((item, index) => {
      if(item.id === itemRemoved.id) {
        newList.splice(index,1);
      }
    });
    setList(newList);
    saveLocalStorage(newList);
  };

  useEffect(() => {
    let list = JSON.parse(localStorage.getItem('list') || '[]');
    if(list === null) {
      list = [];
    }
    setList(list);
  }, []);

  return (
    <C.Container>
      <C.Area>
        <C.Header>Todo List</C.Header>
        {/* Nova Tarefa */}
        <AddArea onEnter={handleAddTask} ></AddArea>


        {/* Lista de Tarefas */}

        {
          list.map((item, index)=> (
            <ListItem key={index} item={item} onStatusChanged={handleItemStatus} onRemoveItem={handleRemoveItem}/>
          ))
        }
      </C.Area>
    </C.Container>
  );
}

export default App;