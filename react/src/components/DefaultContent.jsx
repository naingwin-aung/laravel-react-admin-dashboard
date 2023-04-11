import React from "react";

function DefaultContent(props) {
    return (
        <tr>
            <td colSpan="5" className="text-center">
                {props.children}
            </td>
        </tr>
    );
}

export default DefaultContent;
