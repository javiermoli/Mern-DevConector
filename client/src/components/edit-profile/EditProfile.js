import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import TextFieldGroup from '../common/textFieldGroup'
import TextAreaFieldGroup from '../common/TextAreaFieldGroup'
import InputGroup from '../common/InputGroup'
import SelectListGroup from '../common/SelectListGroup'
import { createProfile, getCurrentProfile } from '../../actions/profileActions'
import isEmpty from '../../validation/empty'

class EditProfile extends Component {
    constructor(props) {
        super(props)
        this.state = {
            displaySocialInputs: false,
            handle: '',
            company: '',
            website: '',
            location: '',
            status: '',
            skills: '',
            githubusername: '',
            bio: '',
            twitter: '',
            facebook: '',
            instagram: '',
            youtube: '',
            linkedin: '',
            errors: {}
        }

    }

    componentDidMount() {
        this.props.getCurrentProfile()
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            })
        }
        
        

        if(nextProps.profile.profile) {
            const profile = nextProps.profile.profile

            //Bring skills array back to CSV
            const skillsCSV = profile.skills.join(',')

            //If profile field doesnt exist, make empty string
            profile.company = !isEmpty(profile.company) ? profile.company  :''
            profile.website = !isEmpty(profile.website) ? profile.website : ''
            profile.location = !isEmpty(profile.location) ? profile.location : ''
            profile.githubusername = !isEmpty(profile.githubusername) ? profile.githubusername : ''
            profile.bio = !isEmpty(profile.bio) ? profile.bio : ''
            profile.social = !isEmpty(profile.social) ? profile.social : {}
            profile.social.facebook = !isEmpty(profile.social.facebook) ? profile.social.facebook : ''
            profile.social.twitter = !isEmpty(profile.social.twitter) ? profile.social.twitter : ''
            profile.social.youtube = !isEmpty(profile.social.youtube) ? profile.social.youtube : ''
            profile.social.linkedin = !isEmpty(profile.social.linkedin) ? profile.social.linkedin : ''
            profile.social.instagram = !isEmpty(profile.social.instagram) ? profile.social.instagram : ''

            //set component field states
            this.setState({
                handle: profile.handle,
                company: profile.company,
                status: profile.status,
                bio:profile.bio,
                website: profile.website,
                location :profile.location,
                githubusername :profile.githubusername,
                social :profile.social,
                facebook :profile.social.facebook,
                twitter :profile.social.twitter,
                youtube :profile.social.youtube,
                linkedin :profile.social.linkedin,
                instagram :profile.social.instagram,
                skills: skillsCSV

            })
        }
    }

    onSubmit = e => {
        e.preventDefault()

        const profileData = {
            handle: this.state.handle,
            company: this.state.company,
            website: this.state.website,
            location: this.state.location,
            status: this.state.status,
            skills: this.state.skills,
            githubusername: this.state.githubusername,
            bio: this.state.bio,
            twitter: this.state.twitter,
            facebook: this.state.facebook,
            instagram: this.state.instagram,
            youtube: this.state.youtube,
            linkedin: this.state.linkedin,
        }
        this.props.createProfile(profileData, this.props.history)
    }

    onChange = e => {
        this.setState({ [e.target.name]: e.target.value })
    }

    render() {
        const { errors, displaySocialInputs } = this.state
        let socialInputs;
        if (displaySocialInputs) {
            socialInputs = (
                <div>
                    <InputGroup
                        placeholder="Twitter Profile URL"
                        name="twitter"
                        icon="fab fa-twitter"
                        onChange={this.onChange}
                        value={this.state.twitter}
                        error={errors.twitter}
                    />
                    <InputGroup
                        placeholder="Facebook Page URL"
                        name="facebook"
                        icon="fab fa-facebook"
                        onChange={this.onChange}
                        value={this.state.facebook}
                        error={errors.facebook}
                    />
                    <InputGroup
                        placeholder="Linkedin Profile URL"
                        name="linkedin"
                        icon="fab fa-linkedin"
                        onChange={this.onChange}
                        value={this.state.linkedin}
                        error={errors.linkedin}
                    />
                    <InputGroup
                        placeholder="YouTube Channel URL"
                        name="youtube"
                        icon="fab fa-youtube"
                        onChange={this.onChange}
                        value={this.state.youtube}
                        error={errors.youtube}
                    />
                    <InputGroup
                        placeholder="Instagram Page URL"
                        name="instagram"
                        icon="fab fa-instagram"
                        onChange={this.onChange}
                        value={this.state.instagram}
                        error={errors.instagram}
                    />
                </div>
            )
        }

        const options = [
            { label: '* Select Professional Status', value: "0" },
            { label: 'Developer', value: "Developer" },
            { label: 'Developer Junior', value: "Developer Junior" },
            { label: 'Senior Developer', value: "Senior Developer" },
            { label: 'Manager', value: "Manager" },
            { label: 'Student or Learning', value: "Student or Learning" },
            { label: 'Instructor or Teacher', value: "Instructor" },
            { label: 'Intern', value: "Intern" },
            { label: 'Other', value: "Other" }
        ]
        return (
            <div className="create-profile">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <a href="dashboard" className="btn btn-light">
                                Go Back
                        </a>
                            <h1 className="display-4 text-center">Edit Your Profile</h1>
                            <small className="d-block pb-3">* = required field</small>
                            <form onSubmit={this.onSubmit}>
                                <TextFieldGroup
                                    placeholder="* Profile handle"
                                    name="handle"
                                    value={this.state.handle}
                                    onChange={this.onChange}
                                    error={errors.handle}
                                    info="A unique handle for your profile URL. Your full name, company name, nickname, etc (This CAN'T be changed later)"
                                />
                                <SelectListGroup
                                    name="status"
                                    value={this.state.status}
                                    onChange={this.onChange}
                                    options={options}
                                    error={errors.status}
                                    info="Give us an idea of where you are at in your career"
                                />
                                <TextFieldGroup
                                    placeholder="Company"
                                    name="company"
                                    value={this.state.company}
                                    onChange={this.onChange}
                                    error={errors.company}
                                    info="Could be your own company or one you work for"
                                />
                                <TextFieldGroup
                                    placeholder="Website"
                                    name="website"
                                    value={this.state.website}
                                    onChange={this.onChange}
                                    error={errors.website}
                                    info="Could be your own or a company website"
                                />
                                <TextFieldGroup
                                    placeholder="Location"
                                    name="location"
                                    value={this.state.location}
                                    onChange={this.onChange}
                                    error={errors.location}
                                    info="City & state suggested (eg. Boston, MA)"
                                />
                                <TextFieldGroup
                                    placeholder="Skills"
                                    name="skills"
                                    value={this.state.skills}
                                    onChange={this.onChange}
                                    error={errors.skills}
                                    info="Please use comma separated values (eg. HTML,CSS,JavaScript,PHP)"
                                />
                                <TextFieldGroup
                                    placeholder="Github Username"
                                    name="githubusername"
                                    value={this.state.githubusername}
                                    onChange={this.onChange}
                                    error={errors.githubusername}
                                    info="If you want your latest repos and a Github link, include your username"
                                />
                                <TextAreaFieldGroup
                                    placeholder="A short bio of yourself"
                                    name="bio"
                                    value={this.state.bio}
                                    onChange={this.onChange}
                                    error={errors.bio}
                                    info="Tell us a little about yourself"
                                />
                                <div className="mb-3">
                                    <button
                                        type="button"
                                        onClick={() => {
                                            this.setState(prevState => ({
                                                displaySocialInputs: !prevState.displaySocialInputs
                                            }))
                                        }}
                                        className="btn btn-light">Add Social Network Links</button>
                                    <span className="text-muted">Optional</span>
                                </div>
                                {socialInputs}
                                <input type="submit" className="btn btn-info btn-block mt-4" />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

EditProfile.propTypes = {
    profile: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    createProfile: PropTypes.func.isRequired,
    getCurrentProfile: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    profile: state.profile,
    errors: state.errors
})


export default connect(mapStateToProps, { createProfile, getCurrentProfile })(withRouter(EditProfile))
