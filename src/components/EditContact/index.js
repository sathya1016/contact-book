import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useHistory, useParams } from "react-router";

const EditContact = ({ contacts, updateContact }) => {
  const { id } = useParams();
  const history = useHistory();
  const currentContact = contacts.find(contact => contact.id === parseInt(id));

  useEffect(() => {
    setName(currentContact.name);
    setEmail(currentContact.email);
    setPhone(currentContact.phone);
  }, [currentContact]);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const handleSubmit = e => {
    e.preventDefault();
    const checkContactEmailExists = contacts.filter(contact =>
      contact.email === email && contact.id !== currentContact.id
        ? contact
        : null
    );
    const checkContactPhoneExists = contacts.filter(contact =>
      contact.phone === phone && contact.id !== currentContact.id
        ? contact
        : null
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
      id: currentContact.id,
      email,
      name,
      phone,
    };

    updateContact(data);
    alert("Contact updated successfully!!");
    history.push("/");
  };

  return (
    <div>
      <div>
        <button onClick={() => history.push("/")}>Go back</button>
        <div>
          {currentContact ? (
            <form onSubmit={handleSubmit}>
              <div>
                <input
                  value={name}
                  placeholder={"Name"}
                  onChange={e => setName(e.target.value)}
                />
              </div>
              <div>
                <input
                  value={email}
                  placeholder={"Email"}
                  onChange={e => setEmail(e.target.value)}
                />
              </div>
              <div>
                <input
                  value={phone}
                  placeholder={"Phone"}
                  onChange={e => setPhone(e.target.value)}
                />
              </div>
              <div>
                <button type="submit">Update Contact</button>
                <button type="button" onClick={() => history.push("/")}>
                  cancel
                </button>
              </div>
            </form>
          ) : (
            <h1>No Contact Found</h1>
          )}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  contacts: state,
});
const mapDispatchToProps = dispatch => ({
  updateContact: data => {
    dispatch({ type: "UPDATE_CONTACT", payload: data });
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(EditContact);
