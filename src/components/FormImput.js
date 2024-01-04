import React from "react";

class FormInput extends React.Component {
  render() {
    const { checkboxValue, title, date, inputValue } = this.props;

    return (
      <div className="bg-white flex">
        <div className="flex fix">
          <input type="checkbox" value={checkboxValue} />
          <div className="text-left">
            <p>{title}</p>
            <p>{date}</p>
          </div>
          <input type="text" value={inputValue} disabled />
        </div>
        <div className="remove-edit">
          <button type="button" className="">
            <i className="fa-solid fa-trash icon-click"></i>
          </button>
          <button type="button" className="">
            <i className="fa-solid fa-pen icon-click"></i>
          </button>
        </div>
      </div>
    );
  }
}
export default FormInput;
