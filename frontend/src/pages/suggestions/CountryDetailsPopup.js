import { SimpleGrid } from '@chakra-ui/react';
import { memo, useCallback } from 'react';
import OverlayCard from '../../components/OverlayCard';

const CountryDetailsPopup = ({ hoveredMarker, selectedMarker, onClose }) => {


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
                            <img
                                key={goal}
                                style={{ width: '90px', height: '90px', }}
                                src={require(`../../images/SDGIcons/Goal${goal}.png`)}
                                alt={`SDG Goal ${goal}`}
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