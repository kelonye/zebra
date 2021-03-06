import React from 'react';
import { connect } from 'react-redux';
import * as mapDispatchToProps from 'actions';
import { myGroupsSelector } from 'selectors';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { Link } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const styles = theme => ({});

class Component extends React.Component {
  render() {
    const { classes, groups } = this.props;

    return (
      <div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div style={{ flexGrow: 1 }}>
            <Typography variant="h6" style={{ color: 'gray' }} component="h2">
              MY GROUPS
            </Typography>
          </div>
          <div>
            <Link to="/create-group" style={{ fontSize: 18 }}>
              <Button variant="contained" color="primary">
                Create New Group
              </Button>
            </Link>
          </div>
        </div>

        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Members</TableCell>
              <TableCell>Reputation</TableCell>
              <TableCell />
            </TableRow>
          </TableHead>
          <TableBody>
            {groups.map(row => (
              <TableRow key={row.prim_key}>
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell numeric>{row.members.length}</TableCell>
                <TableCell numeric>{row.reputation}</TableCell>
                <TableCell>
                  <Link to={`/group/${row.prim_key}`}>
                    <Button color="secondary">EDIT</Button>
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    groups: myGroupsSelector(state)
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Component));
