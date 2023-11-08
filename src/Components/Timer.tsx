import React from 'react';
import { styled } from 'styled-components';
import useTimer from '../hooks/useTimer';
import { secondToMinutesTextFormat } from '../helpers';

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

const TimerCenter = React.memo(styled.div`
  width: 20%;
  height: 20%;
  display: grid;
  place-items: center;
  background-color: white;
  border: 0.3rem solid black;
  border-radius: 50%;
  z-index: 1000;
`);

const Lines = styled.div<{ isThickLine?: boolean; degree: number }>`
  width: ${props => (props.isThickLine ? '3px' : '1px')};
  background-color: black;
  height: calc(80%);
  z-index: 500;
  position: absolute;
  transform: rotate(${props => props.degree}deg);
`;

const LineCover = styled.div<{ deg: number }>`
  width: calc(80% - 4%);
  position: absolute;
  height: calc(80% - 4%);
  z-index: 600;
  background-color: white;
  border-radius: 50%;
  background-image: conic-gradient(
    red ${props => props.deg}deg,
    white ${props => props.deg}deg ${props => 360 - props.deg}deg
  );
`;

const NumberBox = styled.div<{ degree: number }>`
  position: absolute;
  display: flex;
  height: calc(95%);
  transform: rotate(${props => props.degree}deg);
  font-size: 1.2em;
  z-index: 600;
  justify-content: space-between;
  flex-direction: column;
`;

const NumberText = React.memo(styled.span<{ degree: number }>`
  transform: rotate(${props => props.degree}deg);
  font-weight: 600;
`);

const MinutesIndicator = React.memo(() => {
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
});

const LineWrapper = React.memo(() => {
  const count = 30;
  return (
    <>
      {[...Array(count)].map((el, index) => {
        const isThickLine = index % 5 === 0;
        return (
          <Lines
            key={index}
            isThickLine={isThickLine}
            degree={index * 6}
          ></Lines>
        );
      })}
    </>
  );
});

const ProgressIndicator = ({
  second,
}: {
  second: number;
}): React.ReactElement => {
  // 360 도가 1시간 1초는 0.1도
  const deg = Math.floor(second * 0.1);
  return <LineCover deg={deg}></LineCover>;
};

const Timer = () => {
  const { isRunning, setIsRunning, reset, currentTime } = useTimer();

  return (
    <>
      <TimerDiv>
        <MinutesIndicator />
        <LineWrapper />
        <ProgressIndicator second={currentTime} />
        <TimerCenter />
      </TimerDiv>

      <div style={{ display: 'block', textAlign: 'center' }}>
        {secondToMinutesTextFormat(currentTime)}
      </div>

      <input
        type="button"
        onClick={() => setIsRunning(!isRunning)}
        value={isRunning ? '일시 정지' : '시작'}
      />
      <input type="button" onClick={() => reset()} value={'초기화'} />
    </>
  );
};
export default Timer;
