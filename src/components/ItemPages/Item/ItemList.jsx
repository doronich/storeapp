import React from 'react'
import { itemService } from '../../../services'
import { connect } from 'react-redux';
import { userConstants } from '../../../constants';
import Button from '@material-ui/core/Button';
//import Typography from '@material-ui/core/Typography';

import { Item } from './Item'
import { KeyboardArrowLeft, KeyboardArrowRight } from '@material-ui/icons'
import { Grid } from '@material-ui/core'

const mapDispatchToProps = dispatch => ({
    logOut: () => dispatch({ type: userConstants.LOGOUT }),
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
            pageRange: 2
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
                (<Grid item key={i}><Button variant="raised" style={{minWidth:"30px"}} size="small" color={this.state.currentPage === i ? "secondary" : "primary"} onClick={this.changePage(i)}>
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
                    console.log(response)
                    if (response) this.setState({ list: response.data, changed: true })
                })
        } else {

            let reqString = "";
            let sex = ""
            if (this.props.sex === "F") sex = "female";
            else sex = "male";
            reqString = `sex=${sex}`;
            if (this.props.kind !== "none") {

                reqString += "&kind=" + this.props.kind;
            }
            if (this.props.subkind !== "none") {

                reqString += "&subkind=" + this.props.subkind;
            }
            if (this.props.brand !== "none") {
                reqString += "&brand=" + this.props.brand
            }
            if (this.props.color !== "none") {
                reqString += "&color=" + this.props.color
            }
            if (this.props.name) {
                reqString += "&name=" + this.props.name;
            }

            reqString += "&startPrice=" + this.props.priceStart;
            reqString += "&endPrice=" + this.props.priceEnd;

            const page = this.state.currentPage;
            reqString += "&pageIndex=" + page;
            reqString += "&pageSize=" + this.state.pageSize;

            console.log("string", reqString);

            itemService.getReqItems(reqString)
                .catch(err => {
                    console.log("reqItemList:", err)
                })
                .then(response => {
                    //console.log(response)
                    if (response) {
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
                if (err.message.indexOf("401") >= 0) {
                    this.props.logOut();
                }
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
                <Grid container justify="space-between" alignItems="center">
                    <Grid item>
                        <Button variant="raised" style={{minWidth:"40px"}} size="small" disabled={!this.state.prev} onClick={this.prevPage} color="primary">
                            <KeyboardArrowLeft />
                        </Button>
                    </Grid>
                    <Grid item>
                        <Grid container >
                            {this.hasFirst() &&
                                <Grid item><Button variant="raised" style={{minWidth:"30px"}} size="small" color={this.state.currentPage === 1 ? "secondary" : "primary"} onClick={this.changePage(1)}>
                                    1
                </Button></Grid>}
{/*                             {this.hasFirst() &&
                                <Grid item style={{ margin: "0 15px" }}><Typography variant="headline">...</Typography></Grid>} */}
                            {pages}
{/*                             {this.hasLast() &&
                                <Grid item style={{ margin: "0 15px" }}><Typography variant="headline">...</Typography></Grid>} */}
                            {this.hasLast() &&
                                <Grid item><Button variant="raised" style={{minWidth:"30px"}} size="small" color={this.state.currentPage === this.state.totalPages ? "secondary" : "primary"} onClick={this.changePage(this.state.totalPages)}>
                                    {this.state.totalPages ? this.state.totalPages : "..."}
                                </Button></Grid>}
                        </Grid>
                    </Grid>
                    <Grid item>
                        <Button variant="raised" style={{minWidth:"40px"}} size="small" disabled={!this.state.next} onClick={this.nextPage} color="primary">
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