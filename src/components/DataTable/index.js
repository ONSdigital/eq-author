import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { map } from "lodash";

import { colors } from "constants/theme";

class DataTable extends React.Component {
  render() {
    const { header, content, addRowButton, deleteRowButton } = this.props;

    return (
      <table>
        <thead>
          <tr>
            {header}
            <td />
          </tr>
        </thead>
        <tbody>
          {map(content, (value, index) => {
            return (
              <tr key={index}>
                {value}
                <td>{deleteRowButton}</td>
              </tr>
            );
          })}
        </tbody>
        <tfoot>
          <tr>
            <td>{addRowButton}</td>
          </tr>
        </tfoot>
      </table>
    );
  }
}

DataTable.propTypes = {
  header: PropTypes.node.isRequired,
  content: PropTypes.arrayOf(PropTypes.node).isRequired,
  addRowButton: PropTypes.node.isRequired,
  deleteRowButton: PropTypes.node.isRequired
};

export default DataTable;
