import React, { Component } from "react";
import { FileUpload } from "primereact/fileupload";
import { signup, multipart } from '../../services/api';
import "primereact/resources/themes/nova-light/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import s from "./userForms.module.scss";

class UserForm extends Component {
  constructor() {
    super();
    this.state = {
      data: {
        userName: "",
        email: "",
        password: "",
        phone: "",
        age: "",
        file: "",
      }
    };
  }

onInput(e) {
  this.setState({
    data: {
      ...this.state.data,
      [e.target.name]: e.target.value
    }
  });
}

onSubmit(e) {
  e.preventDefault();
  const { data } = this.state;
  console.log('data', data);
  const formData  = new FormData();
  for(const key in data ) {
    formData.append(key, data[key]);
  }
  
  multipart(formData).then((data) => console.log(data));
}

onChangeFile(e) {
  console.log(e.target.files[0]);
  this.setState({
    data: {
      ...this.state.data,
      file: e.target.files[0],
    }
  })
}

  render() {
    return (
      <div className={s.userForm_wrapper}>
        <form action="" onSubmit={(e) => this.onSubmit(e)}>
          <input onChange={(e) => this.onChangeFile(e)} type="file" name="file" />
          <input
            type="email"
            name="email"
            placeholder="E-mail"
            onChange={e => this.onInput(e)}
            defaultValue={this.state.email}
            required
          />
          <input
            type="text"
            name="userName"
            placeholder="Name and Surname"
            onChange={e => this.onInput(e)}
            defaultValue={this.state.name}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={e => this.onInput(e)}
            defaultValue={this.state.password}
            required
          />
          <input
            type="text"
            name="age"
            placeholder="Age"
            onChange={e => this.onInput(e)}
            defaultValue={this.state.age}
          />
          <input
            type="tel"
            name="phone"
            placeholder="Phone"
            onChange={e => this.onInput(e)}
            defaultValue={this.state.phone}
          />
          <button type="submit">submit</button>
        </form>
      </div>
    );
  }
}

export default UserForm;
