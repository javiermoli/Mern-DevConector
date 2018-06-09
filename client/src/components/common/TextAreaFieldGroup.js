import React from 'react'
import PropTypes from 'prop-types'

const TextAreaFieldGroup = ({
    name,
    placeholder,
    value,
    error,
    info,
    onChange,
    }) => {
    return (
        <div className="form-group">
            <textarea
                className={error ? "form-control form-control-lg is-invalid" : "form-control form-control-lg"}
                placeholder={placeholder}
                name={name}
                value={value}
                onChange={onChange}
            />
            {info ? <small className="form-text text-muted">{info}</small> : null}
            {error ? <div className="invalid-feedback">{error}</div> : null}
        </div>
    )
}

TextAreaFieldGroup.propTypes = {
    name: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    error: PropTypes.string,
    info: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    value: PropTypes.string.isRequired,
}

export default TextAreaFieldGroup