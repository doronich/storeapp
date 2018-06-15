import React from 'react'
import { itemService } from '../../../services'
import { connect } from 'react-redux';
import { userConstants } from '../../../constants';
import Button from '@material-ui/core/Button';
import { Item } from './Item'
import {KeyboardArrowLeft,KeyboardArrowRight} from '@material-ui/icons'
import { Grid } from '@material-ui/core'
import ReactPaginate from 'react-paginate'

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
            prev: null,
            next: null
        }
    }


    static getDerivedStateFromProps(props, state) {
        return {
            changed: props.changed
        }
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
            reqString += "&pageSize=" + 2;

            console.log("string", reqString);

            itemService.getReqItems(reqString)
                .catch(err => {
                    console.log("reqItemList:", err)
                })
                .then(response => {
                    console.log(response)
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

        const pages = [];
        for (let i = 1; i <= this.state.totalPages; i++) {
            pages.push(
                (<Grid item key={i}><Button variant="raised" size="small" color="primary" onClick={this.changePage(i)}>
                    {i}
                </Button></Grid>)
            );
        }

        return (
            <Grid container direction="column" justify="space-between" alignItems="center" style={{ height: "100%" }}>
                <Grid item>
                    <Grid container justify="center">
                        {listItems}
                    </Grid>
                </Grid>
                <Grid item>
                    <Grid container justify="center">
                        <Grid item>
                            <Button variant="raised" size="small" disabled={!this.state.prev} onClick={this.changePage(this.state.currentPage-1)}  color="primary">
                                <KeyboardArrowLeft/>
                            </Button>
                        </Grid>
                        {pages}
                        <Grid item>
                            <Button variant="raised" size="small" disabled={!this.state.next} onClick={this.changePage(this.state.currentPage+1)} color="primary">
                            <KeyboardArrowRight  />
                        </Button>
                        </Grid>
                    </Grid>
                </Grid>


            </Grid>
        )
    }
}

const connectedItemList = connect(mapStateToProps, mapDispatchToProps)(ItemList);
export { connectedItemList as ItemList };