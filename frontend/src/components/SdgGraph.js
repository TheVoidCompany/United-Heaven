import G6 from '@antv/g6';
import { Box, useColorModeValue } from '@chakra-ui/react';
import { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import { disableScroll, enableScroll } from '../utils/scrollAndSelectHandler';






const SdgGraph = ({ nodes, edges, maxNodeSize, size = "500px" }) => {

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
    }, [edgeColor, edges]);


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


    }, [nodes, edges, maxNodeSize]);

    return <Box
        rounded='md'
        backgroundColor={useColorModeValue('gray.200', 'gray.700')}
        ref={ref}
        w={size}
        h={size}
    >
    </Box>;
}

export default SdgGraph;
