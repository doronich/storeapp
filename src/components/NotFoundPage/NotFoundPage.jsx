import React from 'react'
import Loc from 'redux-react-i18n';

export class NotFoundPage extends React.Component {

    render() {
        document.title = "Page not found"
        return (
            <div>
                Page not found
            </div>
        )
    }
}