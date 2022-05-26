import React, { useState } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router";

const AddPost = ({ contacts, addContact }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const history = useHistory();

  const handleSubmit = e => {
    e.preventDefault();
    const checkContactEmailExists = contacts.filter(contact =>
      contact.email === email ? contact : null
    );
    const checkContactPhoneExists = contacts.filter(contact =>
      contact.phone === phone ? contact : null
    );

    if (!email || !name || !phone) {
      return alert("Please fill in all fields!!");
    }
    if (checkContactEmailExists.length > 0) {
      return alert("This email already exists!!");
    }
    if (checkContactPhoneExists.length > 0) {
      return alert("This phone number already exists!!");
    }

    const data = {
      id: contacts.length > 0 ? contacts[contacts.length - 1].id + 1 : 0,
      email,
      name,
      phone,
    };

    addContact(data);
    alert("Contact added successfully!!");
    history.push("/");
  };

  return (
    <div>
      <h2>Add Post</h2>
      <div>
        <div>
          <form onSubmit={handleSubmit}>
            <div>
              <input
                type="text"
                placeholder="Full name"
                value={name}
                onChange={e => setName(e.target.value)}
              />
            </div>
            <div>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
            </div>
            <div>
              <input
                type="number"
                placeholder="Phone"
                value={phone}
                onChange={e => setPhone(e.target.value)}
              />
            </div>
            <div>
              <input type="submit" value="Add Student" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  contacts: state,
});
const mapDispatchToProps = dispatch => ({
  addContact: data => {
    dispatch({ type: "ADD_CONTACT", payload: data });
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(AddPost);
