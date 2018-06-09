import React from 'react'
import PropTypes from 'prop-types'

const SelectListGroup = ({
    name,
    value,
    error,
    info,
    onChange,
    options
    }) => {
    const selectOptions = options.map(option => 
    <option key={option.label} value={option.value}>
        {option.label}
    </option>)
    return (
        <div className="form-group">
            <select
                className={error ? "form-control form-control-lg is-invalid" : "form-control form-control-lg"}
                name={name}
                value={value}
                onChange={onChange}
                >
                {selectOptions}
            </select>
            {info ? <small className="form-text text-muted">{info}</small> : null}
            {error ? <div className="invalid-feedback">{error}</div> : null}
        </div>
    )
}

SelectListGroup.propTypes = {
    name: PropTypes.string.isRequired,
    error: PropTypes.string,
    info: PropTypes.string,
    options: PropTypes.array.isRequired,
    onChange: PropTypes.func.isRequired,
    value: PropTypes.string.isRequired,
}

export default SelectListGroup