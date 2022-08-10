import {Component} from 'react'
import Loader from 'react-loader-spinner'

import VaccinationCoverage from '../VaccinationCoverage'
import VaccinationByGender from '../VaccinationByGender'
import VaccinationByAge from '../VaccinationByAge'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class CowinDashboard extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    lastSevenDaysList: [],
    vaccinationByAgeList: [],
    vaccinationByGenderList: [],
  }

  componentDidMount() {
    this.getCoWinStatsList()
  }

  getCoWinStatsList = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const covidVaccinationDataApiUrl =
      'https://apis.ccbp.in/covid-vaccination-data'
    const options = {
      method: 'GET',
    }
    const response = await fetch(covidVaccinationDataApiUrl, options)

    if (response.ok === true) {
      const data = await response.json()

      const filteredSevenDaysData = data.last_7_days_vaccination.map(
        vaccineDetails => ({
          vaccineDate: vaccineDetails.vaccine_date,
          dose_1: vaccineDetails.dose_1,
          dose_2: vaccineDetails.dose_2,
        }),
      )

      const vaccinationByAge = data.vaccination_by_age

      const vaccinationByGender = data.vaccination_by_gender

      this.setState({
        lastSevenDaysList: filteredSevenDaysData,
        vaccinationByAgeList: vaccinationByAge,
        vaccinationByGenderList: vaccinationByGender,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  getSuccessView = () => {
    const {
      lastSevenDaysList,
      vaccinationByAgeList,
      vaccinationByGenderList,
    } = this.state

    return (
      <div className="success-container">
        <div className="vaccination-container">
          <h1 className="vaccination-coverage-text">Vaccination Coverage</h1>
          <VaccinationCoverage lastSevenDaysList={lastSevenDaysList} />
        </div>
        <div className="vaccination-container">
          <h1 className="vaccination-coverage-text">Vaccination by gender</h1>
          <VaccinationByGender
            vaccinationByGenderList={vaccinationByGenderList}
          />
        </div>
        <div className="vaccination-container">
          <h1 className="vaccination-coverage-text">Vaccination by age</h1>
          <VaccinationByAge vaccinationByAgeList={vaccinationByAgeList} />
        </div>
      </div>
    )
  }

  getFailureView = () => (
    <div className="failure-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        className="failure-image"
        alt="failure view"
      />
      <h1 className="failure-text">Something went wrong</h1>
    </div>
  )

  getInProgressView = () => (
    <div className="loading-view-container" testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height={80} width={80} />
    </div>
  )

  getAllViews = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.getSuccessView()
      case apiStatusConstants.failure:
        return this.getFailureView()
      case apiStatusConstants.inProgress:
        return this.getInProgressView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="co-win-main-container">
        <div className="logo-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/cowin-logo.png"
            className="logo-image"
            alt="website logo"
          />
          <p className="co-win-text">Co-WIN</p>
        </div>
        <h1 className="vaccination-text">CoWIN Vaccination in India</h1>
        {this.getAllViews()}
      </div>
    )
  }
}

export default CowinDashboard
