import { SimpleGrid } from '@chakra-ui/react';
import { AnimatePresence, AnimateSharedLayout, motion } from 'framer-motion';
import OverlayCard from '../../components/OverlayCard';

const WIDTH_OF_COMPRESSED_CARD = 340;
const WIDTH_OF_EXPANDED_CARD = 500;

const CountryDetailsPopup = ({ hoveredMarker, selectedMarker, onClose }) => {


    const Card = ({ name, goals, expand }) => {
        return (
            <OverlayCard
                title={name}
                titleLg={expand}
                closeButton={expand}
                onClose={onClose}
                customStyles={{ width: expand ? WIDTH_OF_EXPANDED_CARD : WIDTH_OF_COMPRESSED_CARD }}
            >
                <SimpleGrid columns={3} spacing={5}>
                    {goals.map((goal) => (
                        <motion.img
                            key={goal}
                            style={{ width: expand ? '140px' : '90px', height: expand ? '140px' : '90px', }}
                            src={require(`../../images/SDGIcons/Goal${goal}.png`)}
                            alt={`SDG Goal ${goal}`}
                        />
                    ))}
                </SimpleGrid>
            </OverlayCard>
        )
    }

    return (
        <AnimateSharedLayout>
            {(hoveredMarker && selectedMarker === null) ? (
                <motion.div
                    layoutId="expandable-card"
                    style={{
                        left: '0',
                        top: '0',
                    }}
                >
                    <Card name={hoveredMarker?.name} goals={hoveredMarker?.goals} />
                </motion.div>
            ) : null}
            {selectedMarker ? (
                <AnimatePresence>
                    <motion.div
                        layoutId="expandable-card"
                        style={{
                            //Not working
                            left: `calc(50% - ${WIDTH_OF_EXPANDED_CARD / 2}px)`,
                            top: '10%',
                            position: 'absolute'
                        }}
                    >
                        <Card
                            name={selectedMarker?.name}
                            goals={selectedMarker?.goals}
                            expand
                        />

                    </motion.div>
                </AnimatePresence>
            ) : null}
        </AnimateSharedLayout>
    );

}

export default CountryDetailsPopup