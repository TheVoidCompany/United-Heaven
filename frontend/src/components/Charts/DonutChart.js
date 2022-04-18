import { Chart, Interval, Legend } from '@antv/f2';
import Canvas from '@antv/f2-react';

const data = [
    {
        name: 'Spillover Score',
        percent: 85,
        a: '1',
    },
    {
        name: 'Index Score',
        percent: 60,
        a: '1',
    },
];

const DonutChart = () => {
    return (
        <Canvas>
            <Chart
                scale={{
                    percent: {
                        formatter: function formatter(val) {
                            return val + '%';
                        },
                    },
                }}
                data={data}
                coord={{
                    type: 'polar',
                    transposed: true,
                    innerRadius: 0.7,
                    radius: 0.85,
                }}
            >
                <Interval
                    x="a"
                    y="percent"
                    color={{
                        field: 'name',
                        range: ['#FE5D4D', '#737DDE'],
                    }}
                    adjust="dodge"
                />
                <Legend
                    position="right"
                    itemFormatter={(val) => {
                        return val + '%';
                    }}
                />
            </Chart>
        </Canvas>
    )
}

export default DonutChart;