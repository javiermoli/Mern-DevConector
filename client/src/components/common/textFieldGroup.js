import React from 'react'
import PropTypes from 'prop-types'

const TextFieldGroup = ({
    name,
    placeholder, 
    value, 
    label, 
    error, 
    info, 
    type, 
    onChange,
    disabled
    }) => {
    return (
        <div className="form-group">
            <input 
                type={type}
                className={error ? "form-control form-control-lg is-invalid" : "form-control form-control-lg"}
                placeholder={placeholder}
                name={name}
                value={value}
                onChange={onChange}
                disabled={disabled}
            />
            {info ? <small className="form-text text-muted">{info}</small>: null}
            {error ? <div className="invalid-feedback">{error}</div> : null}
        </div>
        )
}
TextFieldGroup.propTypes = {
    name:PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    error: PropTypes.string,
    info: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    disabled: PropTypes.string,
    value: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    label: PropTypes.string
}

TextFieldGroup.defaultProps = {
    type:'text'
}

export default TextFieldGroup