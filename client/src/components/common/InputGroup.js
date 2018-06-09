import React from 'react'
import PropTypes from 'prop-types'

const InputGroup = ({
    name,
    placeholder,
    value,
    error,
    icon,
    type,
    onChange,
    }) => {
    return (
        <div className="input-group mb-3">
            <div className="input-group-prepend">
                <span className="input-group-text">
                    <i className={icon}></i>
                </span>
            </div>
            <input
                className={error ? "form-control form-control-lg is-invalid" : "form-control form-control-lg"}
                placeholder={placeholder}
                name={name}
                value={value}
                onChange={onChange}
            />
            {error ? <div className="invalid-feedback">{error}</div> : null}
        </div>
    )
}

InputGroup.propTypes = {
    name: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    error: PropTypes.string,
    icon: PropTypes.string,
    type: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    value: PropTypes.string.isRequired,
}

InputGroup.defaultProps = {
    type:'text'
}

export default InputGroup