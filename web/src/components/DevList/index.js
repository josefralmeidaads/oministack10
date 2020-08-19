import React from 'react';
import DevItem from '../DevItem'

const DevList = (props) => {
    const { devs, onDelete, onUpdate } = props;
    return <ul>
        {devs.map(dev => (
            <DevItem onUpdate={onUpdate} onDelete={onDelete} key={dev.github_username} dev={dev} />
        ))}
    </ul>
};

export default DevList;
