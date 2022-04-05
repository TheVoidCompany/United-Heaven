import { SimpleGrid } from '@chakra-ui/react'
import GoalCard from '../../../components/cards/GoalCard'
import { SDGGoals } from '../../../constants/SDGGoals'

const Goal = () => {
    return (
        <SimpleGrid minChildWidth='250px' spacing={10} py="50px">
            {SDGGoals.map((goal, index) => {
                return (
                    <GoalCard key={index} goal={goal} />
                )
            })}
        </SimpleGrid>
    )
}

export default Goal