import React from "react";
import { VictoryBar, VictoryChart, VictoryAxis, VictoryTheme, VictoryLegend, VictoryLabel, VictoryGroup } from "victory";
import studentdata from "../data/studentdata.json"
import { Outlet, useNavigate } from "react-router-dom";

export default function AllStudents(){

    const [data, setData] = React.useState(studentdata);
    const navigate = useNavigate();

    const formattedData = data.map((item) => ({
        name: item["Wie ben je?"],
        assignment: item["Welke opdracht of welk project lever je nu in?"],
        difficulty: item["Hoe moeilijk vond je deze opdracht?"],
        fun: item["Hoe leuk vond je deze opdracht?"],
        })); 
    
    const groupedData = formattedData.reduce((acc, item) => {
        if (!acc[item.name]) {
            acc[item.name] = {
                count: 0,
                totalDifficulty: 0,
                totalFun: 0,
            };
        }
        acc[item.name].count += 1;
        acc[item.name].totalDifficulty += item.difficulty;
        acc[item.name].totalFun += item.fun;
        return acc;
    }, {});
        
    const averages = Object.entries(groupedData).map(([name, data]) => ({
        name,
        avgDifficulty: data.totalDifficulty / data.count,
        avgFun: data.totalFun / data.count,
    }));   

    function handleClick (studentName) {
        navigate(`/allstudents/${studentName}`);
    }

    return(
        <div className="allstudents-container">
            <h3>Overview of all students:</h3>
            <p>Average rating of each student. Click on the bar to get to the individual information of the student below.</p>

            <VictoryChart 
                    theme={VictoryTheme.material}
                    height={300}
                    width={950}
                    domainPadding={20}
                    >
                <VictoryAxis 
                    label={"Name"}
                    tickValues={averages.map((item, index) => index + 1)}
                    tickFormat={averages.map((item) => item.name)}
                    style={{
                        axisLabel: {padding: 60, fontSize: 11}, 
                        tickLabels:{fontSize: 11, angle: 55, transform: "translate(-1, -2)", textAnchor: "start" }}}
                />
                <VictoryAxis 
                    dependentAxis 
                    label={"Rating"}
                    style={{axisLabel: {padding: 45, fontSize: 11}, tickLabels: {fontSize: 11}}} 
                />
                <VictoryGroup offset={15}>
                    <VictoryBar 
                        animate={{duration: 3000}}
                        data={averages} 
                        x="name" 
                        y="avgDifficulty"
                        style={{data:{fill: "purple", width: 10}}}
                        events={[
                            {
                              target: "data",
                              eventHandlers: {
                                onClick: () => {
                                  return [
                                    {
                                      target: "data",
                                      mutation: (props) => {
                                        handleClick(props.datum.name);
                                        return null;
                                      },
                                    },
                                  ];
                                },
                              },
                            },
                          ]}
                    />
                    <VictoryBar 
                        animate={{duration: 3000}} 
                        data={averages} 
                        x="name" 
                        y="avgFun" 
                        style={{data:{fill: "orange", width: 10}}}
                        events={[
                            {
                              target: "data",
                              eventHandlers: {
                                onClick: () => {
                                  return [
                                    {
                                      target: "data",
                                      mutation: (props) => {
                                        handleClick(props.datum.name);
                                        return null;
                                      },
                                    },
                                  ];
                                },
                              },
                            },
                          ]}
                    />
                </VictoryGroup>
                <VictoryLegend x={30} y={2}
                    orientation="horizontal" 
                    gutter={50}
                    symbolSpacer={20}
                    labelComponent={<VictoryLabel style={{ fontSize: 14 }} />}
                    data={[
                        { name: "Difficulty", symbol: { fill: "purple", type: "star", size: 9 } },
                        { name: "Fun", symbol: { fill: "orange", type: "star", size: 9 } },
                    ]} />
            </VictoryChart>

            <Outlet />
        </div>
    )
}
