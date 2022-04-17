import { Portal } from "@chakra-ui/react";
import { useMousePosition } from "../hooks/mousePositionHook";
import OverlayCard from "./cards/OverlayCard";

const MouseOverlayWrapper = ({ children }) => {

    const position = useMousePosition();
    const navBarHeight = document.documentElement.clientHeight * 0.08;


    return (
        <Portal>
            <OverlayCard
                // position overlaycard above the mouse
                // left = mouse position - overlaycard margin
                position={{ left: position.x - 30 + 'px', top: position.y - navBarHeight - 100 + 'px' }}
                customStyles={{ transform: 'translateX(-50%)', minW: "fit-content" }}
            >
                {children}
            </OverlayCard>
        </Portal>
    )
}


export default MouseOverlayWrapper