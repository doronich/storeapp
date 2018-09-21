import React from 'react'
import { Link } from 'react-router-dom';
import { Clear } from '@material-ui/icons'
import './item.css'

class Item extends React.Component {

    render() {
        return (

            <div className="favitem-container">
                <div className="favitem-delete">
                    <Clear color="secondary" onClick={this.props.onclick} />
                </div>
                <div className="favitem-item favitem-pic">
                    <Link to={this.props.link ? this.props.link : ""}>
                        <img
                            src={this.props.pic}
                            alt={this.props.name}
                        />
                    </Link>
                </div>
                <div className="favitem-item">
                    <Link to={this.props.link ? this.props.link : ""}>
                        <h5>{this.props.name}</h5>
                    </Link>
                </div>
            </div >

        )
    }
}

export { Item as FavItem }