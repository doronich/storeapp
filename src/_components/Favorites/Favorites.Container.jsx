import React from "react";
import { Favorites } from "./Favorites";
import { connect } from 'react-redux'
import './style.css'
import { favsAction } from "../../actions";

class FavoritesContainer extends React.Component {

    componentDidMount() {
        if (this.props.changed)
            this.props.getFavs(this.props.currentUser.id);
    }

    render() {
        return (
            <Favorites
                currentUser={this.props.currentUser}
                items={this.props.items}
                deleteFav={this.props.deleteFav}
                loaded={this.props.loaded}
            />
        )
    }
}

const mapStateToProps = state => {
    const { currentUser } = state.authentication;
    const { items, loaded, changed } = state.fav
    return { currentUser, items, loaded, changed };
}

const mapDispatchToProps = dispatch => {
    return {
        getFavs: (id) => dispatch(favsAction.getFavs(id)),
        deleteFav: (userId, itemId) => dispatch(favsAction.deleteFav(userId, itemId))
    }
}

const connectedFavoritesContainer = connect(mapStateToProps, mapDispatchToProps)(FavoritesContainer);
export { connectedFavoritesContainer as FavoritesContainer }