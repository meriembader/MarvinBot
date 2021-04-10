import React, { Component } from "react";
import { connect } from "react-redux";
import { createUser } from "../../actions/users";

class AddUser extends Component {
  constructor(props) {
    super(props);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeSurname = this.onChangeSurname.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onChangeRole= this.onChangeRole.bind(this);
    this.saveUser = this.saveUser.bind(this);
    this.newUser = this.newUser.bind(this);

    this.state = {
      id: null,
      name: "",
      surname: "",
      email: "",
      password: "",
      role: "",
      
    };
  }

  onChangeName(e) {
    this.setState({
      name: e.target.value,
    });
  }

  onChangeSurname(e) {
    this.setState({
      surname: e.target.value,
    });
  }
  onChangeEmail(e) {
    this.setState({
      email: e.target.value,
    });
  }
  onChangePassword(e) {
    this.setState({
      password: e.target.value,
    });
  }
  onChangeRole(e) {
    this.setState({
      role: e.target.value,
    });
  }
  saveUser() {
    const { name, surname, email, password, role } = this.state;

    this.props
      .createUser(name, surname, email, password, role )
      .then((data) => {
        this.setState({
          id: data.id,
          name: data.name,
          surname: data.surname,
          email: data.email,
          password: data.password,
          role: data.role,

         
        });
        console.log(data);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  newUser() {
    this.setState({
      id: null,
      name: "",
      surname: "",
      email: "",
      password: "",
      role: "",
    });
  }

  render() {
    return (


     <div className="submit-form">
        {this.state.submitted ? (
          <div>
            <h4>You submitted successfully!</h4>
            <button className="btn btn-success" onClick={this.newUSer}>
              Add
            </button>
          </div>
        ) :( 
          <div>
            <div className="form-group">
              <label htmlFor="name">name</label>
              <input
                type="text"
                className="form-control"
                type="text"
                id="name"
                required
                value={this.state.name}
                onChange={this.onChangeName}
                name="name"
              />
            </div>

            <div className="form-group">
              <label htmlFor="surname">surname</label>
              <input
                type="text"
                className="form-control"
                id="surname"
                required
                value={this.state.surname}
                onChange={this.onChangeSurname}
                name="surname"
              />
              </div>
                <div className="form-group">
              <label htmlFor="email">email</label>
              <input
                type="email"
                className="form-control"
                id="email"
                required
                value={this.state.email}
                onChange={this.onChangeEmail}
                name="email"
              />

              </div>
                <div className="form-group">
              <label htmlFor="passwordf">passwordf</label>
              <input
                type="password"
                className="form-control"
                id="password"
                required
                value={this.state.password}
                onChange={this.onChangePassword}
                name="password"
              />
              </div>
                <div className="form-group">
              <label htmlFor="role">role</label>
              <input
                type="text"
                className="form-control"
                id="role"
                required
                value={this.state.role}
                onChange={this.onChangeRole}
                name="role"
              />
              

            </div>

            <button onClick={this.saveUSer} className="btn btn-success">
              Submit
            </button>
          </div>
        )}
     
      </div>
      );
  }
}

export default connect(null, { createUser })(AddUser);