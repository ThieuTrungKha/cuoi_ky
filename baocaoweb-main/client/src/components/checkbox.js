import React from 'react';

const CheckBox = ({ title, value, onValueChange }) => {
    return (
        <div>
            <label>
                <input
                    type="checkbox"
                    checked={value}
                    onChange={onValueChange}
                />
                {title}
            </label>
        </div>
    );
};

export default CheckBox;