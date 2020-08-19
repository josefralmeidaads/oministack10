import React from 'react';
import DevItem from '../DevItem'

const DevList = (props) => {
    const { devs, onDelete } = props;
    return <ul>
        {devs.map(dev => (
            <DevItem onDelete={onDelete} key={dev.github_username} dev={dev} />
        ))}
    </ul>
};

export default DevList;