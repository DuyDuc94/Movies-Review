import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css';

export default function Test(params) {
	return (
		<>
			<div style={{ height: '100vh', backgroundColor: 'white' }}>
				<h1>Test</h1>
				<SkeletonTheme baseColor="#202020" highlightColor="#444">
					<h1><Skeleton  duration={3} /></h1>
				</SkeletonTheme>
			</div>
		</>
	);
};
