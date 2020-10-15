import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import axios from "axios";
import Masonry from "react-masonry-component";
const apiUrl = `http://localhost:8080`;


class SearchPage extends Component {
  constructor() {
    super();
    this.state = {
      query: "",
      result: [],
      page: 1,
      totalPages: 1
    };
  }
  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  onSearch = e => {
    e.preventDefault();
    axios
      .get(apiUrl + "/api/images/search", {
        params: {
          query: this.state.query
        }
      })
      .then(res => {
        this.setState({
          result: res.data.results,
          totalPages: res.data.total_pages
        });
      })
      .catch(err => console.log(err));
  };

  onNextPage = e => {
    e.preventDefault();
    axios
      .get(apiUrl + "/api/images/search", {
        params: {
          query: this.state.query,
          page: this.state.page + 1
        }
      })
      .then(res => {
        this.setState({ result: res.data.results, page: this.state.page + 1 })
      })
      .catch(err => console.log(err));
  };

  onPreviousPage = e => {
    e.preventDefault();
    axios
      .get(apiUrl + "/api/images/search", {
        params: {
          query: this.state.query,
          page: this.state.page - 1
        }
      })
      .then(res => {
        this.setState({ result: res.data.results, page: this.state.page - 1 });
      })
      .catch(err => console.log(err));
  };

  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };
  render() {
    const { user } = this.props.auth;
    const masonryOptions = {
      fitWidth: true,
      columnWidth: 300,
      gutter: 5
    };
    return (
      <div className="container">
        <div style={{ height: "75vh" }} className="container valign-wrapper">
          <div className="row">
            <div className="col s12 center-align">
              {this.state.result.length === 0 && (
                <h4>
                  <b>Hey there,</b> {user.name.split(" ")[0]}
                </h4>
              )}
              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.query}
                  id="query"
                  type="text"
                />
                <label htmlFor="query">Query</label>
                <span className="red-text"></span>
              </div>
              <div
                className="input-field col s12"
                style={{
                  display: "flex",
                  justifyContent: "space-evenly"
                }}
              >
                <button
                  style={{
                    width: "150px",
                    borderRadius: "3px",
                    letterSpacing: "1.5px",
                    marginTop: "1rem"
                  }}
                  onClick={this.onSearch}
                  className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                >
                  Search
                </button>
                <button
                  style={{
                    width: "150px",
                    borderRadius: "3px",
                    letterSpacing: "1.5px",
                    marginTop: "1rem"
                  }}
                  onClick={this.onLogoutClick}
                  className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>

        {this.state.result.length > 0 && (
          <div
            className="page-links"
            style={{
              display: "flex",
              justifyContent: "space-between",
              paddingRight: "80px"
            }}
          >
            {this.state.page > 1 && (
              <a
                className="btn-flat waves-effect"
                onClick={this.onPreviousPage}
              >
                <i className="material-icons left">arrow_back</i> Previous
              </a>
            )}
            {this.state.page !== this.state.totalPages && (
              <a className="btn-flat waves-effect" onClick={this.onNextPage}>
                <i className="material-icons right">arrow_forward</i> Next
              </a>
            )}
          </div>
        )}
        <Masonry
          className={"grid"}
          elementType={"div"}
          options={masonryOptions}
          disableImagesLoaded={false}
          updateOnEachImageLoad={false}
        >
          {this.state.result.map(img => {
            return (
              <div key={img.id}>
                <a
                  href={img.links.html}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src={img.urls.thumb}
                    style={{ width: 300 }}
                    alt={img.alt_description}
                  />
                </a>
              </div>
            );
          })}
        </Masonry>
      </div>
    );
  }
}
SearchPage.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(
  mapStateToProps,
  { logoutUser }
)(SearchPage);
