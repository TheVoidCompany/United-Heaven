import { Area, Axis, Chart, Legend, Line } from '@antv/f2';
import Canvas from '@antv/f2-react';
import { SDGLogoColor } from '../../constants/SDGLogoColor';

const AreaChart = ({ data }) => {

    const findAreaColor = (value) => {
        //get goal number from 'goal 1' text
        const goalNumber = value.split(' ')[1];
        return SDGLogoColor[goalNumber - 1];
    }


    return (
        <Canvas>
            <Chart
                data={data}
                scale={{
                    date: {
                        range: [0, 1],
                        type: 'timeCat',
                        mask: 'MM-DD',
                        tickCount: 5,
                    },
                    value: {
                        max: 300,
                        tickCount: 4,
                    },
                }}
            >
                <Axis field="value" />
                <Axis
                    field="date"
                    style={{
                        label: { align: 'between' },
                    }}
                />
                <Area x="date" y="value" color={{
                    field: "city",
                    callback: (value) => findAreaColor(value)
                }} adjust="stack" />
                <Line x="date" y="value" color={{
                    field: "city",
                    callback: (value) => findAreaColor(value)
                }} adjust="stack" />
                <Legend style={{ justifyContent: 'space-around' }} />
            </Chart>
        </Canvas>
    )
}

export default AreaChart;