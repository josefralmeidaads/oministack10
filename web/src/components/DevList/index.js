import React from 'react';
import DevItem from '../DevItem'

const DevList = (props) => {
    const { devs, onDelete, onClickUpdate } = props;
    return <ul>
        {devs.map(dev => (
            <DevItem onDelete={onDelete} onUpdate={onClickUpdate} key={dev._id} dev={dev} />
        ))}
    </ul>
};

export default DevList;
