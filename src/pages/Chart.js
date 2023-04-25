import React from "react";
import { VictoryBar, VictoryChart, VictoryAxis, VictoryTheme, VictoryGroup, VictoryLegend, VictoryLabel } from "victory";
import { useNavigate } from "react-router-dom";
import studentdata from "../data/studentdata.json";

export default function Chart() {

    const [data, setData] = React.useState(studentdata);
    const navigate = useNavigate();

    const formattedData = data.map((item) => ({
        name: item["Wie ben je?"],
        assignment: item["Welke opdracht of welk project lever je nu in?"],
        difficulty: item["Hoe moeilijk vond je deze opdracht?"],
        fun: item["Hoe leuk vond je deze opdracht?"],
        })); 
    
    const groupedData = formattedData.reduce((acc, item) => {
        if (!acc[item.assignment]) {
            acc[item.assignment] = {
                count: 0,
                totalDifficulty: 0,
                totalFun: 0,
            };
        }
        acc[item.assignment].count += 1;
        acc[item.assignment].totalDifficulty += item.difficulty;
        acc[item.assignment].totalFun += item.fun;
        return acc;
    }, {});
    
    const averages = Object.entries(groupedData).map(([assignment, data]) => ({
        assignment,
        avgDifficulty: data.totalDifficulty / data.count,
        avgFun: data.totalFun / data.count,
    }));

    function handleClick () {
        navigate(`/allstudents`);
    }

    const averageChart = (
        <div className="chart-box" onClick={handleClick}>
            <VictoryChart 
                theme={VictoryTheme.material} 
                height={400}
                width={950}
                domainPadding={20}
                >
                <VictoryAxis 
                    label={"Assignments"}
                    tickValues={averages.map((item, index) => index + 1)}
                    tickFormat={averages.map((item) => item.assignment)}
                    style={{
                        axisLabel: {padding: 140, fontSize: 13}, 
                        tickLabels:{fontSize: 9, angle: 55, transform: "translate(-1, -8)", textAnchor: "start" }}}
                />
                <VictoryAxis 
                    dependentAxis 
                    label={"Rating"} 
                    style={{axisLabel: {padding: 45, fontSize: 13}, tickLabels: {fontSize: 9}}} 
                />
                <VictoryGroup offset={5}>
                    <VictoryBar 
                        animate={{duration: 3000}}
                        data={averages} 
                        x="assignment" 
                        y="avgDifficulty" 
                        style={{data:{fill: "purple", width: 3}}}
                    /> 
                    <VictoryBar 
                        animate={{duration: 3000}} 
                        data={averages} 
                        x="assignment" 
                        y="avgFun" 
                        style={{data:{fill: "orange", width: 3}}} 
                    />
                </VictoryGroup>
                <VictoryLegend x={30} y={2}
                    orientation="horizontal" 
                    gutter={50}
                    symbolSpacer={20}
                    labelComponent={<VictoryLabel style={{ fontSize: 14 }} />}
                    data={[
                        { name: "Difficulty", symbol: { fill: "purple", type: "star", size: 9 } },
                        {   name: "Fun", symbol: { fill: "orange", type: "star", size: 9 } },
                    ]} />
            </VictoryChart>
            </div>
    ) 

    const averageFun = (
        <div className="chart-box" onClick={handleClick}>
            <VictoryChart 
                theme={VictoryTheme.material} 
                height={300}
                width={950}
                domainPadding={20}
                >
                <VictoryAxis 
                    label={"Assignments"}
                    tickValues={averages.map((item, index) => index + 1)}
                    tickFormat={averages.map((item) => item.assignment)}
                    style={{
                        axisLabel: {padding: 140, fontSize: 13}, 
                        tickLabels:{fontSize: 9, angle: 55, transform: "translate(-1, -8)", textAnchor: "start" }}}
                />
                <VictoryAxis 
                    dependentAxis 
                    label={"Rating"} 
                    style={{axisLabel: {padding: 45, fontSize: 13}, tickLabels: {fontSize: 9}}} 
                />
                    <VictoryBar 
                        animate={{duration: 3000}} 
                        data={averages} 
                        x="assignment" 
                        y="avgFun" 
                        style={{data:{fill: "orange", width: 7}}} 
                    />
                <VictoryLegend x={30} y={2}
                    orientation="horizontal" 
                    gutter={50}
                    symbolSpacer={20}
                    labelComponent={<VictoryLabel style={{ fontSize: 14 }} />}
                    data={[
                        { name: "Fun", symbol: { fill: "orange", type: "star", size: 9 } },
                    ]} 
                    />
            </VictoryChart>
            </div>
    )

    const averageDifficulty = (
        <div className="chart-box" onClick={handleClick}>
            <VictoryChart 
                theme={VictoryTheme.material} 
                height={300}
                width={950}
                domainPadding={20}
                >
                <VictoryAxis 
                    label={"Assignments"}
                    tickValues={averages.map((item, index) => index + 1)}
                    tickFormat={averages.map((item) => item.assignment)}
                    style={{
                        axisLabel: {padding: 140, fontSize: 13}, 
                        tickLabels:{fontSize: 9, angle: 55, transform: "translate(-1, -8)", textAnchor: "start" }}}
                />
                <VictoryAxis 
                    dependentAxis 
                    label={"Rating"} 
                    style={{axisLabel: {padding: 45, fontSize: 13}, tickLabels: {fontSize: 9}}} 
                />
                    <VictoryBar 
                        animate={{duration: 3000}}
                        data={averages} 
                        x="assignment" 
                        y="avgDifficulty" 
                        style={{data:{fill: "purple", width: 7}}}
                    /> 
                <VictoryLegend x={30} y={2}
                    orientation="horizontal" 
                    gutter={50}
                    symbolSpacer={20}
                    labelComponent={<VictoryLabel style={{ fontSize: 14 }} />}
                    data={[
                        { name: "Difficulty", symbol: { fill: "purple", type: "star", size: 9 } },
                    ]} />
            </VictoryChart>
            </div>
    ) 

    return (
        <div className="chart-container">
            <p>Charts with the average rating for the assignments of all students together:</p>
            <p>You can click on the charts to go to an overview of the average ratings of all individual students.</p>
            <div>{averageChart}</div>
            <div className="chart_difficulty">{averageDifficulty}</div>
            <div className="chart_fun">{averageFun}</div>
        </div>
  );
}

