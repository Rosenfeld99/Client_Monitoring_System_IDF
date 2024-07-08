/* ChartPei.js */
import React from 'react';
import CanvasJSReact from '@canvasjs/react-charts';
//var CanvasJSReact = require('@canvasjs/react-charts');

const CanvasJSChart = CanvasJSReact.CanvasJSChart;

const ChartPei = ({ dataPoints }) => {
	const options = {
		// exportEnabled: true,
		animationEnabled: true,
		// theme: "dark1", // "light1", "dark1", "dark2"
		// title: {
		// 	text: "ניתוח נתונים"
		// },
		data: [{
			type: "pie",
			startAngle: 75,
			toolTipContent: "<b>{label}</b>: {y}%",
			// showInLegend: "true",
			legendText: "{label}",
			indexLabelFontSize: 16,
			indexLabel: "{label} - {y}%",
			dataPoints
		}]
	};

	return (
		<div className=' relative z-20'>
			<CanvasJSChart options={options} />
			<div className=" absolute bg-light_primary dark:bg-dark_primary bottom-0 right-0 w-16 h-3" />
		</div>
	);
};

export default ChartPei;
