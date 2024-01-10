import React from "react";

class FormInput extends React.Component {
  render() {
    const { title, date, id, status, onClickDelete } = this.props;

    return (
      <div className={`bg-white flex ${status === "1" ? 'bg-light' : (status === "2" ? 'bg-warning' : 'bg-white')}`}>
        <div className="flex fix">
          <input type="checkbox" value=''  />
          <div className="text-left">
            <p>{title}</p>
            <p>{date}</p>
          </div>
          <input type="text" value={id} disabled />
        </div>
        <div className="remove-edit">
          <button type="button" className="btn-icon"
            onClick={onClickDelete}
          >
            <i className="fa-solid fa-trash icon-click" ></i>
          </button>
          <button type="button" className="btn-icon" >
            <i className="fa-solid fa-pen icon-click"></i>
          </button>
        </div>
      </div>
    );
  }
}

export default FormInput;
