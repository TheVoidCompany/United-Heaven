import { Image, SimpleGrid } from '@chakra-ui/react';
import { memo, useCallback } from 'react';
import { useNavigate } from 'react-router';
import OverlayCard from '../../components/cards/OverlayCard';

const CountryDetailsPopup = ({ hoveredMarker, selectedMarker, onClose }) => {

    console.log(hoveredMarker)

    const navigate = useNavigate();


    const Card = useCallback(
        ({ name, iso3, goals, close }) => {
            return (
                <OverlayCard
                    title={name}
                    titleOnClick={() => navigate(`/profiles/${iso3.toLowerCase()}`)}
                    onClose={close && onClose}
                    width={340}
                    isSmallSize={false}
                >
                    <SimpleGrid columns={3} spacing={5}>
                        {goals.map((goal) => (
                            <Image
                                key={goal}
                                onClick={() => navigate(`/profiles/${iso3.toLowerCase()}/goal${goal}`)}
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
                Card({ name: hoveredMarker.name, goals: hoveredMarker.goals, iso3: hoveredMarker.iso3, close: false })
            )}
            {selectedMarker !== null && (
                Card({ name: selectedMarker.name, goals: selectedMarker.goals, iso3: selectedMarker.iso3, close: true })

            )}
        </>
    );

}

export default memo(CountryDetailsPopup);