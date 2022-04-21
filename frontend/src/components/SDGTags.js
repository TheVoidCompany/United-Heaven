/** @jsxImportSource @emotion/react */
import { Tag, Text, Wrap, WrapItem } from '@chakra-ui/react';
import { css } from '@emotion/react';
import { useNavigate } from 'react-router-dom';
import { SDGGoals } from '../constants/SDGGoals';

const SDGTags = ({ goals, targets, wrapWidth, position = "start" }) => {

    const navigate = useNavigate();

    return (
        <Wrap maxW={wrapWidth} justify={position}>
            {goals?.map(goal => {
                return (
                    <WrapItem key={goal}>
                        {/* <Square size='28px' bg={SDGGoals[goal - 1].color} color='white'>
                        <Text
                                css={css`
                             text-shadow: 2px 2px 8px black;
                             font-size: 12;
                             font-weight: bold;
                             `}
                            >{goal}</Text>
                        //  </Square> */}
                        <Tag
                            size="sm"
                            variant='solid'
                            cursor={"pointer"}
                            backgroundColor={SDGGoals[goal - 1].color}
                            onClick={() => navigate(`/feed/goals/${goal}`)}
                        >
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
            {targets?.map(target => {
                return (
                    <WrapItem key={target}>
                        <Tag
                            size="sm"
                            variant='solid'
                            cursor={"pointer"}
                        >
                            <Text
                                css={css`
                             text-shadow: 2px 2px 8px black;
                             font-size: 12;
                             font-weight: bold;
                             `}
                            >{target}</Text>
                        </Tag>
                    </WrapItem>
                )
            })}
        </Wrap>
    )
}

export default SDGTags