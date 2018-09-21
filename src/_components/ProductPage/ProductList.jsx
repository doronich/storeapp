import React from "react";
import { Item } from "../ItemPages/Item/Item";

class ProductList extends React.Component {

    render() {
        const items = this.props.items.map((item, index) => {
            return <Item key={item.id} data={item} index={index} handleDeleteItem={this.handleDeleteItem} />
        });
        return (
            <div>
                <div className="item-container">
                    {items}
                </div>
                <div>

                </div>
            </div>

        )
    }
}

export { ProductList }