import React, { Component} from 'react'




class RadioSelect extends Component {
  constructor(props) {
    super(props)
    this.onChange = this.onChange.bind(this)
    this.state = {
      selectedValue: this.props.selectedValue
    }
  }

  onChange(e) {
    this.setState({
      selectedValue: e.target.value
    })
  }

  render() {
    return (
      <div>
        { this.props.label }
        { this.props.options.map((option, i) => (
          <label>
            { option.label }
            <input
              type="radio"
              value={ option.value }
              name={ option.name }
              checked={ this.state.selectedValue == option.value }
              onChange={ this.onChange }
            />
          </label>
        ))}
      </div>
    )
  }

}


export default RadioSelect
