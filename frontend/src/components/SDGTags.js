/** @jsxImportSource @emotion/react */
import { Tag, Text, Wrap, WrapItem } from '@chakra-ui/react';
import { css } from '@emotion/react';
import { SDGGoals } from '../constants/SDGGoals';

const SDGTags = ({ goals, wrapWidth, position = "start" }) => {
    return (
        <Wrap maxW={wrapWidth} justify={position}>
            {goals.map(goal => {
                return (
                    <WrapItem key={goal}>
                        {/* <Square size='28px' bg={SDGGoals[goal - 1].color} color='white'>
                        //    {goal}
                        //  </Square> */}
                        <Tag size="sm" variant='solid' backgroundColor={SDGGoals[goal - 1].color}>
                            <Text
                                css={css`
                             text-shadow: 2px 2px 8px black;
                             font-size: 12;
                             font-weight: bold;
                             `}
                            >{goal}</Text>
                        </Tag>
                    </WrapItem>
                )
            })}
        </Wrap>
    )
}

export default SDGTags