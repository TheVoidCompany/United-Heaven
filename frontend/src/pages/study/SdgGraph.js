import G6 from '@antv/g6';
import { Box, useColorModeValue } from '@chakra-ui/react';
import { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import { SDGGoals } from '../../constants/SDGGoals';
import { SDGRelation } from '../../constants/SDGRelation';
import { disableScroll, enableScroll } from '../../utils/scrollAndSelectHandler';

const maxNodeSize = 80;

const nodes = SDGGoals.map(SDGGoal => {
    return {
        id: SDGGoal.id,
        label: SDGGoal.id,
        labelCfg: {
            position: 'center',
            style: {
                fill: SDGGoal.color,
                // fontStyle: 'bolder',
                fontSize: 12,
                fontFamily: 'Play'

            },
        },
    }
});

nodes.unshift({
    id: "0",
    label: "SDG Goals",
    style: {
        "stroke": "rgba(95, 149, 255, 0.5)",
        "lineWidth": 2,
    },
    labelCfg: {
        position: 'center',
        style: {
            fill: '#000000CC',
            fontStyle: 'bolder',
            fontFamily: 'Play',
            fontSize: 12

        },
    },
    size: maxNodeSize
});


const edges = SDGRelation.map(SDGRelation => {
    return {
        source: SDGRelation.sourceGoal,
        target: SDGRelation.targetGoal,
    }
});

SDGGoals.forEach(goal => {
    edges.push({
        source: "0",
        target: goal.id
    })
})


const SdgGraph = () => {

    const ref = useRef(null);
    const graph = useRef(null);
    const edgeColor = useColorModeValue('#97A2B0', '#9CA8C0');


    useEffect(() => {
        if (graph.current) {
            edges.forEach((edge, index) => {
                graph.current.updateItem('edge' + index, {
                    style: {
                        stroke: edgeColor
                    }
                })
            })

        }
    }, [edgeColor]);


    useEffect(() => {

        if (!graph.current) {
            const container = ReactDOM.findDOMNode(ref.current);
            const width = container.scrollWidth;
            const height = container.scrollHeight || 500;

            const onTick = () => {
                let minx = 99999999;
                let maxx = -99999999;
                let miny = 99999999;
                let maxy = -99999999;
                let maxsize = -9999999;
                nodes.forEach((node) => {
                    if (minx > node.x) {
                        minx = node.x;
                    }
                    if (maxx < node.x) {
                        maxx = node.x;
                    }
                    if (miny > node.y) {
                        miny = node.y;
                    }
                    if (maxy < node.y) {
                        maxy = node.y;
                    }
                    if (maxsize < node.size) {
                        maxsize = node.size;
                    }
                });
                const scalex = (width - maxsize) / (maxx - minx);
                const scaley = (height - maxsize) / (maxy - miny);
                nodes.forEach((node) => {
                    node.x = (node.x - minx) * scalex + maxNodeSize / 2;
                    node.y = (node.y - miny) * scaley + maxNodeSize / 2;
                });
            };

            graph.current = new G6.Graph({
                container: ReactDOM.findDOMNode(ref.current),
                width,
                height,
                layout: {
                    type: 'force',
                    preventOverlap: true,
                    onTick,
                    linkDistance: (d) => {
                        if (d.source.id === '0') {
                            return 100;
                        }
                        return 50;
                    },
                },
                defaultNode: {
                    size: 40,
                    type: 'bubble',
                },
                defaultEdge: {
                    style: {
                        stroke: "#97A2B0"
                    }
                }
            });

            graph.current.data({
                nodes: nodes,
                edges: edges.map(function (edge, i) {
                    edge.id = 'edge' + i;
                    return Object.assign({}, edge);
                }),
            });
            graph.current.render();

            graph.current.on('node:dragstart', function (e) {
                disableScroll()
                graph.current.layout();
                refreshDragedNodePosition(e);
            });
            graph.current.on('node:drag', function (e) {
                const forceLayout = graph.current.get('layoutController').layoutMethods[0];
                forceLayout.execute();
                refreshDragedNodePosition(e);
            });
            graph.current.on('node:dragend', function (e) {
                enableScroll()
                e.item.get('model').fx = null;
                e.item.get('model').fy = null;
            });

            if (typeof window !== 'undefined')
                window.onresize = () => {
                    if (!graph.current || graph.current.get('destroyed')) return;
                    if (!container || !container.scrollWidth || !container.scrollHeight) return;
                    graph.current.changeSize(container.scrollWidth, container.scrollHeight);
                };

            function refreshDragedNodePosition(e) {
                const model = e.item.get('model');
                model.fx = e.x;
                model.fy = e.y;
            }




        }


    }, []);

    return <Box
        rounded='md'
        backgroundColor={useColorModeValue('gray.200', 'gray.700')}
        ref={ref}
        w="500px"
        h="500px"
    >
    </Box>;
}

export default SdgGraph;
