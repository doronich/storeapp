import React from 'react'
import { itemService } from '../../../services'
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
//import Typography from '@material-ui/core/Typography';

import { Item } from './Item'
import { KeyboardArrowLeft, KeyboardArrowRight } from '@material-ui/icons'
import { Grid } from '@material-ui/core'

const mapDispatchToProps = dispatch => ({

})

function mapStateToProps(state) {
    const { sex, kind, subkind, brand, color, priceEnd, priceStart, name } = state.item;
    return {
        sex, kind, subkind, brand, color, priceEnd, priceStart, name
    };
}


class ItemList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            list: null,
            changed: this.props.changed,
            currentPage: this.props.match.params.page || 1,
            totalPages: null,
            pageSize: 12,
            prev: null,
            next: null,
            pageRange: 1
        }
    }


    static getDerivedStateFromProps(props, state) {
        return {
            changed: props.changed
        }
    }

    rangeStart = () => {
        const start = this.state.currentPage - this.state.pageRange
        if (start > 0) {
            return start
        } else {
            return 1;
        }
    }

    rangeEnd = () => {
        const end = this.state.currentPage + this.state.pageRange;
        return (end < this.state.totalPages) ? end : this.state.totalPages;
    }

    hasFirst = () => {
        return this.rangeStart() !== 1;
    }
    hasLast = () => {
        return this.rangeEnd() !== this.state.totalPages;
    }

    pages = () => {
        const pages = [];

        for (let i = this.rangeStart(); i <= this.rangeEnd(); i++) {
            pages.push(
                (<Grid item key={i}><Button variant="raised" style={{ minWidth: "30px" }} size="small" color={this.state.currentPage === i ? "secondary" : "primary"} onClick={this.changePage(i)}>
                    {i}
                </Button></Grid>)
            );
        }

        return pages;
    }

    nextPage = () => {
        if (this.state.currentPage >= this.state.totalPages) return;
        this.setState({ currentPage: this.state.currentPage + 1, changed: false })
    }

    prevPage = () => {
        if (this.state.currentPage <= 1) return;
        this.setState({ currentPage: this.state.currentPage - 1, changed: false })
    }

    componentDidUpdate() {
        this.listHandler()
    }

    componentDidMount() {
        this.listHandler()
    }

    listHandler = () => {
        if (this.state.changed === true) return;
        if (this.props.all) {
            itemService.getAllItems()
                .catch(err => {
                    console.log("ItemList error:", err);
                })
                .then(response => {
                    //console.log(response)
                    if (response) this.setState({ list: response.data, changed: true })
                })
        } else {

            const params = {
                pageIndex: this.state.currentPage,
                pageSize: this.state.pageSize,
                sex: this.props.sex === "F" ? "female" : "male",
                kind: this.props.kind === "none" ? null : this.props.kind,
                subkind: this.props.subkind === "none" ? null : this.props.subkind,
                brand: this.props.brand === "none" ? null : this.props.brand,
                color: this.props.color === "none" ? null : this.props.color,
                name: this.props.name,
                startPrice: this.props.priceStart,
                endPrice: this.props.priceEnd
            }

            itemService.getReqItems(params)
                .catch(err => {
                    console.log("reqItemList:", err)
                })
                .then(response => {
                    //console.log(response.data)
                    if (response.data) {
                        if (response.data.total < response.data.index) {
                            this.setState({ currentPage: 1 })
                        }
                        this.setState({ list: response.data.res, changed: true, prev: response.data.hasPrev, next: response.data.hasNext, totalPages: response.data.total })
                    }
                })
        }
    }


    handleDeleteItem = (id, index) => {
        itemService.deleteItem(id)
            .catch(err => {

            })
            .then(response => {
                if (response) {
                    const list = Object.assign([], this.state.list)
                    list.splice(index, 1);
                    this.setState({ list: list });
                }
            })
    }

    changePage = (n) => (event) => {
        if (n !== this.state.currentPage) {
            this.setState({ currentPage: n, changed: false });
        }
    }


    render() {
        const { list } = this.state;
        let listItems = null;
        if (list) {
            listItems = this.state.list.map((item, index) => {
                return <Item key={item.id} data={item} index={index} handleDeleteItem={this.handleDeleteItem} />
            });
        }



        const pages = this.pages();

        const Pagination = (
            <Grid item style={{ margin: "20px 0", width: "100%" }}>
                <Grid container justify="center" alignItems="center">
                    <Grid item>
                        <Button variant="raised" style={{ minWidth: "40px", padding: "0" }} size="small" disabled={!this.state.prev} onClick={this.prevPage} color="primary">
                            <KeyboardArrowLeft />
                        </Button>
                    </Grid>
                    <Grid item>
                        <Grid container >
                            {this.hasFirst() &&
                                <Grid item>
                                    <Button variant="raised" style={{ minWidth: "30px" }} size="small" color={this.state.currentPage === 1 ? "secondary" : "primary"} onClick={this.changePage(1)}>
                                        1
                                    </Button>
                                </Grid>}
                            {/*                             {this.hasFirst() &&
                                <Grid item style={{ margin: "0 15px" }}><Typography variant="headline">...</Typography></Grid>} */}
                            {pages}
                            {/*                             {this.hasLast() &&
                                <Grid item style={{ margin: "0 15px" }}><Typography variant="headline">...</Typography></Grid>} */}
                            {this.hasLast() &&
                                <Grid item><Button variant="raised" style={{ minWidth: "30px" }} size="small" color={this.state.currentPage === this.state.totalPages ? "secondary" : "primary"} onClick={this.changePage(this.state.totalPages)}>
                                    {this.state.totalPages ? this.state.totalPages : "..."}
                                </Button></Grid>}
                        </Grid>
                    </Grid>
                    <Grid item>
                        <Button variant="raised" style={{ minWidth: "40px", padding: "0" }} size="small" disabled={!this.state.next} onClick={this.nextPage} color="primary">
                            <KeyboardArrowRight />
                        </Button>
                    </Grid>
                </Grid>
            </Grid>);

        return (
            <Grid container direction="column" justify="space-between" alignItems="center" style={{ height: "100%" }}>
                {/* Pagination */}
                <Grid item>
                    <Grid container justify="center">
                        {listItems}
                    </Grid>
                </Grid>
                {Pagination}
            </Grid>
        )
    }
}

const connectedItemList = connect(mapStateToProps, mapDispatchToProps)(ItemList);
export { connectedItemList as ItemList };