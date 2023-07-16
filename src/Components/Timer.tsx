import React from "react";
import { styled } from "styled-components";

// ## TODO - gradient 쪽 CSS 수정

const TimerDiv = styled.div`
  width: 500px;
  position: relative;
  height: 500px;
  border: 10px solid black;
  border-radius: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const TimerCenter = styled.div`
  width: 20%;
  height: 20%;
  display: grid;
  place-items: center;
  background-color: white;
  border: 0.3rem solid black;
  border-radius: 50%;
  z-index: 1000;
`;

const Lines = styled.div<{ isThickLine?: boolean; degree: number }>`
  width: ${(props) => (props.isThickLine ? "3px" : "1px")};
  background-color: black;
  height: calc(80%);
  z-index: 500;
  position: absolute;
  transform: rotate(${(props) => props.degree}deg);
`;

const LineCover = styled.div<{ percent: number }>`
  width: calc(80% - 4%);
  position: absolute;
  height: calc(80% - 4%);
  z-index: 600;
  background-color: red;
  border-radius: 50%;
  background-image: linear-gradient(
      ${(props) => props.percent}deg,
      transparent 50%,
      ${(props) => (props.percent > 180 ? "red" : "white")} 50%
    ),
    linear-gradient(
      90deg,
      ${(props) => (props.percent > 180 ? "red" : "white")} 50%,
      transparent 50%
    );
`;

const NumberBox = styled.div<{ degree: number }>`
  position: absolute;
  display: flex;
  height: calc(95%);
  transform: rotate(${(props) => props.degree}deg);
  font-size: 1.2em;
  z-index: 600;
  justify-content: space-between;
  flex-direction: column;
`;

const NumberText = styled.span<{ degree: number }>`
  transform: rotate(${(props) => props.degree}deg);
  font-weight: 600;
`;

const MinutesIndicator = () => {
  const count = 6;
  return (
    <>
      {[...Array(count)].map((el, index) => {
        return (
          <NumberBox degree={index * 30}>
            <NumberText degree={-index * 30}>{index * 5}</NumberText>
            <NumberText degree={-index * 30}>{(index + 6) * 5}</NumberText>
          </NumberBox>
        );
      })}
    </>
  );
};

const LineWrapper = () => {
  const count = 30;
  return (
    <>
      {[...Array(count)].map((el, index) => {
        const isThickLine = index % 5 === 0;
        return <Lines isThickLine={isThickLine} degree={index * 6}></Lines>;
      })}
    </>
  );
};

const ProgressIndicator = ({
  percent,
}: {
  percent: number;
}): React.ReactElement => {
  const piePercent = percent * 0.01 * 360 + 90;
  return <LineCover percent={piePercent} />;
};

const Timer = () => {
  const [date, setDate] = React.useState(25 * 60);
  React.useEffect(() => {
    const interval = setInterval(() => {
      setDate((date) => date - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <TimerDiv>
      <MinutesIndicator />
      <LineWrapper />
      <ProgressIndicator percent={60} />
      <TimerCenter />
    </TimerDiv>
  );
};
export default Timer;
