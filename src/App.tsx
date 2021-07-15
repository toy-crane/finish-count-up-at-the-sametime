import { useEffect } from "react";
import { useState } from "react";

interface Props {
	number: number;
}

// 애니메이션이 지속될 시간
const DURATION = 700;
// 화면에 그려질 term
const INTERVAL = 10;

// 실제로 화면에 표현될 숫자를 구하는 함수
const calNumAtFrame = (endNumber: number, frame: number) => {
	const pastTime = frame * INTERVAL;
	if (DURATION < pastTime) {
		throw new Error("애니메이션 시간보다 클 수 없습니다.");
	}

	// (0, 0), (endNumber, Duration) 사이의 이차 방정식 중간 계수를 구한다.
	const calQuadricVariable = (endNumber * -1) / Math.pow(DURATION, 2);

	// 이차 방정식을 활용해서 실제로 화면에 표현될 숫자를 구한다.
	const numAtFrame =
		calQuadricVariable * Math.pow(pastTime - DURATION, 2) + endNumber;
	return Math.floor(numAtFrame);
};

const Counter = ({ number }: Props) => {
	const [frame, setFrame] = useState<number>(1);
	const numberToShow = calNumAtFrame(number, frame);

	useEffect(() => {
		let id: any;
		// 원하는 숫자에 도달 했을 때, Interval을 더이상 추가하지 않는다.
		if (numberToShow < number) {
			id = setInterval(() => setFrame((frame) => frame + 1), INTERVAL);
		}
		return () => id && clearInterval(id);
	});

	return <div>{numberToShow}</div>;
};

function App() {
	return (
		<div className="App">
			<Counter number={500}></Counter>
			<Counter number={400}></Counter>
			<Counter number={300}></Counter>
			<Counter number={200}></Counter>
			<Counter number={100}></Counter>
		</div>
	);
}

export default App;
