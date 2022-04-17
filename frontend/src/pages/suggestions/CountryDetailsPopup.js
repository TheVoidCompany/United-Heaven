import { Image, SimpleGrid } from '@chakra-ui/react';
import { memo, useCallback } from 'react';
import { useNavigate } from 'react-router';
import OverlayCard from '../../components/cards/OverlayCard';

const CountryDetailsPopup = ({ hoveredMarker, selectedMarker, onClose }) => {

    const navigate = useNavigate();


    const Card = useCallback(
        ({ name, goals, close }) => {
            return (
                <OverlayCard
                    title={name}
                    onClose={close && onClose}
                    width={340}
                    isSmallSize={false}
                >
                    <SimpleGrid columns={3} spacing={5}>
                        {goals.map((goal) => (
                            <Image
                                key={goal}
                                onClick={() => navigate(`/${name}/goal${goal}`)}
                                cursor="pointer"
                                style={{ width: '90px', height: '90px', }}
                                src={require(`../../images/SDGIcons/Goal${goal}.png`)}
                                alt={`SDG Goal ${goal}`}
                                _hover={{
                                    transform: 'translateY(-2px)',
                                    boxShadow: 'lg',
                                }}
                            />
                        ))}
                    </SimpleGrid>
                </OverlayCard>
            )
        },
        [],
    )


    return (
        <>
            {(hoveredMarker && selectedMarker === null) && (
                Card({ name: hoveredMarker.name, goals: hoveredMarker.goals, close: false })
            )}
            {selectedMarker !== null && (
                Card({ name: selectedMarker.name, goals: selectedMarker.goals, close: true })

            )}
        </>
    );

}

export default memo(CountryDetailsPopup);