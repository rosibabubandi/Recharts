import {PieChart, Pie, Cell, Legend} from 'recharts'

const VaccinationByGender = props => {
  const {vaccinationByGenderList} = props

  return (
    <PieChart width={1000} height={500}>
      <Pie
        cx="50%"
        cy="50%"
        data={vaccinationByGenderList}
        startAngle={0}
        endAngle={180}
        innerRadius="40%"
        outerRadius="70%"
        dataKey="count"
      >
        <Cell name="Male" fill="#f54394" />
        <Cell name="Female" fill="#5a8dee" />
        <Cell name="Others" fill="#2cc6c6" />
      </Pie>
      <Legend
        iconType="circle"
        layout="horizontal"
        horizontalAlign="bottom"
        align="center"
      />
    </PieChart>
  )
}

export default VaccinationByGender
