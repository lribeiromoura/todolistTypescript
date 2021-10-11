import { useState, ChangeEvent } from 'react';
import * as C from './styles';
import { Item } from '../../types/Item';

type Props = {
    item: Item
    onStatusChanged: (itemChecked:Item) => void,
    onRemoveItem: (itemRemove: Item) => void,
};

export const ListItem = ({item, onStatusChanged,onRemoveItem}: Props) => {

    const [isChecked, setIsChecked] = useState(item.done);

    const handleChecked = (item: Item, e: ChangeEvent) => {
        onStatusChanged(item);
        setIsChecked(item.done);
    };

    const handleRemove = (item: Item) => {
        onRemoveItem(item);
    };

    return (
        <C.Container done={isChecked}>
            <input type="checkbox" checked={isChecked} onChange={e=>handleChecked(item, e)} />
            <label>{item.name}</label>
            <div className="garbage" onClick={e=>handleRemove(item)}>🗑️</div>
        </C.Container>
    );
}