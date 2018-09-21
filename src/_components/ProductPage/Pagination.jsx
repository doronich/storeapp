import React from 'react'
import { KeyboardArrowLeft, KeyboardArrowRight } from '@material-ui/icons'
import { Grid } from '@material-ui/core'
import Button from '@material-ui/core/Button';

class Pagination extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            currentPage: 1,
            totalPages: this.props.totalPages,
            pageSize: this.props.pageSize || 12,
            prev: this.props.hasPrev,
            next: this.props.hasNext,
            pageRange: 1
        }
        console.log(this.props)
    }


    rangeStart = () => {
        const start = this.state.currentPage - this.state.pageRange
        if (start > 0) {
            return start
        } else {
            return 1;
        }
    }

    changePage = (n) => (event) => {
        if (n !== this.state.currentPage) {
            this.setState({ currentPage: n });
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
                (<Grid item key={i}>
                    <Button
                        variant="raised"
                        style={{ minWidth: "30px" }}
                        size="small"
                        color={this.state.currentPage === i ? "secondary" : "primary"}
                        onClick={this.changePage(i)}
                    >
                        {i}
                    </Button>
                </Grid>)
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

    render() {

        const pages = this.pages();

        const paging = (
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
            <div>
                {paging}
            </div>
        )
    }
}

export { Pagination }