import React from "react";
import studentdata from "../data/studentdata.json"
import studentinformation from "../data/studentinformation.json"
import { useParams } from "react-router-dom";
import { VictoryBar, VictoryChart, VictoryAxis, VictoryTheme, VictoryLegend, VictoryLabel, VictoryGroup } from "victory";

export default function Student(){

    const {name} = useParams();
    const [data, setData] = React.useState(studentdata)
    const [students, setStudents] = React.useState(studentinformation)

    const student = students.find((student) => student.name === name);

    const studentElement = student ? (
        <div key={student.name} className="student-card">
        <div key={student.id} className="student-tile">
            <img src={student.photo} alt="avatar" className="student-img"/>
            <h3>{student.name} {student.last_name}</h3>
            <p>E-mail: {student.email}</p>
            <p>Phone number: {student.phone_number}</p>
            <p>Gender: {student.gender}</p>
        </div>
        </div> 
    ) : "! This student is not found. Please click on a bar in the chart !"

    
    const dataDifficulty = data.filter((data) => data["Hoe moeilijk vond je deze opdracht?"] >= 4);

    const matchName = dataDifficulty.filter((data) => data["Wie ben je?"] === name);

    const mostDifficult = matchName.map((data) => {
        return(
            <div>
                <p>{data["Welke opdracht of welk project lever je nu in?"]}</p>
            </div>
        )
    })
    
   const dataFun = data.filter((data) => data["Hoe leuk vond je deze opdracht?"] >= 4);
   const matchFun = dataFun.filter((data) => data["Wie ben je?"] === name);
   
   const mostFun = matchFun.map((data) => {
    return(
        <div>
            <p>{data["Welke opdracht of welk project lever je nu in?"]}</p>
        </div>
    )
})

    const dataForChart = data.filter((data) => data["Wie ben je?"] === name);

    const dataForBar = dataForChart.map((item) => ({
        name: item["Wie ben je?"], 
        assignment: item["Welke opdracht of welk project lever je nu in?"],
        difficulty: item["Hoe moeilijk vond je deze opdracht?"],
        fun: item["Hoe leuk vond je deze opdracht?"],
    }));

    const studentChart = student ? (
        <div key={data.name}>
        <VictoryChart
            theme={VictoryTheme.material}
            height={400}
            width={950}
            domainPadding={10}
        >
            <VictoryAxis 
                label={"Assignment"}
                tickValues={dataForBar.map(item => item.assignment)}
                tickFormat={dataForBar.map(item => item.assignment)}
                style={{
                    axisLabel: {padding: 160, fontSize: 11}, 
                    tickLabels:{fontSize: 11, angle: 55, transform: "translate(-1, -2)", textAnchor: "start" }}}
            />
            <VictoryAxis 
                dependentAxis 
                label={"Rating"}
                style={{axisLabel: {padding: 45, fontSize: 11}, tickLabels: {fontSize: 11}}}
            />
            <VictoryGroup offset={5}>
                <VictoryBar 
                    animate={{duration: 3000}}
                    data={dataForBar} 
                    x="assignment" 
                    y="difficulty"
                    style={{data:{fill: "purple", width: 3}}}
                />
                <VictoryBar
                    animate={{duration: 3000}} 
                    data={dataForBar} 
                    x="assignment" 
                    y="fun" 
                    style={{data:{fill: "orange", width: 3}}}
                />
                <VictoryLegend x={20} y={2}
                    orientation="horizontal" 
                    gutter={50}
                    symbolSpacer={20}
                    labelComponent={<VictoryLabel style={{ fontSize: 14 }} />}
                    data={[
                        { name: "Difficulty", symbol: { fill: "purple", type: "star", size: 9 } },
                        { name: "Fun", symbol: { fill: "orange", type: "star", size: 9 } },
                    ]} />
            </VictoryGroup>
        </VictoryChart>
        </div>
    ) : ""

    return(
        <div className="student-container">
            <h3>Individual student information:</h3>
            <div style={student ? {display: "block"} : { display: "none"}}>
                <p>You´ve clicked on the bar of {name}. Find the personal information and chart of {name} below.</p> 
            </div>
            <div className="student_element_container">{studentElement}</div>
            <div>{studentChart}</div>
            <div className="difficult_fun_container" style={student ? {display: "flex"} : { display: "none"}}>
                <div>
                    <h3>Most difficult assignments from {name}:</h3>
                    <div>{mostDifficult}</div>
                </div>
                <div>
                    <h3>Most fun assignments from {name}:</h3>
                    <div>{mostFun}</div>
                </div>
            </div>
        </div>

    )
}

