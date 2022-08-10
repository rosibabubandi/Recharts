import {BarChart, Bar, XAxis, YAxis, Legend} from 'recharts'

const VaccinationCoverage = props => {
  const {lastSevenDaysList} = props

  const DataFormatter = number => {
    if (number > 1000) {
      return `${(number / 1000).toString()}k`
    }
    return number.toString()
  }

  return (
    <BarChart
      width={1000}
      height={500}
      data={lastSevenDaysList}
      margin={{top: 10, left: 10, bottom: 10, right: 10}}
    >
      <XAxis dataKey="vaccineDate" tick={{stroke: '#6c757d', strokeWidth: 1}} />
      <YAxis
        tickFormatter={DataFormatter}
        tick={{stroke: '#6c757d', strokeWidth: 1}}
      />
      <Legend wrapperStyle={{padding: 30}} />
      <Bar dataKey="dose_2" name="Dose 2" fill="#2d87bb" />
      <Bar dataKey="dose_1" name="Dose 1" fill="#f54394" />
    </BarChart>
  )
}

export default VaccinationCoverage
