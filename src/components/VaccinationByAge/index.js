import {PieChart, Pie, Cell, Legend} from 'recharts'

const VaccinationByAge = props => {
  const {vaccinationByAgeList} = props

  return (
    <PieChart width={1000} height={500}>
      <Pie
        cx="50%"
        cy="50%"
        data={vaccinationByAgeList}
        startAngle={0}
        endAngle={360}
        innerRadius="0%"
        outerRadius="100%"
        dataKey="count"
      >
        <Cell name="18-44" fill="#5a8dee" />
        <Cell name="44-60" fill="#a3df9f" />
        <Cell name="Above 60" fill="#2cc6c6" />
      </Pie>
      <Legend
        iconType="circle"
        layout="horizontal"
        horizontalAlign="middle"
        align="center"
      />
    </PieChart>
  )
}

export default VaccinationByAge
